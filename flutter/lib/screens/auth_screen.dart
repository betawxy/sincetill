import 'dart:convert';
import 'dart:math';

import 'package:crypto/crypto.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:loading_overlay/loading_overlay.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';
import 'package:sincetill/screens/item_list_screen.dart';

class AuthScreen extends StatefulWidget {
  static const route = '/auth';

  const AuthScreen({Key? key}) : super(key: key);

  @override
  _AuthScreenState createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  bool loading = false;

  Future<void> signInWithGoogle(BuildContext context) async {
    try {
      // Trigger the authentication flow
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

      // aborted
      if (googleUser == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to sign in with Google'),
          ),
        );
        return;
      }

      // Obtain the auth details from the request
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      // Create a new credential
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      setState(() {
        loading = true;
      });

      // Once signed in, return the UserCredential
      await FirebaseAuth.instance.signInWithCredential(credential);

      Navigator.pushReplacementNamed(context, ItemListScreen.route);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to sign in with Google: $e'),
        ),
      );
    }

    setState(() {
      loading = false;
    });
    return null;
  }

  String generateNonce([int length = 32]) {
    final charset =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';
    final random = Random.secure();
    return List.generate(length, (_) => charset[random.nextInt(charset.length)])
        .join();
  }

  /// Returns the sha256 hash of [input] in hex notation.
  String sha256ofString(String input) {
    final bytes = utf8.encode(input);
    final digest = sha256.convert(bytes);
    return digest.toString();
  }

  Future<void> signInWithApple(BuildContext context) async {
    try {
      final rawNonce = generateNonce();
      final nonce = sha256ofString(rawNonce);

      final appleCredential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.fullName,
        ],
        nonce: nonce,
      );

      final oauthCredential = OAuthProvider("apple.com").credential(
        idToken: appleCredential.identityToken,
        rawNonce: rawNonce,
      );

      setState(() {
        loading = true;
      });

      final authResult =
          await FirebaseAuth.instance.signInWithCredential(oauthCredential);

      final displayName =
          '${appleCredential.givenName} ${appleCredential.familyName}';

      final firebaseUser = authResult.user;

      if (firebaseUser == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to sign in with Apple: $e'),
          ),
        );
      } else {
        await firebaseUser.updateDisplayName(displayName);
      }

      Navigator.pushReplacementNamed(context, ItemListScreen.route);
    } catch (e) {
      print(e);
    }

    setState(() {
      loading = false;
    });
  }

  Widget signInButton({
    required BuildContext context,
    required Color color,
    required FaIcon icon,
    required Future<Null> Function() onPressed,
    required String name,
  }) {
    return Container(
      height: 45,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: color,
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        ),
        child: Row(
          children: [
            Container(
              width: 20,
              child: Center(
                child: icon,
              ),
            ),
            SizedBox(
              width: 20,
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Text(
                  'Continue with $name',
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ],
        ),
        onPressed: onPressed,
      ),
    );
  }

  Widget _appleSignIn(BuildContext context) {
    return signInButton(
      context: context,
      name: 'Apple',
      color: Color(0xFF151515),
      icon: FaIcon(
        FontAwesomeIcons.apple,
        size: 24,
      ),
      onPressed: () async {
        await signInWithApple(context);
      },
    );
  }

  Widget _googleSignIn(BuildContext context) {
    return signInButton(
      context: context,
      name: 'Google',
      color: Color(0xFF3E80F6),
      icon: FaIcon(
        FontAwesomeIcons.google,
        size: 20,
      ),
      onPressed: () async {
        await signInWithGoogle(context);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    bool isIos = Theme.of(context).platform == TargetPlatform.iOS;
    return Scaffold(
      backgroundColor: Colors.white,
      body: LoadingOverlay(
        isLoading: loading,
        color: Theme.of(context).primaryColor,
        child: SafeArea(
          child: Center(
            child: IntrinsicWidth(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 200,
                    height: 200,
                    child: AnimatedOpacity(
                      opacity: 1,
                      duration: Duration(seconds: 2),
                      child: Image(
                        image: AssetImage('images/st.png'),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 40,
                  ),
                  if (isIos) _appleSignIn(context),
                  SizedBox(
                    height: 16,
                  ),
                  _googleSignIn(context),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

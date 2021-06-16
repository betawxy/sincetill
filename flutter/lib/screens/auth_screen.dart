import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:sincetill/screens/item_list_screen.dart';

class AuthScreen extends StatelessWidget {
  static const route = '/auth';

  const AuthScreen({Key? key}) : super(key: key);

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

    return null;
  }

  Widget signInButton({
    required BuildContext context,
    required Color color,
    required FaIcon icon,
    required Future<Null> Function() onPressed,
    required String name,
  }) {
    return Container(
      width: 250,
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
            Text('Continue with $name'),
          ],
        ),
        onPressed: onPressed,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              signInButton(
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
              ),
              SizedBox(
                height: 16,
              ),
              signInButton(
                context: context,
                name: 'Apple',
                color: Color(0xFF151515),
                icon: FaIcon(
                  FontAwesomeIcons.apple,
                  size: 24,
                ),
                onPressed: () async {
                  // TODO: required to pub to appstore
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:sincetill/screens/auth_screen.dart';

class MenuButton extends StatelessWidget {
  const MenuButton({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IconButton(
      tooltip: MaterialLocalizations.of(context).openAppDrawerTooltip,
      icon: const Icon(
        Icons.menu,
        color: Colors.white,
      ),
      onPressed: () {
        showModalBottomSheet(
          context: context,
          backgroundColor: Theme.of(context).primaryColor,
          builder: (context) => Container(
            height: MediaQuery.of(context).size.height * .3,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextButton(
                  onPressed: () async {
                    await FirebaseAuth.instance.signOut();
                    Navigator.pushReplacementNamed(
                      context,
                      AuthScreen.route,
                    );
                  },
                  child: Text('Sign Out'),
                  style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all(
                      Color(0xffedf6f9),
                    ),
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }
}

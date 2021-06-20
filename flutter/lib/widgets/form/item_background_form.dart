import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ItemBackgroundForm extends StatelessWidget {
  const ItemBackgroundForm({Key? key, required this.pickImage})
      : super(key: key);

  final Function pickImage;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'Change background',
          style: TextStyle(
            color: Theme.of(context).primaryColor,
          ),
        ),
        Row(
          children: [
            ElevatedButton(
              child: Icon(Icons.photo_camera),
              onPressed: () => pickImage(ImageSource.camera),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(
                  Colors.black12,
                ),
              ),
            ),
            SizedBox(
              width: 20,
            ),
            ElevatedButton(
              child: Icon(Icons.photo),
              onPressed: () => pickImage(ImageSource.gallery),
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(
                  Colors.black12,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

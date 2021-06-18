import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sincetill/models/item_model.dart';

class AddItemScreen extends StatefulWidget {
  static const route = '/add';

  const AddItemScreen({Key? key}) : super(key: key);

  @override
  _AddItemScreenState createState() => _AddItemScreenState();
}

class _AddItemScreenState extends State<AddItemScreen> {
  String? _title;
  bool _isFullDayEvent = false;

  File? _imageFile;
  final _picker = ImagePicker();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Item'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(40.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              FormBuilderTextField(
                name: 'title',
                decoration: InputDecoration(
                  labelText: 'Title *',
                ),
                onChanged: (value) {},
                validator: FormBuilderValidators.compose([
                  FormBuilderValidators.required(context),
                ]),
                keyboardType: TextInputType.text,
              ),
              FormBuilderSwitch(
                name: 'isFullDayEvent',
                title: Text('Full Day Event'),
                initialValue: false,
                onChanged: (value) {},
              ),
              FormBuilderDateTimePicker(
                name: 'date',
                inputType: InputType.date,
                decoration: InputDecoration(
                  labelText: 'Date',
                ),
                initialValue: DateTime.now(),
              ),
              FormBuilderDateTimePicker(
                name: 'time',
                inputType: InputType.time,
                decoration: InputDecoration(
                  labelText: 'Time',
                ),
                initialTime: TimeOfDay(hour: 8, minute: 0),
              ),
              FormBuilderDropdown(
                name: 'format_type',
                decoration: InputDecoration(
                  labelText: 'Show As',
                ),
                hint: Text('Select Format'),
                validator: FormBuilderValidators.compose(
                    [FormBuilderValidators.required(context)]),
                items: EFormatType.values
                    .map(
                      (formatType) => DropdownMenuItem(
                        value: formatType,
                        child: Text(
                          formatType.toString().split('.').last.capitalize(),
                        ),
                      ),
                    )
                    .toList(),
              ),
              SizedBox(
                height: 20,
              ),
              Row(
                children: [
                  Column(
                    children: [
                      IconButton(
                        icon: Icon(Icons.photo_camera),
                        onPressed: _pickImageFromCamera,
                      ),
                      IconButton(
                        icon: Icon(Icons.photo),
                        onPressed: _pickImageFromGallery,
                      ),
                    ],
                  ),
                  Flexible(
                    child: this._imageFile == null
                        ? Placeholder(
                            strokeWidth: 1,
                            fallbackHeight: 200,
                          )
                        : Image.file(this._imageFile!),
                  ),
                ],
              ),
              SizedBox(
                height: 30,
              ),
              Center(
                child: ElevatedButton(
                  onPressed: () {},
                  child: Text('Add'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _pickImageFromCamera() async {
    final PickedFile? pickedFile =
        await _picker.getImage(source: ImageSource.camera);
    if (pickedFile != null) {
      setState(() {
        this._imageFile = File(pickedFile.path);
      });
    }
  }

  Future<void> _pickImageFromGallery() async {
    final PickedFile? pickedFile =
        await _picker.getImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        this._imageFile = File(pickedFile.path);
      });
    }
  }
}

extension on String {
  String capitalize() {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
  }
}

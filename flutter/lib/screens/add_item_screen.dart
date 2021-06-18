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
  late String _title;
  bool _isFullDayEvent = false;
  var _formatType = EFormatType.DAYS;
  var _ts = DateTime.now();
  File? _imageFile;

  final _picker = ImagePicker();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Item'),
      ),
      body: SingleChildScrollView(
        child: SafeArea(
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
                  onChanged: (value) {
                    if (value != null) {
                      _title = value;
                    }
                  },
                  validator: FormBuilderValidators.compose([
                    FormBuilderValidators.required(context),
                  ]),
                  keyboardType: TextInputType.text,
                ),
                FormBuilderSwitch(
                  name: 'isFullDayEvent',
                  title: Text('Full Day Event'),
                  initialValue: false,
                  onChanged: (value) {
                    if (value != null) {
                      setState(() {
                        _isFullDayEvent = value;
                      });
                    }
                  },
                ),
                FormBuilderDateTimePicker(
                  name: 'date',
                  inputType: InputType.date,
                  decoration: InputDecoration(
                    labelText: 'Date',
                  ),
                  initialValue: _ts,
                  onChanged: (value) {
                    if (value != null) _ts = value;
                  },
                ),
                if (!_isFullDayEvent)
                  FormBuilderDateTimePicker(
                    name: 'time',
                    inputType: InputType.time,
                    decoration: InputDecoration(
                      labelText: 'Time',
                    ),
                    initialValue: _ts,
                    onChanged: (value) {
                      if (value != null) _ts = value;
                    },
                  ),
                FormBuilderDropdown(
                  name: 'format_type',
                  decoration: InputDecoration(
                    labelText: 'Show As',
                  ),
                  hint: Text('Select Format'),
                  validator: FormBuilderValidators.compose(
                      [FormBuilderValidators.required(context)]),
                  initialValue: _formatType,
                  onChanged: (value) {
                    if (value != null) {
                      _formatType = value as EFormatType;
                    }
                  },
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
                      child: Container(
                        width: double.infinity,
                        // TODO: change to background
                        child: AspectRatio(
                          aspectRatio: 1 / 1,
                          child: this._imageFile == null
                              ? Placeholder(
                                  strokeWidth: 1,
                                  fallbackHeight: 200,
                                )
                              : Image.file(this._imageFile!),
                        ),
                      ),
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

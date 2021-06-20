import 'dart:io';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:image_picker/image_picker.dart';
import 'package:loading_overlay/loading_overlay.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/widgets/form/item_background_form.dart';

import 'auth_screen.dart';

class EditItemScreen extends StatefulWidget {
  static const route = '/edit';

  const EditItemScreen({
    Key? key,
    required this.item,
  }) : super(key: key);
  final Item item;

  @override
  _EditItemScreenState createState() => _EditItemScreenState();
}

class _EditItemScreenState extends State<EditItemScreen> {
  final User? user = FirebaseAuth.instance.currentUser;

  firebase_storage.FirebaseStorage storage =
      firebase_storage.FirebaseStorage.instance;

  File? _imageFile;
  final _picker = ImagePicker();
  ImageProvider _imageProvider = AssetImage('images/bg.jpeg');

  bool _saving = false;
  String _title = '';
  bool _isFullDayEvent = false;
  var _formatType = EFormatType.DAYS;
  var _ts = DateTime.now();

  @override
  void initState() {
    super.initState();

    setState(() {
      _title = widget.item.title;
      _isFullDayEvent = widget.item.isFullDayEvent;
      _formatType = widget.item.formatType;
      _ts = widget.item.ts.toDate();
    });
  }

  @override
  Widget build(BuildContext context) {
    if (user == null) {
      return AuthScreen();
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Item'),
      ),
      body: LoadingOverlay(
        isLoading: _saving,
        child: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: _imageProvider,
              fit: BoxFit.cover,
              colorFilter: ColorFilter.mode(
                Colors.black38,
                BlendMode.dstATop,
              ),
            ),
          ),
          child: SingleChildScrollView(
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
                      initialValue: _title,
                      onChanged: (value) {
                        if (value != null) {
                          _title = value;
                        }
                      },
                      validator: FormBuilderValidators.compose(
                        [FormBuilderValidators.required(context)],
                      ),
                      keyboardType: TextInputType.text,
                    ),
                    FormBuilderSwitch(
                      name: 'isFullDayEvent',
                      title: Text(
                        'Full Day Event',
                        style: TextStyle(
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                      initialValue: _isFullDayEvent,
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
                        if (value != null) {
                          _ts = DateTime(
                            value.year,
                            value.month,
                            value.day,
                            _ts.hour,
                            _ts.minute,
                            _ts.second,
                          );
                        }
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
                          if (value != null) {
                            _ts = DateTime(
                              _ts.year,
                              _ts.month,
                              _ts.day,
                              value.hour,
                              value.minute,
                              value.second,
                            );
                          }
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
                                formatType
                                    .toString()
                                    .split('.')
                                    .last
                                    .capitalize(),
                              ),
                            ),
                          )
                          .toList(),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    ItemBackgroundForm(
                      pickImage: _pickImage,
                    ),
                    SizedBox(
                      height: 30,
                    ),
                    Center(
                      child: ElevatedButton(
                        onPressed: () {},
                        child: Text('Update'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _pickImage(ImageSource source) async {
    final PickedFile? pickedFile = await _picker.getImage(source: source);
    if (pickedFile != null) {
      setState(() {
        this._imageFile = File(pickedFile.path);
        if (this._imageFile != null) {
          this._imageProvider = FileImage(this._imageFile!);
        }
      });
    }
  }
}

extension on String {
  String capitalize() {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
  }
}

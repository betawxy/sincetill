import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:image_picker/image_picker.dart';
import 'package:loading_overlay/loading_overlay.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/store/item_store.dart';

import '../utils.dart';
import 'auth_screen.dart';

class AddItemScreen extends StatefulWidget {
  static const route = '/add';

  const AddItemScreen({Key? key}) : super(key: key);

  @override
  _AddItemScreenState createState() => _AddItemScreenState();
}

class _AddItemScreenState extends State<AddItemScreen> {
  final _formKey = GlobalKey<FormBuilderState>();

  String? _title;
  bool _isFullDayEvent = false;
  var _formatType = EFormatType.DAYS;
  var _ts = DateTime.now();
  File? _imageFile;

  ImageProvider _imageProvider = AssetImage('images/bg.jpeg');

  final _picker = ImagePicker();
  firebase_storage.FirebaseStorage storage =
      firebase_storage.FirebaseStorage.instance;

  bool _saving = false;

  @override
  Widget build(BuildContext context) {
    final User? user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return AuthScreen();
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Add Item'),
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
                    FormBuilder(
                      key: _formKey,
                      autovalidateMode: AutovalidateMode.disabled,
                      initialValue: {
                        'title': '',
                        'isFullDayEvent': false,
                        'age': '13',
                        'gender': 'Male'
                      },
                      skipDisabled: true,
                      child: Column(
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
                            title: Text(
                              'Full Day Event',
                              style: TextStyle(
                                color: Theme.of(context).primaryColor,
                              ),
                            ),
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
                          Row(
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
                                    onPressed: _pickImageFromCamera,
                                    style: ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all(
                                        Colors.black12,
                                      ),
                                    ),
                                  ),
                                  SizedBox(
                                    width: 20,
                                  ),
                                  ElevatedButton(
                                    child: Icon(Icons.photo),
                                    onPressed: _pickImageFromGallery,
                                    style: ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all(
                                        Colors.black12,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 30,
                    ),
                    Center(
                      child: ElevatedButton(
                        onPressed: () async {
                          if (_title == null || _title!.isEmpty) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Title should not be empty.'),
                              ),
                            );
                            return;
                          }

                          setState(() {
                            _saving = true;
                          });

                          var itemId = genUniqueId();
                          var backgroundImage = '';

                          if (_imageFile != null) {
                            try {
                              var ref = storage
                                  .ref('images')
                                  .child(user.uid)
                                  .child('$itemId.jpg');
                              await ref.putFile(_imageFile!);
                              backgroundImage = await ref.getDownloadURL();
                            } catch (e) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    'Failed to upload image',
                                  ),
                                ),
                              );

                              setState(() {
                                _saving = false;
                              });

                              return;
                            }
                          }

                          var item = Item(
                            id: itemId,
                            uid: user.uid,
                            title: _title!,
                            isFullDayEvent: _isFullDayEvent,
                            formatType: _formatType,
                            backgroundImage: backgroundImage,
                            ts: Timestamp.fromDate(_ts),
                            ctime: Timestamp.now(),
                            mtime: Timestamp.now(),
                          );

                          try {
                            await ItemStore(user.uid).addToStore(item);
                          } catch (e) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text(
                                  'Failed to create item.',
                                ),
                              ),
                            );
                            return;
                          }

                          setState(() {
                            _saving = false;
                          });

                          Navigator.pop(context);
                        },
                        child: Text('Add'),
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

  Future<void> _pickImageFromCamera() async {
    final PickedFile? pickedFile =
        await _picker.getImage(source: ImageSource.camera);
    if (pickedFile != null) {
      setState(() {
        this._imageFile = File(pickedFile.path);
        if (this._imageFile != null) {
          this._imageProvider = FileImage(this._imageFile!);
        }
      });
    }
  }

  Future<void> _pickImageFromGallery() async {
    final PickedFile? pickedFile =
        await _picker.getImage(source: ImageSource.gallery);
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

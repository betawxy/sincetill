import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
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
                allowClear: true,
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
                        onPressed: () {},
                        icon: Icon(Icons.camera_alt_rounded),
                      ),
                      IconButton(
                        onPressed: () {},
                        icon: Icon(Icons.photo),
                      ),
                    ],
                  ),
                  Flexible(
                    child: Placeholder(
                      strokeWidth: 1,
                      fallbackHeight: 200,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

extension on String {
  String capitalize() {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
  }
}

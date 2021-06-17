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
                // valueTransformer: (text) => num.tryParse(text),
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
                // onChanged: _onChanged,
                inputType: InputType.date,
                decoration: InputDecoration(
                  labelText: 'Date',
                ),
                initialValue: DateTime.now(),
              ),
              FormBuilderDateTimePicker(
                name: 'time',
                // onChanged: _onChanged,
                inputType: InputType.time,
                decoration: InputDecoration(
                  labelText: 'Time',
                ),
                initialTime: TimeOfDay(hour: 8, minute: 0),
                // initialValue: DateTime.now(),
                // enabled: true,
              ),
              FormBuilderDropdown(
                name: 'format_type',
                decoration: InputDecoration(
                  labelText: 'Show As',
                ),
                // initialValue: 'Male',
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

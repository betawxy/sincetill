import React, { useState } from "react";
import moment from "moment";

import { itemsRef } from "lib/firebase";
import { EFormatType, TItem } from "lib/types";

import { Input, DatePicker, TimePicker, Switch, Select, Form } from "antd";
import ImageUploader from "./ImageUploader";

import "antd/dist/antd.css";

type TProps = {
  item: TItem;
  cancel: any;
};

export default function ItemForm(props: TProps) {
  const isEdit = props.item.title.length > 0;
  const [item, setItem] = useState({ ...props.item });

  const onFinish = (values: { date: moment.Moment; time: moment.Moment }) => {
    let m = moment(item.ts);
    const { date, time } = values;

    if (!!date) {
      m = m.set({
        year: date.year(),
        month: date.month(),
        date: date.date(),
      });
    }

    if (item.isFullDayEvent) {
      m = m.set({
        hour: 0,
        minute: 0,
        second: 0,
      });
    } else {
      if (!!time) {
        m = m.set({
          hour: time.hour(),
          minute: time.minute(),
          second: time.second(),
        });
      }
    }

    item.mtime = Date.now();
    if (!isEdit) {
      item.ctime = Date.now();
    }

    const newItem = { ...item, ts: m2ts(m) };
    setItem(newItem);

    (isEdit
      ? itemsRef.doc(item.id).update(newItem)
      : itemsRef.doc(item.id).set(newItem)
    )
      .then(() => {
        props.cancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onFinishFailed = (e: any) => {
    console.error(e);
  };

  const m2ts = (m: moment.Moment): number => {
    return m.unix() * 1000 + m.millisecond();
  };

  return (
    <div className="bg-yellow-50 p-8 rounded">
      <Form
        initialValues={{ date: moment(item.ts), time: moment(item.ts) }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex justify-end pr-2">
            <span className="text-red-500 mr-1">*</span>Title:
          </div>
          <Input
            className="w-5/6"
            type="text"
            value={item.title}
            required={true}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
        </div>
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex justify-end pr-2">Full Day Event:</div>
          <Switch
            checked={item.isFullDayEvent}
            onChange={(e) => setItem({ ...item, isFullDayEvent: e })}
          />
        </div>
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex justify-end pr-2">Date:</div>
          <Form.Item name="date" noStyle={true}>
            <DatePicker />
          </Form.Item>
        </div>
        {!item.isFullDayEvent && (
          <div className="flex items-center mb-4 last:mb-0">
            <div className="w-1/6 flex justify-end pr-2">Time:</div>
            <Form.Item name="time" noStyle={true}>
              <TimePicker />
            </Form.Item>
          </div>
        )}
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex justify-end pr-2">Show as:</div>
          <Select
            className="w-5/6"
            value={item.formatType}
            onChange={(e) => setItem({ ...item, formatType: e })}
          >
            <Select.Option value={EFormatType.SECONDS}>Seconds</Select.Option>
            <Select.Option value={EFormatType.MINUTES}>Minutes</Select.Option>
            <Select.Option value={EFormatType.HOURS}>Hours</Select.Option>
            <Select.Option value={EFormatType.DAYS}>Days</Select.Option>
            <Select.Option value={EFormatType.WEEKS}>Weeks</Select.Option>
            <Select.Option value={EFormatType.MONTHS}>Months</Select.Option>
            <Select.Option value={EFormatType.YEARS}>Years</Select.Option>
          </Select>
        </div>
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex justify-end pr-2 flex-none">Image: </div>
          <ImageUploader
            successCallback={(url: string) =>
              setItem({ ...item, backgroundImage: url })
            }
            currentImageUrl={item.backgroundImage}
          />
        </div>
        <div className="flex items-center mt-8 last:mb-0">
          <div className="w-0 sm:w-1/6"></div>
          <div className="w-full sm:w-5/6 flex justify-between">
            <input
              type="button"
              className="beta-btn-red"
              value="Cancel"
              onClick={props.cancel}
            />
            <input
              type="submit"
              className="beta-btn-blue"
              value={isEdit ? "Update" : "Create"}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

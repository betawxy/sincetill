import React, { useContext, useState } from "react";
import moment from "moment";

import { EFormatType, TItem } from "lib/types";

import { Input, DatePicker, Switch, Select, Form } from "antd";
import ImageUploader from "./ImageUploader";

import { UserContext } from "lib/context";
import { firestore } from "lib/firebase";
import router from "next/router";

type TProps = {
  item: TItem;
  cancel: any;
};

export default function ItemForm(props: TProps) {
  const { user } = useContext(UserContext);

  const isEdit = props.item.title.length > 0;
  const [item, setItem] = useState({ ...props.item });

  if (!user) {
    return null;
  }

  const itemsRef = firestore
    .collection("users")
    .doc(user.uid)
    .collection("items");

  const onFinish = (values: { date: moment.Moment }) => {
    let m = moment(item.ts);
    const { date } = values;

    if (!!date) {
      m = m.set({
        year: date.year(),
        month: date.month(),
        date: date.date(),
      });
    }

    if (!item.isFullDayEvent) {
      m = m.set({
        hour: date.hour(),
        minute: date.minute(),
        second: date.second(),
      });
    }

    item.mtime = Date.now();
    if (!isEdit) {
      item.ctime = Date.now();
    }

    const newItem = { ...item, ts: m2ts(m) };
    setItem(newItem);

    if (isEdit) {
      itemsRef
        .doc(item.id)
        .update(newItem)
        .then(() => {
          props.cancel();
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      itemsRef
        .doc(item.id)
        .set(newItem)
        .then(() => {
          router.replace(`/items/${item.id}`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const onFinishFailed = (e: any) => {
    console.error(e);
  };

  const m2ts = (m: moment.Moment): number => {
    return m.unix() * 1000 + m.millisecond();
  };

  return (
    <div className="bg-yellow-50 p-8 md:rounded">
      <Form
        initialValues={{ date: moment(item.ts), time: moment(item.ts) }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex flex-none justify-end pr-2">
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
          <div className="w-1/6 flex flex-none justify-end pr-2">
            Full Day Event:
          </div>
          <Switch
            checked={item.isFullDayEvent}
            onChange={(e) => setItem({ ...item, isFullDayEvent: e })}
          />
        </div>
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex flex-none justify-end pr-2">Date:</div>
          <Form.Item name="date" noStyle={true}>
            <DatePicker showTime={!item.isFullDayEvent} />
          </Form.Item>
        </div>
        <div className="flex items-center mb-4 last:mb-0">
          <div className="w-1/6 flex flex-none justify-end pr-2">Show as:</div>
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

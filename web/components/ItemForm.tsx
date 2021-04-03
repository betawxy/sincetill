import React, { useState } from "react";
import moment from "moment";

import { itemsRef } from "lib/firebase";
import { EFormatType, TItem } from "lib/types";

import { Input, DatePicker, TimePicker, Switch, Select } from "antd";

type TProps = {
  item: TItem;
  cancel: any;
};

export default function ItemForm(props: TProps) {
  const isEdit = props.item.title.length > 0;
  const [item, setItem] = useState({ ...props.item });

  const submit = (e: any) => {
    e.preventDefault();
    (isEdit
      ? itemsRef.doc(item.id).update(item)
      : itemsRef.doc(item.id).set(item)
    )
      .then(() => {
        props.cancel();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const m2ts = (m: moment.Moment): number => {
    return m.unix() * 1000 + m.millisecond();
  };

  const setDate = (e: moment.Moment) => {
    const m = moment(item.ts);
    m.set({
      year: e.year(),
      month: e.month(),
      date: e.date(),
    });

    setItem({ ...item, ts: m2ts(m) });
  };

  const setTime = (e: moment.Moment) => {
    const m = moment(item.ts);
    m.set({
      hour: e.hour(),
      minute: e.minute(),
      second: e.second(),
    });

    setItem({ ...item, ts: m2ts(m) });
  };

  return (
    <div className="bg-yellow-100 p-6 rounded">
      <form onSubmit={submit}>
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
          <DatePicker value={moment(item.ts)} onChange={setDate} />
        </div>
        {!item.isFullDayEvent && (
          <div className="flex items-center mb-4 last:mb-0">
            <div className="w-1/6 flex justify-end pr-2">Time:</div>
            <TimePicker value={moment(item.ts)} onChange={setTime} />
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
      </form>
    </div>
  );
}

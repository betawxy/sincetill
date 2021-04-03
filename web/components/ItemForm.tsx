import { useState } from "react";
import { itemsRef } from "lib/firebase";
import { EFormatType, TItem } from "lib/types";

import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Switch,
  Select,
} from "antd";

import moment from "moment";
import { useRouter } from "next/router";

type TProps = {
  item: TItem;
  close: any;
};

export default function ItemForm(props: TProps) {
  const router = useRouter();

  const isEdit = props.item.title.length > 0;
  const [item, setItem] = useState({ ...props.item });

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    let {
      date,
      time,
      formatType,
    }: {
      date: moment.Moment | undefined;
      time: moment.Moment | undefined;
      formatType: EFormatType;
    } = values;

    date = date || moment();
    time = time || moment();
    if (!item.isFullDayEvent) {
      date = date.set({
        hour: time.get("hour"),
        minute: time.get("minute"),
        second: time.get("second"),
      });
    }

    const newItem: TItem = {
      ...item,
      ts: date.unix() * 1000 + date.millisecond(),
      formatType: formatType,
    };

    itemsRef
      .doc(newItem.id)
      .set(newItem)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-yellow-100 p-6 rounded">
      <Form
        {...layout}
        name="basic"
        initialValues={{ formatType: EFormatType.DAYS }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is a required field." }]}
        >
          <Input
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Full Day Event" name="isFullDayEvent">
          <Switch
            checked={item.isFullDayEvent}
            onChange={(e) => setItem({ ...item, isFullDayEvent: e })}
          />
        </Form.Item>
        <Form.Item label="Date" name="date">
          <DatePicker />
        </Form.Item>
        {!item.isFullDayEvent && (
          <Form.Item label="Time" name="time">
            <TimePicker />
          </Form.Item>
        )}
        <Form.Item label="Show as" name="formatType">
          <Select>
            <Select.Option value={EFormatType.SECONDS}>Seconds</Select.Option>
            <Select.Option value={EFormatType.MINUTES}>Minutes</Select.Option>
            <Select.Option value={EFormatType.HOURS}>Hours</Select.Option>
            <Select.Option value={EFormatType.DAYS}>Days</Select.Option>
            <Select.Option value={EFormatType.WEEKS}>Weeks</Select.Option>
            <Select.Option value={EFormatType.MONTHS}>Months</Select.Option>
            <Select.Option value={EFormatType.YEARS}>Years</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex">
          <div className="w-0 sm:w-1/6"></div>
          <div className="w-full sm:w-5/6 flex justify-between">
            <Form.Item>
              <Button type="default" htmlType="button" onClick={props.close}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

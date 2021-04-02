import { useState } from "react";
import { defaultNewItem } from "../lib/consts";
import { itemsRef } from "../lib/firebase";
import { EFormatType, TItem } from "../lib/types";

import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Switch,
  Select,
} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

export default function NewItemForm({
  appendItemToState,
}: {
  appendItemToState: (newItem: TItem) => void;
}) {
  const [newItem, setNewItem] = useState({ ...defaultNewItem });

  async function addItem() {
    if (newItem.title.length === 0) {
      alert("pls add title");
      return;
    }
    await itemsRef.add(newItem);
    appendItemToState(newItem);
    setNewItem({ ...defaultNewItem });
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const onFinish = (values: any) => {
    addItem();
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please provide title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Full Day Event" name="isFullDayEvent">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Form.Item>
      <Form.Item label="Date" name="date">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Time" name="time">
        <TimePicker />
      </Form.Item>
      <Form.Item label="Show as" name="formatType">
        <Select defaultValue={EFormatType.DAYS} style={{ width: 120 }}>
          <Select.Option value={EFormatType.SECONDS}>Seconds</Select.Option>
          <Select.Option value={EFormatType.MINUTES}>Minutes</Select.Option>
          <Select.Option value={EFormatType.HOURS}>Hours</Select.Option>
          <Select.Option value={EFormatType.DAYS}>Days</Select.Option>
          <Select.Option value={EFormatType.WEEKS}>Weeks</Select.Option>
          <Select.Option value={EFormatType.MONTHS}>Months</Select.Option>
          <Select.Option value={EFormatType.YEARS}>Years</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Add Item
        </Button>
      </Form.Item>
    </Form>
  );
}

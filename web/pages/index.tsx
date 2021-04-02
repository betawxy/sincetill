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

type Props = {
  items: TItem[];
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  const items = await getItems();
  return {
    props: { items },
  };
}

async function getItems(): Promise<TItem[]> {
  return (await itemsRef.get()).docs.map((doc) => doc.data() as TItem);
}

function NewItemForm({
  addItemToState,
}: {
  addItemToState: (newItem: TItem) => void;
}) {
  const [newItem, setNewItem] = useState({ ...defaultNewItem });

  async function addItem() {
    if (newItem.title.length === 0) {
      alert("pls add title");
      return;
    }
    await itemsRef.add(newItem);
    addItemToState(newItem);
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
          <Select.Option value="lucy">Lucy</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function Home(props: Props) {
  const [items, setItems] = useState(props.items);
  const addItemToState = (newItem: TItem) => setItems([...items, newItem]);

  return (
    <div className="h-screen w-screen bg-blue-200">
      <div className="container mx-auto">
        <h1 className="text-3xl">since till</h1>

        <div className="mt-6 bg-red-100 p-6">
          <NewItemForm addItemToState={addItemToState} />
        </div>
        <div className="text-lg mt-6 font-bold">items</div>
        <ul>
          {items.map((item, key) => (
            <li key={key}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

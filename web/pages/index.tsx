import { useState } from "react";
import { defaultNewItem } from "../lib/consts";
import { itemsRef } from "../lib/firebase";
import { TItem } from "../lib/types";

import { Form, Input, Button, Checkbox } from "antd";

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

function NewItemForm() {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const onFinish = (values: any) => {
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
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function Home(props: Props) {
  const [newItem, setNewItem] = useState({ ...defaultNewItem });
  const [items, setItems] = useState(props.items);

  async function addItem() {
    if (newItem.title.length === 0) {
      alert("pls add title");
      return;
    }
    await itemsRef.add(newItem);
    setItems([...items, newItem]);
    setNewItem({ ...defaultNewItem });
  }

  return (
    <div className="h-screen w-screen bg-blue-200">
      <div className="container mx-auto">
        <h1 className="text-3xl">since till</h1>

        <div className="mt-6 bg-red-100 p-6">
          <NewItemForm />
        </div>

        <form className="flex flex-col p-6 bg-red-100 mt-6">
          <label className="py-3">
            <span className="inline-block w-32">title</span>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              placeholder="something"
            />
          </label>
          <button className="mt-6 bg-red-500 cursor-pointer" onClick={addItem}>
            add
          </button>
        </form>

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

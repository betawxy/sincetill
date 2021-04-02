import { useState } from "react";
import { itemsRef } from "../lib/firebase";
import { TItem } from "../lib/types";

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

export default function Home(props: Props) {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState(props.items);

  async function addItem(title: string) {
    const item: TItem = {
      text: title,
    };
    await itemsRef.add(item);
    setItems([...items, item]);
    setTitle("");
  }

  return (
    <div className="h-screen w-screen bg-blue-200">
      <div className="container mx-auto border border-black">
        <h1 className="text-3xl">since till</h1>
        <label className="">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="something"
          />
        </label>
        <button className="mx-3 bg-red-500 px-3" onClick={() => addItem(title)}>
          add
        </button>

        <div>items</div>
        <ul>
          {items.map((item, key) => (
            <li key={key}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

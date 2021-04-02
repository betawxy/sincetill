import { useState } from "react";
import { defaultNewItem } from "../lib/consts";
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
      <div className="container mx-auto border border-black">
        <h1 className="text-3xl">since till</h1>
        <label className="">
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            placeholder="something"
          />
        </label>
        <button className="mx-3 bg-red-500 px-3" onClick={addItem}>
          add
        </button>

        <div>items</div>
        <ul>
          {items.map((item, key) => (
            <li key={key}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

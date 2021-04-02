import React, { useState } from "react";
import NewItemForm from "../components/NewItemForm";
import { itemsRef } from "../lib/firebase";
import { TItem } from "../lib/types";

type Props = {
  items: TItem[];
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  const items = (await itemsRef.get()).docs.map((doc) => doc.data() as TItem);
  return {
    props: { items },
  };
}

function ItemCard({ item }: { item: TItem }) {
  return (
    <li className="border border-gray-100 rounded bg-white rounded-sm p-6 mb-3 last:mb-0">
      {item.title}
    </li>
  );
}

export default function Home(props: Props) {
  const [items, setItems] = useState(props.items);
  const appendItemToState = (newItem: TItem) => setItems([...items, newItem]);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl py-6">since till</h1>
        <div className="bg-yellow-100 p-6 rounded rounded-sm">
          <NewItemForm appendItemToState={appendItemToState} />
        </div>
        <div className="text-lg mt-6 mb-3 font-bold">Items</div>
        <ul>
          {items.map((item, key) => (
            <ItemCard item={item} key={key} />
          ))}
        </ul>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
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

export default function Home(props: Props) {
  const [timer, setTimer] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const [items, setItems] = useState(props.items);
  const appendItemToState = (newItem: TItem) => setItems([...items, newItem]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl py-6">
        since till<span className="hidden">{timer.toISOString()}</span>
      </h1>
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
  );
}

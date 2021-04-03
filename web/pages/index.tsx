import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import NewItemForm from "../components/NewItemForm";
import PageWrapper from "../components/PageWrapper";
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
    <PageWrapper>
      <div className="bg-yellow-100 p-6 rounded">
        <NewItemForm appendItemToState={appendItemToState} />
      </div>
      <div className="text-lg mt-6 mb-3 font-bold">Items</div>
      <ul>
        {items.map((item, key) => (
          <ItemCard item={item} key={key} />
        ))}
      </ul>
      <div className="py-6">Updated at {timer.toUTCString()}</div>
    </PageWrapper>
  );
}

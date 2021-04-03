import React, { useEffect, useState } from "react";
import Link from "next/link";

import { TItem } from "lib/types";
import { itemsRef } from "lib/firebase";

import ItemCard from "components/ItemCard";
import PageWrapper from "components/PageWrapper";

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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      <div className="text-lg mt-6 mb-3 font-bold">Items</div>
      <ul>
        {props.items.map((item, key) => (
          <Link key={key} href={`/items/${item.id}`}>
            <li className="cursor-pointer mb-3 last:mb-0">
              <ItemCard item={item} />
            </li>
          </Link>
        ))}
      </ul>
      <div className="py-6">Updated at {timer.toUTCString()}</div>
    </PageWrapper>
  );
}

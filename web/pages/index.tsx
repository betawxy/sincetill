import React, { useEffect, useState } from "react";
import Link from "next/link";

import { TItem } from "lib/types";
import { itemsRef } from "lib/firebase";

import ItemCard from "components/ItemCard";

type Props = {
  items: TItem[];
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  const items = (await itemsRef.orderBy("mtime", "desc").get()).docs.map(
    (doc) => doc.data() as TItem
  );
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
    <>
      <div className="text-lg text-gray-600 mt-6 mb-3 border-b-2 border-dashed">
        Items
      </div>
      <ul>
        {props.items.map((item, key) => (
          <Link key={key} href={`/items/${item.id}`}>
            <li className="cursor-pointer mb-3 last:mb-0">
              <ItemCard item={item} />
            </li>
          </Link>
        ))}
      </ul>
      <div className="py-6 text-xs text-gray-400">
        Updated at {timer.toUTCString()}
      </div>
    </>
  );
}

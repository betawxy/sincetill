import React, { useEffect, useState } from "react";
import Link from "next/link";

import { TItem } from "lib/types";
import { firestore, itemsRef } from "lib/firebase";

import ItemCard from "components/ItemCard";
import MetaTags from "components/MetaTags";

// Max items to retrieve per page
const LIMIT = 3;

type Props = {
  items: TItem[];
};

export async function getServerSideProps(): Promise<{ props: Props }> {
  const itemsQuery = firestore
    .collectionGroup("items")
    .orderBy("mtime", "desc")
    .limit(LIMIT);
  const items = (await itemsQuery.get()).docs.map((doc) => doc.data() as TItem);
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

  const [items, setItems] = useState(props.items);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedItemsEnd, setReachedItemsEnd] = useState(false);

  const loadMorePosts = async () => {
    setIsLoading(true);

    const lastItem = items[items.length - 1];
    const itemsQuery = firestore
      .collectionGroup("items")
      .orderBy("mtime", "desc")
      .startAfter(lastItem.mtime)
      .limit(LIMIT);

    const newItems = (await itemsQuery.get()).docs.map(
      (doc) => doc.data() as TItem
    );

    setItems(items.concat(newItems));
    setIsLoading(false);
    if (newItems.length < LIMIT) {
      setReachedItemsEnd(true);
    }
  };

  return (
    <>
      <MetaTags title="Home" description="List of your personal items" />
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

      {!isLoading && !reachedItemsEnd && (
        <button
          className="beta-btn-blue"
          value="Load more"
          onClick={loadMorePosts}
        />
      )}

      {isLoading && <div>Loading...</div>}
      {reachedItemsEnd && <div>You have reached the end.</div>}

      <div className="py-6 text-xs text-gray-400">
        Updated at {timer.toUTCString()}
      </div>
    </>
  );
}

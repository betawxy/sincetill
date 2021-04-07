import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { TItem } from "lib/types";
import { getItemsRef } from "lib/firebase";
import { UserContext } from "lib/context";

import ItemCard from "components/ItemCard";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";

const LIMIT = 8;

async function loadNextPage(uid: string, lastItem?: TItem): Promise<TItem[]> {
  let query = getItemsRef(uid).orderBy("mtime", "desc");
  if (!!lastItem) {
    query = query.startAfter(lastItem.mtime);
  }
  query = query.limit(LIMIT);

  return (await query.get()).docs.map((doc) => doc.data() as TItem);
}

export default function Home() {
  const { user } = useContext(UserContext);

  const [timer, setTimer] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedItemsEnd, setReachedItemsEnd] = useState(false);

  useEffect(() => {
    if (!!user && items.length === 0)
      loadNextPage(user.uid).then((newItems) => {
        setIsLoading(true);
        setItems(newItems);
        setIsLoading(false);
        if (newItems.length < LIMIT) {
          setReachedItemsEnd(true);
        }
      });
  });

  const loadMoreItems = async () => {
    setIsLoading(true);
    let newItems;
    if (items.length) {
      const lastItem = items[items.length - 1];
      newItems = await loadNextPage(user.uid, lastItem);
    } else {
      newItems = await loadNextPage(user.uid);
    }
    setItems([...items, ...newItems]);
    setIsLoading(false);
    if (newItems.length < LIMIT) {
      setReachedItemsEnd(true);
    }
  };

  return (
    <WebAppPageWrapper>
      <MetaTags title="Home" description="List of your personal items" />
      <div className="text-lg text-gray-600 mt-6 mb-3 border-b-2 border-dashed">
        Items
      </div>
      <ul>
        {items.map((item, key) => (
          <Link key={key} href={`/items/${item.id}`}>
            <li className="cursor-pointer mb-3 last:mb-0">
              <ItemCard item={item} />
            </li>
          </Link>
        ))}
      </ul>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !reachedItemsEnd && (
        <div>
          <button className="beta-btn-blue" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      )}
      <div className="py-6 text-xs text-gray-400">
        Updated at {timer.toUTCString()}
      </div>
    </WebAppPageWrapper>
  );
}

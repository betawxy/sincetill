import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { TItem } from "lib/types";
import { getItemsRef } from "lib/firebase";
import { UserContext } from "lib/context";

import ItemCard from "components/ItemCard";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";
import ItemCardSkeleton from "components/ItemCardSkeleton";

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
    if (!!user && items.length === 0) {
      setIsLoading(true);
      loadNextPage(user.uid)
        .then((newItems) => {
          setItems(newItems);
          if (newItems.length < LIMIT) {
            setReachedItemsEnd(true);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
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
      <div className="text-lg text-gray-600 my-3 border-b-2 border-dashed">
        Items
      </div>
      <ul className="space-y-3">
        {items.map((item, key) => (
          <Link key={key} href={`/items/${item.id}`}>
            <li className="cursor-pointer">
              <ItemCard item={item} />
            </li>
          </Link>
        ))}
      </ul>
      {isLoading && (
        <ul className="space-y-3">
          <li>
            <ItemCardSkeleton />
          </li>
          <li>
            <ItemCardSkeleton />
          </li>
          <li>
            <ItemCardSkeleton />
          </li>
        </ul>
      )}
      {!isLoading && !reachedItemsEnd && (
        <div>
          <button className="beta-btn-blue" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      )}
      {!isLoading && items.length === 0 && (
        <div>
          You don't have any items yet. Create a new one with "Add Item" above.
        </div>
      )}

      <div className="py-6 text-xs text-gray-400">
        Updated at {timer.toUTCString()}
      </div>
    </WebAppPageWrapper>
  );
}

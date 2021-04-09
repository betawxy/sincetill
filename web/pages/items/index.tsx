import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { TItem } from "lib/types";
import { getItemsRef } from "lib/firebase";
import { UserContext } from "lib/context";

import ItemCard from "components/ItemCard";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";
import ItemCardSkeleton from "components/ItemCardSkeleton";
import SearchIcon from "components/icons/search";

const LIMIT = 9999;

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
  const [startedLoading, setStartedLoading] = useState(false);
  const [reachedItemsEnd, setReachedItemsEnd] = useState(false);
  const [searchPattern, setSearchPattern] = useState("");

  useEffect(() => {
    if (!!user && items.length === 0) {
      setIsLoading(true);
      setStartedLoading(true);
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

  const search = (e) => {
    setSearchPattern(e.target.value);
  };

  const filterItems = (items: TItem[]): TItem[] => {
    if (searchPattern.length === 0) {
      return items;
    }
    return items.filter((item) => item.title.indexOf(searchPattern) !== -1);
  };

  return (
    <WebAppPageWrapper>
      <MetaTags title="Home" description="List of your personal items" />
      <div className="flex border-b-2 border-dashed md:my-3 justify-between pb-2">
        <div className="text-lg text-gray-600 px-3 md:px-0 ">Items</div>
        <div className="flex px-4 md:px-1">
          <input
            type="search"
            className="rounded w-40 pl-2 pr-5 ring-2 ring-indigo-200 text-indigo-800 outline-none py-0"
            onChange={search}
          />
          <div className="self-right -ml-5 mt-0.5 text-indigo-800">
            <SearchIcon />
          </div>
        </div>
      </div>
      <ul className="md:space-y-3">
        {filterItems(items).map((item, key) => (
          <Link key={key} href={`/items/${item.id}`}>
            <li className="cursor-pointer">
              <ItemCard item={item} />
            </li>
          </Link>
        ))}
        {(!startedLoading || isLoading) && (
          <>
            <li>
              <ItemCardSkeleton />
            </li>
            <li>
              <ItemCardSkeleton />
            </li>
          </>
        )}
      </ul>
      {startedLoading && !isLoading && !reachedItemsEnd && (
        <div className="my-3 mx-3 md:mx-0">
          <button className="beta-btn-blue" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      )}
      {startedLoading &&
        !isLoading &&
        items.length === 0 &&
        reachedItemsEnd && (
          <div>
            You don't have any items yet. Create a new one with "Add Item"
            above.
          </div>
        )}
    </WebAppPageWrapper>
  );
}

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { ESortDirection, ESortType, TItem, TUser } from "lib/types";
import { getItemsRef, usersRef } from "lib/firebase";
import { UserContext } from "lib/context";

import ItemCard from "components/ItemCard";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";
import ItemCardSkeleton from "components/ItemCardSkeleton";
import SearchIcon from "components/icons/search";
import SortAscIcon from "components/icons/sortAsc";
import SortDescIcon from "components/icons/sortDesc";

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
  const { user, userData } = useContext(UserContext);
  const [sortType, setSortType] = useState(ESortType.MTIME);
  const [sortDirection, setSortDirection] = useState(ESortDirection.DESC);

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
    if (
      !!userData &&
      userData.settings.sortType !== null &&
      userData.settings.sortType !== undefined
    ) {
      setSortType(userData.settings.sortType);
      setSortDirection(userData.settings.sortDirection);
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

  const processItems = (items: TItem[]): TItem[] => {
    if (searchPattern.length === 0) {
      return items;
    }
    let res = items.filter(
      (item) =>
        item.title.toLowerCase().indexOf(searchPattern.toLowerCase()) !== -1
    );

    if (sortType === ESortType.TIME) {
      res = res.sort((a, b) => a.ts - b.ts);
    } else if (sortType === ESortType.CTIME) {
      res = res.sort((a, b) => a.ctime - b.ctime);
    } else if (sortType === ESortType.MTIME) {
      res = res.sort((a, b) => a.mtime - b.mtime);
    } else if (sortType === ESortType.TITLE) {
      res = res.sort((a, b) =>
        a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      );
    }

    if (sortDirection === ESortDirection.DESC) {
      res = res.reverse();
    }

    return res;
  };

  const syncSortSettings = (
    sortType: ESortType,
    sortDirection: ESortDirection
  ) => {
    if (!userData) return;
    usersRef.doc(userData.uid).update({ sortType, sortDirection });
  };

  return (
    <WebAppPageWrapper>
      <MetaTags title="Home" description="List of your personal items" />
      <div className="flex border-b-2 border-dashed md:my-3 justify-between pb-2">
        <div className="text-lg text-gray-600 px-3 md:px-0 ">Items</div>
        {!!userData && (
          <div className="flex px-3 md:px-0">
            <div className="flex mr-6">
              <input
                type="search"
                className="rounded w-28 md:w-40 pl-2 pr-5 ring-2 ring-gray-200 text-indigo-800 outline-none py-0"
                onChange={search}
              />
              <div className="self-right -ml-5 mt-0.5 text-gray-600">
                <SearchIcon />
              </div>
            </div>
            <div className="flex">
              <select
                className="rounded ring-2 ring-gray-200 text-gray-600 outline-none"
                value={sortType}
                onChange={(e) => {
                  const newSortType = parseInt(e.target.value);
                  setSortType(newSortType);
                  syncSortSettings(newSortType, sortDirection);
                }}
              >
                <option value={ESortType.TITLE}>Name</option>
                <option value={ESortType.TIME}>Event Time</option>
                <option value={ESortType.CTIME}>Create Time</option>
                <option value={ESortType.MTIME}>Update Time</option>
              </select>
              <div
                className="ml-1 text-gray-600 mt-1 cursor-pointer"
                onClick={() => {
                  const newSortDir =
                    sortDirection === ESortDirection.ASC
                      ? ESortDirection.DESC
                      : ESortDirection.ASC;
                  setSortDirection(newSortDir);
                  syncSortSettings(sortType, newSortDir);
                }}
              >
                {sortDirection === ESortDirection.ASC ? (
                  <SortAscIcon />
                ) : (
                  <SortDescIcon />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <ul className="md:space-y-3">
        {processItems(items).map((item, key) => (
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

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { TItem } from "lib/types";
import { firestore } from "lib/firebase";
import { UserContext } from "lib/context";

import ItemCard from "components/ItemCard";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";

const LIMIT = 8;

export default function Home() {
  const { user, userData } = useContext(UserContext);

  const [timer, setTimer] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log(user);

  userData !== null && console.log(Object.values(userData.items));

  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [reachedItemsEnd, setReachedItemsEnd] = useState(false);

  // async function loadNextPage(uid: string, lastItem?: TItem): Promise<TItem[]> {
  //   let query = firestore
  //     .collection("users")
  //     .doc(uid)
  //     .collection("items")
  //     .orderBy("mtime", "desc");
  //   if (!!lastItem) {
  //     query = query.startAfter(lastItem.mtime);
  //   }
  //   query = query.limit(LIMIT);

  //   return (await query.get()).docs.map((doc) => doc.data() as TItem);
  // }

  // useEffect(() => {
  //   if (!!user)
  //     loadNextPage(user.uid).then((newItems) => {
  //       setIsLoading(true);
  //       setItems(newItems);
  //       setIsLoading(false);
  //       if (newItems.length < LIMIT) {
  //         setReachedItemsEnd(true);
  //       }
  //     });
  // });

  // const loadMorePosts = async () => {
  //   setIsLoading(true);
  //   const lastItem = items[items.length - 1];
  //   const newItems = await loadNextPage(user.uid, lastItem);
  //   setItems([...items, ...newItems]);
  //   setIsLoading(false);
  //   if (newItems.length < LIMIT) {
  //     setReachedItemsEnd(true);
  //   }
  // };

  return (
    <WebAppPageWrapper>
      <MetaTags title="Home" description="List of your personal items" />
      <div className="text-lg text-gray-600 mt-6 mb-3 border-b-2 border-dashed">
        Items
      </div>
      <ul>
        {!!userData &&
          Object.values(userData.items).map((item, key) => (
            <Link key={key} href={`/items/${item.id}`}>
              <li className="cursor-pointer mb-3 last:mb-0">
                <ItemCard item={item} />
              </li>
            </Link>
          ))}
      </ul>

      {/* {!isLoading && !reachedItemsEnd && (
        <button className="beta-btn-blue" onClick={loadMorePosts}>
          Load More
        </button>
      )}

      {isLoading && <div>Loading...</div>}
      {reachedItemsEnd && <div>You have reached the end.</div>} */}

      <div className="py-6 text-xs text-gray-400">
        Updated at {timer.toUTCString()}
      </div>
    </WebAppPageWrapper>
  );
}

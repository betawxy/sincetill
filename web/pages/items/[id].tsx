import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ObservableStatus, useFirestoreDocData } from "reactfire";

import { itemsRef } from "lib/firebase";
import { TItem } from "lib/types";

import ItemCard from "components/ItemCard";
import ItemForm from "components/ItemForm";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";

export default function ItemPage() {
  const [timer, setTimer] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();
  const { id: itemId } = router.query;

  const resp: ObservableStatus<TItem> = useFirestoreDocData(
    itemsRef.doc(itemId as string)
  );
  const item = resp.data;

  const remove = () => {
    itemsRef
      .doc(itemId as string)
      .delete()
      .then(() => {
        router.replace("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <WebAppPageWrapper>
      {resp.status === "loading" ? (
        <div>loading...</div>
      ) : (
        <div>
          {!!item.ts && (
            <>
              <MetaTags title={`Item "${item.title}"`} />

              <ItemCard item={item} />
              {!showEditForm && (
                <div className="flex justify-between mt-3">
                  <input
                    type="button"
                    value="remove"
                    className="beta-btn-red"
                    onClick={remove}
                  />
                  <input
                    type="button"
                    value="edit"
                    className="beta-btn-blue ml-6"
                    onClick={() => setShowEditForm(true)}
                  />
                </div>
              )}
              {showEditForm && (
                <div className="mt-3">
                  <ItemForm item={item} cancel={() => setShowEditForm(false)} />
                </div>
              )}
              <div className="py-6 text-xs text-gray-400">
                Updated at {timer.toUTCString()}
              </div>
            </>
          )}
        </div>
      )}
    </WebAppPageWrapper>
  );
}

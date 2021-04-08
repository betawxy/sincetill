import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ObservableStatus, useFirestoreDocData } from "reactfire";

import { TItem } from "lib/types";

import ItemForm from "components/ItemForm";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";
import { getItemsRef } from "lib/firebase";
import { UserContext } from "lib/context";
import ItemCardSkeleton from "components/ItemCardSkeleton";
import ItemCardBig from "components/ItemCardBig";

function Content() {
  const { user } = useContext(UserContext);

  const [timer, setTimer] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();
  const { id: itemId } = router.query;

  const itemsRef = getItemsRef(user.uid);

  const resp: ObservableStatus<TItem> = useFirestoreDocData(
    itemsRef.doc(itemId as string)
  );
  const item = resp.data;

  const remove = () => {
    itemsRef
      .doc(itemId as string)
      .delete()
      .then(() => {
        router.replace("/items");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="mb-20 -mt-6 md:mt-0">
      {resp.status === "loading" ? (
        <ItemCardSkeleton />
      ) : (
        <div>
          {!!item.ts && (
            <>
              <MetaTags title={`Item "${item.title}"`} />
              <ItemCardBig item={item} />
              {!showEditForm && (
                <div className="flex justify-between mt-3 mx-3 md:mx-0">
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
                <div className="md:mt-3">
                  <ItemForm item={item} cancel={() => setShowEditForm(false)} />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function ItemPage() {
  const { user } = useContext(UserContext);
  return <WebAppPageWrapper>{!!user && <Content />}</WebAppPageWrapper>;
}

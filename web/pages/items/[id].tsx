import { useRouter } from "next/router";
import React from "react";
import ItemCard from "../../components/ItemCard";
import PageWrapper from "../../components/PageWrapper";
import { itemsRef } from "../../lib/firebase";
import { TItem } from "../../lib/types";

import { ObservableStatus, useFirestoreDocData } from "reactfire";

export default function ItemPage() {
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

  return (
    <PageWrapper>
      {resp.status === "loading" ? (
        <div>loading...</div>
      ) : (
        <div>
          {!!item.ts && (
            <>
              <ItemCard item={item} />
              <div className="flex mt-3">
                <div
                  className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                  onClick={remove}
                >
                  remove
                </div>
                <div className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer ml-6">
                  edit
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

import { useRouter } from "next/router";
import React from "react";
import ItemCard from "components/ItemCard";
import PageWrapper from "components/PageWrapper";
import { itemsRef } from "lib/firebase";
import { TItem } from "lib/types";

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
                />
              </div>
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

import { useRouter } from "next/router";
import React, { useState } from "react";
import ItemCard from "components/ItemCard";
import PageWrapper from "components/PageWrapper";
import { itemsRef } from "lib/firebase";
import { TItem } from "lib/types";

import { ObservableStatus, useFirestoreDocData } from "reactfire";
import ItemForm from "components/ItemForm";

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

  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <PageWrapper>
      {resp.status === "loading" ? (
        <div>loading...</div>
      ) : (
        <div>
          {!!item.ts && (
            <>
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
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

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

  return (
    <PageWrapper>
      {resp.status === "loading" ? (
        <div>loading...</div>
      ) : (
        <ItemCard item={item} />
      )}
    </PageWrapper>
  );
}

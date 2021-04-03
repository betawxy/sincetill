import { useRouter } from "next/router";
import React from "react";
import ItemCard from "../../components/ItemCard";
import PageWrapper from "../../components/PageWrapper";
import { itemsRef } from "../../lib/firebase";
import { TItem } from "../../lib/types";

import { ObservableStatus, useFirestoreDocData } from "reactfire";
import NewItemForm from "../../components/NewItemForm";

export default function AddItemPage() {
  return (
    <PageWrapper>
      <NewItemForm />
    </PageWrapper>
  );
}

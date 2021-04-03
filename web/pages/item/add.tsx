import React from "react";
import PageWrapper from "components/PageWrapper";
import ItemForm from "components/ItemForm";
import { useRouter } from "next/router";
import { genNewItem } from "lib/utils";

export default function AddItemPage() {
  const router = useRouter();
  const item = genNewItem();

  return (
    <PageWrapper>
      <ItemForm
        item={item}
        close={() => {
          router.push(`/items/${item.id}`);
        }}
      />
    </PageWrapper>
  );
}

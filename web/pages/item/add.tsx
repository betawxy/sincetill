import React from "react";
import { useRouter } from "next/router";

import ItemForm from "components/ItemForm";
import { genNewItem } from "lib/utils";

export default function AddItemPage() {
  const router = useRouter();
  const item = genNewItem();

  return (
    <ItemForm
      item={item}
      cancel={() => {
        router.back();
      }}
    />
  );
}

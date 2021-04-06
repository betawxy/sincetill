import React from "react";
import { useRouter } from "next/router";

import ItemForm from "components/ItemForm";
import { genNewItem } from "lib/utils";
import MetaTags from "components/MetaTags";
import WebAppPageWrapper from "components/WebAppPageWrapper";

export default function AddItemPage() {
  const router = useRouter();
  const item = genNewItem();

  return (
    <WebAppPageWrapper>
      <MetaTags title="Add item" />
      <ItemForm
        item={item}
        cancel={() => {
          router.back();
        }}
      />
    </WebAppPageWrapper>
  );
}

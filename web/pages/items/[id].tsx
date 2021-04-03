import { useRouter } from "next/router";
import React from "react";
import PageWrapper from "../../components/PageWrapper";

export default function ItemPage() {
  const router = useRouter();
  const { id: itemId } = router.query;

  return (
    <PageWrapper>
      <div className="bg-yellow-100 p-6 rounded rounded-sm">{itemId}</div>
    </PageWrapper>
  );
}

import React from "react";
import PageWrapper from "components/PageWrapper";
import NewItemForm from "components/NewItemForm";

export default function AddItemPage() {
  return (
    <PageWrapper>
      <div className="bg-yellow-100 p-6 rounded">
        <NewItemForm />
      </div>
    </PageWrapper>
  );
}

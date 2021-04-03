import { useRouter } from "next/router";

export default function ItemPage() {
  const router = useRouter();
  const { id: itemId } = router.query;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl py-6">since till</h1>
      <div className="bg-yellow-100 p-6 rounded rounded-sm">{itemId}</div>
    </div>
  );
}

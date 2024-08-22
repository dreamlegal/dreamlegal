import PageComponent from "./_component/Page";
async function getData(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-product-id`,
    
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: id }),
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <div>
      <PageComponent data={data} />
    </div>
  );
}

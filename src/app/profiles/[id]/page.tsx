import UserDetails from "./_components/UserDetails";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <main>
      <UserDetails
        id={id}
        fullname="Hendrick German"
        username="xhand98"
        country="República Dominicana"
      />
    </main>
  );
}

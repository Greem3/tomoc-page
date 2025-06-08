import UserDetails from "./_components/UserDetails";
import UserProfileStats from "@/components/Charts/UserProfileStats";

export default async function Profile({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-gray-50">
      <UserDetails
        id={id}
        fullname="Hendrick German"
        username="xhand98"
        country="República Dominicana"
        score={1500}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Estadísticas del Usuario
          </h2>
          <p className="text-gray-600">
            Análisis de la actividad y rendimiento
          </p>
        </div>

        <UserProfileStats userId={id} />
      </div>
    </main>
  );
}

import UserStatsChart from "@/components/Charts/UserStatsChart";

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Panel de Estadísticas
          </h1>
          <p className="mt-2 text-gray-600">
            Visualiza las estadísticas de usuarios y problemas en tiempo real
          </p>
        </div>

        <UserStatsChart />
      </div>
    </main>
  );
}

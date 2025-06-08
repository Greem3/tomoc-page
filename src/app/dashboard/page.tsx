import PlatformDashboard from "@/components/Charts/PlatformDashboard";
import UserStatsChart from "@/components/Charts/UserStatsChart";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Panel de Control TOMOC
          </h1>
          <p className="mt-2 text-gray-600">
            Monitoreo completo de la plataforma de matemáticas competitivas
          </p>
        </div>

        {/* Dashboard Principal */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Estadísticas Generales de la Plataforma
          </h2>
          <PlatformDashboard />
        </div>

        {/* Estadísticas Detalladas */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Análisis Detallado de Usuarios y Problemas
          </h2>
          <UserStatsChart />
        </div>
      </div>
    </main>
  );
}

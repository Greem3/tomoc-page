"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface PlatformStatsData {
  totalUsers: number;
  totalProblems: number;
  totalSolutions: number;
  totalCountries: number;
  totalClubs: number;
  verifiedProblems: number;
  unverifiedProblems: number;
}

interface GrowthData {
  month: string;
  users: number;
  problems: number;
  solutions: number;
}

interface RankDistributionData {
  rank: string;
  count: number;
  color: string;
}

interface TopCountriesData {
  country: string;
  users: number;
  problems: number;
}

interface PieChartLabelProps {
  rank: string;
  percent: number;
}

const RANK_COLORS = {
  'Diamond': '#B9F2FF',
  'Platinum': '#E5E4E2',
  'Gold': '#FFD700',
  'Silver': '#C0C0C0',
  'Bronze': '#CD7F32',
};

export default function PlatformDashboard() {
  const [platformStats, setPlatformStats] = useState<PlatformStatsData>({
    totalUsers: 0,
    totalProblems: 0,
    totalSolutions: 0,
    totalCountries: 0,
    totalClubs: 0,
    verifiedProblems: 0,
    unverifiedProblems: 0
  });
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [rankDistribution, setRankDistribution] = useState<RankDistributionData[]>([]);
  const [topCountries, setTopCountries] = useState<TopCountriesData[]>([]);  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlatformStats();
    fetchGrowthData();
    fetchRankDistribution();
    fetchTopCountries();
  }, []);
  const fetchPlatformStats = async () => {
    try {
      // Simular estadísticas de la plataforma usando datos mock
      const mockStats: PlatformStatsData = {
        totalUsers: Math.floor(Math.random() * 5000) + 2000, // 2000-7000 usuarios
        totalProblems: Math.floor(Math.random() * 2000) + 800, // 800-2800 problemas
        totalSolutions: Math.floor(Math.random() * 8000) + 3000, // 3000-11000 soluciones
        totalCountries: Math.floor(Math.random() * 50) + 30, // 30-80 países
        totalClubs: Math.floor(Math.random() * 200) + 50, // 50-250 clubes
        verifiedProblems: Math.floor(Math.random() * 1500) + 600, // 600-2100 verificados
        unverifiedProblems: Math.floor(Math.random() * 500) + 200, // 200-700 no verificados
      };

      setPlatformStats(mockStats);
    } catch (error) {
      console.error("Error fetching platform stats:", error);
    }
  };
  const fetchGrowthData = async () => {
    try {
      // Simular datos de crecimiento de la plataforma
      const monthNames = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ];

      const mockGrowthData: GrowthData[] = [];

      // Generar datos de crecimiento para los últimos 6 meses
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthName = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        mockGrowthData.push({
          month: monthName,
          users: Math.floor(Math.random() * 200) + 100, // 100-300 nuevos usuarios por mes
          problems: Math.floor(Math.random() * 50) + 20, // 20-70 nuevos problemas por mes
          solutions: Math.floor(Math.random() * 300) + 150, // 150-450 nuevas soluciones por mes
        });
      }

      setGrowthData(mockGrowthData);
    } catch (error) {
      console.error("Error fetching growth data:", error);
    }
  };

  const fetchRankDistribution = async () => {
    try {
      // Simulación de distribución de rangos basada en scores
      // En producción, esto debería calcularse basado en los scores reales de los usuarios
      const mockRankData = [
        { rank: 'Bronze', count: 150, color: RANK_COLORS.Bronze },
        { rank: 'Silver', count: 80, color: RANK_COLORS.Silver },
        { rank: 'Gold', count: 45, color: RANK_COLORS.Gold },
        { rank: 'Platinum', count: 20, color: RANK_COLORS.Platinum },
        { rank: 'Diamond', count: 5, color: RANK_COLORS.Diamond },
      ];

      setRankDistribution(mockRankData);
    } catch (error) {
      console.error("Error fetching rank distribution:", error);
    }
  };
  const fetchTopCountries = async () => {
    try {
      // Simular datos de países con más actividad
      const mockCountriesData: TopCountriesData[] = [
        { country: 'Colombia', users: Math.floor(Math.random() * 500) + 200, problems: Math.floor(Math.random() * 100) + 50 },
        { country: 'México', users: Math.floor(Math.random() * 400) + 150, problems: Math.floor(Math.random() * 80) + 40 },
        { country: 'Argentina', users: Math.floor(Math.random() * 300) + 120, problems: Math.floor(Math.random() * 70) + 35 },
        { country: 'Chile', users: Math.floor(Math.random() * 250) + 100, problems: Math.floor(Math.random() * 60) + 30 },
        { country: 'Perú', users: Math.floor(Math.random() * 200) + 80, problems: Math.floor(Math.random() * 50) + 25 },
      ];

      setTopCountries(mockCountriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top countries:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Usuarios</h3>
          <p className="text-3xl font-bold text-blue-600">{platformStats.totalUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Problemas</h3>
          <p className="text-3xl font-bold text-green-600">{platformStats.totalProblems.toLocaleString()}</p>
          <p className="text-sm text-gray-500">
            {platformStats.verifiedProblems} verificados, {platformStats.unverifiedProblems} pendientes
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Soluciones</h3>
          <p className="text-3xl font-bold text-purple-600">{platformStats.totalSolutions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Países Activos</h3>
          <p className="text-3xl font-bold text-yellow-600">{platformStats.totalCountries}</p>
          <p className="text-sm text-gray-500">{platformStats.totalClubs} clubes creados</p>
        </div>
      </div>

      {/* Gráfico de crecimiento */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Crecimiento de la Plataforma</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="users"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              name="Usuarios"
            />
            <Area
              type="monotone"
              dataKey="problems"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Problemas"
            />
            <Area
              type="monotone"
              dataKey="solutions"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
              name="Soluciones"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución de rangos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Distribución de Rangos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={rankDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ rank, percent }: PieChartLabelProps) => `${rank} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {rankDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top países */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Top 5 Países</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountries} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="country" type="category" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" name="Usuarios" />
              <Bar dataKey="problems" fill="#82ca9d" name="Problemas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

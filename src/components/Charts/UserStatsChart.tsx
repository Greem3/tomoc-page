"use client";

import { useEffect, useState } from "react";
import { useDatabase } from "@/hooks/useDatabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface UserStatsData {
  month: string;
  users: number;
  problems: number;
  solutions: number;
}

interface ProblemTypeData {
  name: string;
  count: number;
  color: string;
}

interface CountryData {
  country: string;
  users: number;
}

interface PieChartLabelProps {
  name: string;
  percent: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function UserStatsChart() {
  const [userStatsData, setUserStatsData] = useState<UserStatsData[]>([]);
  const [problemTypesData, setProblemTypesData] = useState<ProblemTypeData[]>([]);
  const [countryData, setCountryData] = useState<CountryData[]>([]);  const [loading, setLoading] = useState(true);
  const { isConnected } = useDatabase();

  useEffect(() => {
    if (isConnected) {
      fetchUserStats();
      fetchProblemTypes();
      fetchCountryStats();
    }
  }, [isConnected]);  const fetchUserStats = async () => {
    try {
      // Por ahora usar datos simulados hasta que se configure la API
      const mockData: UserStatsData[] = [
        { month: 'Ene 2025', users: 15, problems: 8, solutions: 25 },
        { month: 'Feb 2025', users: 22, problems: 12, solutions: 38 },
        { month: 'Mar 2025', users: 18, problems: 15, solutions: 42 },
        { month: 'Abr 2025', users: 28, problems: 10, solutions: 35 },
        { month: 'May 2025', users: 32, problems: 18, solutions: 55 },
        { month: 'Jun 2025', users: 40, problems: 20, solutions: 68 }
      ];

      setUserStatsData(mockData);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };  const fetchProblemTypes = async () => {
    try {
      // Datos simulados para tipos de problemas
      const mockData: ProblemTypeData[] = [
        { name: 'Álgebra', count: 45, color: COLORS[0] },
        { name: 'Geometría', count: 32, color: COLORS[1] },
        { name: 'Combinatoria', count: 28, color: COLORS[2] },
        { name: 'Teoría de Números', count: 22, color: COLORS[3] },
        { name: 'Cálculo', count: 18, color: COLORS[4] },
        { name: 'Probabilidad', count: 15, color: COLORS[5] }
      ];

      setProblemTypesData(mockData);
    } catch (error) {
      console.error("Error fetching problem types:", error);
    }
  };  const fetchCountryStats = async () => {
    try {
      // Datos simulados para estadísticas por país
      const mockData: CountryData[] = [
        { country: 'República Dominicana', users: 85 },
        { country: 'México', users: 72 },
        { country: 'Colombia', users: 58 },
        { country: 'España', users: 43 },
        { country: 'Argentina', users: 39 },
        { country: 'Perú', users: 35 },
        { country: 'Chile', users: 28 },
        { country: 'Venezuela', users: 22 },
        { country: 'Ecuador', users: 18 },
        { country: 'Guatemala', users: 15 }
      ];

      setCountryData(mockData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching country stats:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando estadísticas...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Gráfico de líneas - Estadísticas por mes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Estadísticas Mensuales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userStatsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              strokeWidth={2}
              name="Usuarios"
            />
            <Line
              type="monotone"
              dataKey="problems"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Problemas"
            />
            <Line
              type="monotone"
              dataKey="solutions"
              stroke="#ffc658"
              strokeWidth={2}
              name="Soluciones"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de barras - Usuarios por país */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Usuarios por País (Top 10)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="country"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de pastel - Tipos de problemas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Distribución de Tipos de Problemas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={problemTypesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: PieChartLabelProps) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {problemTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

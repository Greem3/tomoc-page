"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface UserProfileStatsProps {
  userId: number;
}

interface UserActivityData {
  month: string;
  problems: number;
  solutions: number;
  comments: number;
}

interface UserSolutionStatusData {
  status: string;
  count: number;
  color: string;
}

interface PieChartLabelProps {
  status: string;
  percent: number;
}

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

export default function UserProfileStats({ userId }: UserProfileStatsProps) {
  const [activityData, setActivityData] = useState<UserActivityData[]>([]);
  const [solutionStatusData, setSolutionStatusData] = useState<UserSolutionStatusData[]>([]);
  const [userStats, setUserStats] = useState({
    totalProblems: 0,
    totalSolutions: 0,
    totalComments: 0,
    currentRank: 'Bronze'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserActivity();
    fetchSolutionStatus();
    fetchUserOverallStats();
  }, [userId]);
  const fetchUserActivity = async () => {
    try {
      // Simular actividad mensual del usuario usando datos mock
      const monthNames = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ];

      // Generar datos de actividad simulados para los últimos 6 meses
      const mockActivityData: UserActivityData[] = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthName = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        mockActivityData.push({
          month: monthName,
          problems: Math.floor(Math.random() * 15) + 5, // 5-20 problemas
          solutions: Math.floor(Math.random() * 20) + 10, // 10-30 soluciones
          comments: Math.floor(Math.random() * 25) + 5, // 5-30 comentarios
        });
      }

      setActivityData(mockActivityData);
    } catch (error) {
      console.error("Error fetching user activity:", error);
    }
  };
  const fetchSolutionStatus = async () => {
    try {
      // Simular datos de estado de soluciones
      const mockSolutionStatusData: UserSolutionStatusData[] = [
        { status: 'Oficial', count: Math.floor(Math.random() * 50) + 20, color: COLORS[0] },
        { status: 'No Oficial', count: Math.floor(Math.random() * 30) + 10, color: COLORS[1] },
      ];

      setSolutionStatusData(mockSolutionStatusData);
    } catch (error) {
      console.error("Error fetching solution status:", error);
    }
  };
  const fetchUserOverallStats = async () => {
    try {
      // Simular estadísticas generales del usuario
      const totalProblems = Math.floor(Math.random() * 100) + 50;
      const totalSolutions = Math.floor(Math.random() * 200) + 100;
      const totalComments = Math.floor(Math.random() * 150) + 75;

      // Determinar rank basado en la actividad total
      let currentRank = 'Bronze';
      const totalActivity = totalProblems + totalSolutions + totalComments;

      if (totalActivity > 400) {
        currentRank = 'Platinum';
      } else if (totalActivity > 300) {
        currentRank = 'Gold';
      } else if (totalActivity > 200) {
        currentRank = 'Silver';
      }

      setUserStats({
        totalProblems,
        totalSolutions,
        totalComments,
        currentRank
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando estadísticas del usuario...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700">Problemas Creados</h4>
          <p className="text-2xl font-bold text-blue-600">{userStats.totalProblems}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700">Soluciones</h4>
          <p className="text-2xl font-bold text-green-600">{userStats.totalSolutions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700">Comentarios</h4>
          <p className="text-2xl font-bold text-purple-600">{userStats.totalComments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700">Rank Actual</h4>
          <p className="text-2xl font-bold text-yellow-600">{userStats.currentRank}</p>
        </div>
      </div>

      {/* Gráfico de actividad por mes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Actividad Mensual</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="problems"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Problemas"
            />
            <Line
              type="monotone"
              dataKey="solutions"
              stroke="#10B981"
              strokeWidth={2}
              name="Soluciones"
            />
            <Line
              type="monotone"
              dataKey="comments"
              stroke="#8B5CF6"
              strokeWidth={2}
              name="Comentarios"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de estado de soluciones */}
      {solutionStatusData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Estado de Soluciones</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={solutionStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }: PieChartLabelProps) => `${status} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {solutionStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ProblemType {
  subject: string;
  difficulties: number[];
  average: number;
  fullMark: number;
}

interface ProblemDifficultyRadarChartProps {
  userId: number;
}

export default function ProblemDifficultyRadarChart({ userId }: ProblemDifficultyRadarChartProps) {
  const [radarData, setRadarData] = useState<ProblemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblemDifficultyData();
  }, [userId]);

  const fetchProblemDifficultyData = async () => {
    try {
      // Simulamos datos de dificultad por tipo de problema
      // En producción, esto vendría de una API
      const mockData: ProblemType[] = [
        {
          subject: "Teoría de Números",
          difficulties: [1, 10, 5, 3, 7, 2, 8],
          average: 5.1,
          fullMark: 10,
        },
        {
          subject: "Álgebra",
          difficulties: [0, 4, 8, 2, 6, 3, 5],
          average: 4.0,
          fullMark: 10,
        },
        {
          subject: "Geometría",
          difficulties: [3, 7, 6, 4, 9, 1, 5],
          average: 5.0,
          fullMark: 10,
        },
        {
          subject: "Combinatoria",
          difficulties: [2, 6, 3, 8, 4, 7, 5],
          average: 5.0,
          fullMark: 10,
        },
        {
          subject: "Análisis",
          difficulties: [5, 9, 4, 6, 7, 3, 8],
          average: 6.0,
          fullMark: 10,
        },
        {
          subject: "Probabilidad",
          difficulties: [1, 5, 3, 7, 2, 6, 4],
          average: 4.0,
          fullMark: 10,
        },
        {
          subject: "Topología",
          difficulties: [4, 8, 6, 5, 9, 2, 7],
          average: 5.9,
          fullMark: 10,
        },
      ];

      // Calculamos el promedio real para cada tipo
      const processedData = mockData.map(item => ({
        ...item,
        average: Number((item.difficulties.reduce((a, b) => a + b, 0) / item.difficulties.length).toFixed(1))
      }));

      setRadarData(processedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching problem difficulty data:", error);
      setLoading(false);
    }
  };

  // const customTooltip = ({ active, payload, label }: { active: boolean, payload: {payload: {average: number, difficulties: number[]}}[], label: string}) => {
  //   if (active && payload && payload.length) {
  //     const data = payload[0].payload;
  //     return (
  //       <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
  //         <p className="font-semibold text-gray-800">{label}</p>
  //         <p className="text-blue-600">
  //           Promedio de dificultad: <span className="font-bold">{data.average}/10</span>
  //         </p>
  //         <p className="text-gray-600 text-sm">
  //           Problemas resueltos: {data.difficulties.length}
  //         </p>
  //         <div className="mt-2">
  //           <p className="text-xs text-gray-500">Dificultades individuales:</p>
  //           <p className="text-xs text-gray-700">[{data.difficulties.join(', ')}]</p>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando análisis de dificultad...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">Análisis de Dificultad por Tipo de Problema</h3>
      <p className="text-gray-600 mb-4">
        Promedio de dificultad de los problemas resueltos (escala 0-10)
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: '#374151' }}
            className="text-sm"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: '#6B7280' }}
            tickCount={6}
          />
          <Radar
            name="Promedio de Dificultad"
            dataKey="average"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          />
          {/*TODO: No se como arreglar esto xd (da error) */}
          {/* <Tooltip content={customTooltip} /> */}
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Estadísticas adicionales */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <h4 className="text-sm font-semibold text-blue-800">Área Más Fuerte</h4>
          <p className="text-lg font-bold text-blue-600">
            {radarData.reduce((max, current) => current.average > max.average ? current : max, radarData[0])?.subject || "N/A"}
          </p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <h4 className="text-sm font-semibold text-red-800">Área a Mejorar</h4>
          <p className="text-lg font-bold text-red-600">
            {radarData.reduce((min, current) => current.average < min.average ? current : min, radarData[0])?.subject || "N/A"}
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <h4 className="text-sm font-semibold text-green-800">Promedio General</h4>
          <p className="text-lg font-bold text-green-600">
            {radarData.length > 0 ? (radarData.reduce((sum, item) => sum + item.average, 0) / radarData.length).toFixed(1) : "0.0"}/10
          </p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <h4 className="text-sm font-semibold text-purple-800">Total Problemas</h4>
          <p className="text-lg font-bold text-purple-600">
            {radarData.reduce((sum, item) => sum + item.difficulties.length, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Hook personalizado para manejar consultas a la base de datos con jsql-api
"use client";

import { useEffect, useState } from 'react';
import { type TableName } from '@/lib/database';

interface DatabaseRow {
  [key: string]: string | number | boolean | Date | null;
}

interface DatabaseHookReturn {
  queryTable: (tableName: TableName, columns?: string[]) => Promise<DatabaseRow[]>;
  isConnected: boolean;
  error: string | null;
  loading: boolean;
}

export function useDatabase(): DatabaseHookReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar conexión inicial - simulado por ahora
    const testConnection = async () => {
      try {
        setLoading(true);
        // Por ahora asumimos que la conexión está disponible
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error('Error de conexión a la base de datos:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido de conexión');
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  const queryTable = async (tableName: TableName, columns: string[] = ['*']): Promise<DatabaseRow[]> => {
    if (!isConnected) {
      throw new Error('No hay conexión a la base de datos');
    }

    try {
      // Por ahora retornamos datos simulados hasta que se configure el servidor API
      console.log(`Consultando tabla: ${tableName} con columnas:`, columns);

      // Datos simulados para desarrollo
      return [];
    } catch (err) {
      console.error(`Error consultando ${tableName}:`, err);
      throw err;
    }
  };

  return {
    queryTable,
    isConnected,
    error,
    loading
  };
}

// Hook especializado para estadísticas de usuarios
export function useUserStats() {
  const { queryTable, isConnected, error, loading } = useDatabase();
  const [stats, setStats] = useState<DatabaseRow[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!isConnected || loading) return;

    const fetchStats = async () => {
      try {
        setStatsLoading(true);

        // Datos simulados para desarrollo
        const mockStats = [
          {
            username: 'usuario1',
            total_solutions_publicated: 25,
            total_correct_solutions_publicated: 20,
            total_problems_publicated: 5,
            country_name: 'República Dominicana',
            create_date: '2024-01-15'
          },
          {
            username: 'usuario2',
            total_solutions_publicated: 18,
            total_correct_solutions_publicated: 15,
            total_problems_publicated: 3,
            country_name: 'México',
            create_date: '2024-02-10'
          }
        ];

        setStats(mockStats);
      } catch (err) {
        console.error('Error obteniendo estadísticas de usuarios:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [isConnected, loading, queryTable]);

  return {
    stats,
    loading: loading || statsLoading,
    error,
    refetch: () => {
      // Lógica para refrescar datos si es necesario
    }
  };
}

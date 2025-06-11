// Configuración de la base de datos para jsql-api
export const dbConfig = {
  // Configuración para SQL Server
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'TomocDb',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: false, // true si se usa Azure
    trustServerCertificate: true, // true para desarrollo local
  },
  // URL base de la API si jsql-api se conecta a través de un servidor API
  apiUrl: process.env.JSQL_API_URL || 'http://localhost:3001/api/sql',
};

// Esquema de tablas disponibles basado en las vistas del contenido
export const tableSchemas = {
  // Vistas de contenido principales
  'content.VUsers': {
    schema: 'content',
    name: 'VUsers',
    columns: ['id', 'create_date', 'first_name', 'middle_name', 'first_surname', 'second_surname', 'username', 'email', 'country_id', 'country_name', 'profile_picture_url', 'role_id', 'role_name']
  },
  'content.VProblems': {
    schema: 'content',
    name: 'VProblems',
    columns: ['id', 'entity_id', 'user_id', 'username', 'create_date', 'problem_type', 'problem_type_name', 'contest_id', 'contest_name', 'contest_short_name', 'contest_type', 'problem_name', 'explication', 'country_id', 'country_name', 'difficulty', 'points', 'verified']
  },
  'content.VSolutions': {
    schema: 'content',
    name: 'VSolutions',
    columns: ['id', 'publication_id', 'user_id', 'username', 'user_picture', 'user_country', 'problem_id', 'problem_type_name', 'create_date', 'answer', 'explication', 'is_official']
  },
  'content.VUsersStats': {
    schema: 'content',
    name: 'VUsersStats',
    columns: ['id', 'first_name', 'middle_name', 'first_surname', 'second_surname', 'username', 'email', 'create_date', 'country_id', 'country_name', 'profile_picture_url', 'role_id', 'role_name', 'total_solutions_publicated', 'total_correct_solutions_publicated', 'total_problems_publicated']
  },
  'content.VContests': {
    schema: 'content',
    name: 'VContests',
    columns: ['id', 'name', 'short_name', 'year_made', 'type']
  },
  'content.VCorrectAnswers': {
    schema: 'content',
    name: 'VCorrectAnswers',
    columns: ['id', 'user_id', 'username', 'problem_id', 'create_date', 'explication', 'answer']
  }
};

export type TableName = keyof typeof tableSchemas;

// lib/db.ts - Conexão com Neon (PostgreSQL gratuito, sem hibernação)
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      usuario VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(200) UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
      is_confirmado BOOLEAN NOT NULL DEFAULT FALSE,
      token_confirmacao TEXT,
      data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS fichas (
      id SERIAL PRIMARY KEY,
      paciente JSONB NOT NULL DEFAULT '{}',
      contrato JSONB NOT NULL DEFAULT '{}',
      analise_ia JSONB NOT NULL DEFAULT '{}',
      procedimento JSONB NOT NULL DEFAULT '{}',
      data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sql, initDb } from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const { usuario, senha } = await req.json();

    if (!usuario || !senha) {
      return NextResponse.json(
        { sucesso: false, erro: 'Usuário e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT * FROM usuarios WHERE usuario = ${usuario} LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { sucesso: false, erro: 'Usuário ou senha inválidos.' },
        { status: 401 }
      );
    }

    const user = rows[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return NextResponse.json(
        { sucesso: false, erro: 'Usuário ou senha inválidos.' },
        { status: 401 }
      );
    }

    if (!user.is_confirmado) {
      return NextResponse.json(
        { sucesso: false, erro: 'Conta inativa. Confirme seu e-mail antes de acessar.' },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user.id,
      usuario: user.usuario,
      role: user.role || 'user',
    });

    return NextResponse.json({
      sucesso: true,
      role: user.role || 'user',
      usuario: user.usuario,
      token,
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return NextResponse.json(
      { sucesso: false, erro: 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}

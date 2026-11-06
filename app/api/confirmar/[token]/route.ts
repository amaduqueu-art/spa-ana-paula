// app/api/confirmar/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const rows = await sql`
      SELECT id FROM usuarios WHERE token_confirmacao = ${token} LIMIT 1
    `;

    if (rows.length === 0) {
      return new NextResponse(
        `<h1 style="color:#b8455f;font-family:sans-serif;text-align:center;margin-top:50px;">
          Token de confirmação inválido ou expirado.
        </h1>`,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    await sql`
      UPDATE usuarios 
      SET is_confirmado = true, token_confirmacao = null
      WHERE token_confirmacao = ${token}
    `;

    return new NextResponse(
      `<div style="font-family:sans-serif;text-align:center;margin-top:50px;max-width:500px;margin:80px auto;padding:20px;">
        <div style="width:60px;height:60px;background:linear-gradient(135deg,#c98a9b,#a85d72);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;color:white;font-size:28px;margin-bottom:16px;">✦</div>
        <h1 style="color:#4a9b7f;">Conta confirmada com sucesso!</h1>
        <p>Sua conta no sistema do <b>SPA Ana Paula Merêncio</b> foi ativada.</p>
        <p>Você já pode fechar esta aba e realizar o login.</p>
        <a href="/" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#a85d72;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Ir para o Sistema</a>
      </div>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('[CONFIRMAR ERROR]', error);
    return new NextResponse('Erro interno ao confirmar conta.', { status: 500 });
  }
}

// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { sql, initDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const { usuario, email, senha, role } = await req.json();

    if (!usuario || !email || !senha) {
      return NextResponse.json(
        { sucesso: false, erro: 'Preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }

    const perfilFinal = role === 'admin' ? 'admin' : 'user';

    // Verifica se já existe
    const existe = await sql`
      SELECT id FROM usuarios WHERE email = ${email} OR usuario = ${usuario} LIMIT 1
    `;

    if (existe.length > 0) {
      return NextResponse.json(
        { sucesso: false, erro: 'Nome de usuário ou e-mail já cadastrado.' },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const token = crypto.randomBytes(32).toString('hex');

    await sql`
      INSERT INTO usuarios (usuario, email, senha, role, is_confirmado, token_confirmacao)
      VALUES (${usuario}, ${email}, ${senhaHash}, ${perfilFinal}, false, ${token})
    `;

    // Enviar e-mail de confirmação
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const linkConfirmacao = `${protocol}://${host}/api/confirmar/${token}`;
    const descPerfil = perfilFinal === 'admin' ? 'Administrador' : 'Usuário Comum';

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Confirme sua conta - SPA Ana Paula Merêncio',
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 500px; margin: 0 auto;">
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #c98a9b, #a85d72); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin-bottom: 10px;">✦</div>
                <h2 style="color: #a85d72; margin: 0;">SPA Ana Paula Merêncio</h2>
              </div>
              <h3>Olá, ${usuario}!</h3>
              <p>Sua conta de <b>${descPerfil}</b> foi solicitada no sistema.</p>
              <p>Clique no botão abaixo para confirmar seu e-mail e liberar o acesso:</p>
              <div style="text-align: center; margin: 25px 0;">
                <a href="${linkConfirmacao}" style="padding: 14px 28px; background: #a85d72; color: #fff; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                  CONFIRMAR ACESSO
                </a>
              </div>
              <p style="font-size: 12px; color: #777;">Se você não solicitou este cadastro, desconsidere este e-mail.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.warn('Aviso: erro ao enviar e-mail:', emailError);
      }
    } else {
      // Em desenvolvimento, confirmar automaticamente
      await sql`
        UPDATE usuarios SET is_confirmado = true, token_confirmacao = null
        WHERE token_confirmacao = ${token}
      `;
      return NextResponse.json({
        sucesso: true,
        mensagem: `Cadastro de ${descPerfil} realizado! (Modo dev: conta ativada automaticamente)`,
      });
    }

    return NextResponse.json(
      {
        sucesso: true,
        mensagem: `Cadastro de ${descPerfil} realizado! Verifique seu e-mail para confirmar a conta.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    return NextResponse.json(
      { sucesso: false, erro: 'Erro interno ao realizar cadastro.' },
      { status: 500 }
    );
  }
}

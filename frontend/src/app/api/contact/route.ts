import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, whatsapp, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    // Configurar o transportador do Nodemailer com Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: 465,
      secure: true, // true para port 465
      auth: {
        user: process.env.SMTP_USER, // ex: contato@notadentro.com
        pass: process.env.SMTP_PASS, // Senha de Aplicativo
      },
    });

    // Definir para qual email a mensagem será enviada
    const toEmail = subject === 'suporte' 
      ? 'suporte@notadentro.com' 
      : 'contato@notadentro.com';

    // Disparar o e-mail
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Zoho exige que o remetente seja a própria conta autenticada
      replyTo: email, // Quando responder, vai para o e-mail do usuário
      to: toEmail,
      subject: `[NotaDentro Form] Nova mensagem de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp || 'Não informado'}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
    });

    return NextResponse.json({ success: true, message: 'Contato enviado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar contato:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar e-mail' }, { status: 500 });
  }
}

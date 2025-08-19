import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.projectType || !formData.description) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      );
    }

    // Email content
    const emailContent = `
Nova Solicitação de Orçamento - LAMFO

DADOS DO CLIENTE:
Nome: ${formData.name}
Email: ${formData.email}
Empresa: ${formData.company || 'Não informado'}
Telefone: ${formData.phone || 'Não informado'}

DETALHES DO PROJETO:
Tipo de Projeto: ${formData.projectType}
Descrição: ${formData.description}
Objetivos: ${formData.objectives || 'Não informado'}
Prazo Desejado: ${formData.timeline || 'Não informado'}
Orçamento Aproximado: ${formData.budget || 'Não informado'}

Data da Solicitação: ${new Date().toLocaleString('pt-BR')}
    `;

    // Here you would integrate with your preferred email service
    // Examples: Nodemailer, SendGrid, AWS SES, etc.
    
    // For demonstration purposes, we'll log the content
    // In production, replace this with actual email sending logic
    console.log('Email Content:', emailContent);
    
    // Example with Nodemailer (you'll need to install and configure):
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'lamfo@unb.br', // Replace with LAMFO's email
      subject: `Nova Solicitação de Orçamento - ${formData.name}`,
      text: emailContent,
      replyTo: formData.email
    });
    */

    // For now, we'll simulate successful submission
    return NextResponse.json({ 
      success: true, 
      message: 'Solicitação recebida com sucesso!' 
    });

  } catch (error) {
    console.error('Error processing budget request:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ideias - Plataforma de Infoprodutos',
  description: 'Plataforma de lançamento e gerenciamento de infoprodutos e projetos digitais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

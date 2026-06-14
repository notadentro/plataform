import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Page from './page'

// 1. Mock do contexto de usuário para a página achar que estamos "deslogados"
vi.mock('@/contexts/UserContext', () => ({
  useUser: () => ({
    user: null,
    loading: false,
  }),
  UserProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// 2. Mock do roteador do Next.js
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/',
}))

describe('Landing Page', () => {
  it('deve renderizar a tela inicial sem quebrar', () => {
    render(<Page />)
    // Busca por qualquer elemento na tela que contenha "Nota Dentro"
    expect(screen.getAllByText(/Nota Dentro/i)[0]).toBeInTheDocument()
  })
})

import { ThemeProvider } from 'styled-components'

import { Transactions } from './pages/Transactions'

import { TransactionsProvider } from './contexts/TransactionsContext'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}

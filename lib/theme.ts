import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { Sarabun } from 'next/font/google'

export const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai'],
  display: 'swap',
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: '#E2F4FF',
    },
    primary: {
      main: '#0066FF',
    },
    secondary: {
      main: '#3F4257',
    },
    error: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: sarabun.style.fontFamily,
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
})

export default theme

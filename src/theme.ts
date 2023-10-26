// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const colors = {
  brand: {
    100: '#282424'
  },
  rating_green: {
    100: 'rgba(0, 255, 74, 0.15)'
  }
};

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
}

// 3. extend the theme
const theme = extendTheme({ config, colors })

export default theme
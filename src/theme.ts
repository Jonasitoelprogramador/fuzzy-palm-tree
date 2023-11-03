import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Define your custom colors
const colors = {
  brand: {
    100: '#282424'
  },
  rating_green: {
    100: 'rgba(0, 255, 74, 0.15)'
  },
  my_gray: {
    100: '#b8acab'
  }
};

// Your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
};

// Define your global styles
const styles = {
  global: {
    "html, body": {
      backgroundColor: "black",
    },
  },
};

// Merge them together with `extendTheme`
const customTheme = extendTheme({ config, colors, styles });

export default customTheme;

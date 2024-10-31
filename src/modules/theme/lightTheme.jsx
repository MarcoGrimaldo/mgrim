import { createTheme } from '@mui/material/styles';

// Light theme settings
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#608BC1' // Customize the color
    },
    text: {
      primary: '#000',
      primaryLight: '#758694',
      primaryLight2: '#0000008a',
      secondary: '#0d47a1'
    },
    background: {
      default: '#f4f5f7', // Adjust the background color to match your design
      secondary: '#fff',
      tertiary: '#608BC1'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 400 // Adjust the font weight as needed
    },
    subtitle1: {
      lineHeight: 1.5
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#608BC1'
        }
      }
    }
  }
});

export default lightTheme;

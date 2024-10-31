import { createTheme } from '@mui/material/styles';

// Dark theme settings
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#133E87'
    },
    text: {
      primary: '#EEEEEE',
      secondary: '#999' // Less contrast dark text
    },
    background: {
      default: '#202020',
      secondary: '#262626',
      tertiary: '#133E87'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#133E87'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#262626'
        }
      }
    }
  }
});

export default darkTheme;

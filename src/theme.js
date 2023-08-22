import { createTheme } from '@mui/material';

// Create a custom theme
export const theme = createTheme({
  components: {

    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },

    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins, sans-serif',
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#E89E46",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),

   
  },
});

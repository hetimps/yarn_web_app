import { createTheme } from '@mui/material';
// Create a custom theme
 export const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    primary: {
      main: "#E89E46",
    },
  },
});

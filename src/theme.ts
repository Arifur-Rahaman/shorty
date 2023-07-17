import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      primary: {
        main: '#fe602c',
      },
      secondary: {
        main: '#0a9ffb',
      },
    },

    typography: {
      fontFamily: [
        'Montserrat',
        'sans-serif',
      ].join(','),
    },
  });

  export default theme
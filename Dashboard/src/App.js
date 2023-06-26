// import logo from './img/background.jpg';
import './App.css';
import Nasa from './Components/Cards/NASA/Nasa';
import RecentEvents from './Components/Cards/RecentEvents/RecentEvents';
import Navbar from './Components/Navbar/Navbar';
import { Box } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import Sun from './Components/Cards/Sun/Sun';
// import background from './img/';



function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#8A2BE2', // Customize the primary color
      },
      text: {
        primary: '#333', // Customize the primary text color
      },
    },
    typography: {
      fontFamily: 'Caveat, cursive', // Customize the font family
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#8A2BE2', // Customize the hover background color
              color: '#ffffff', // Customize the hover font color
            },
          },
        },
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Router>

        <Box >
          <Navbar />
        </Box>
        <Routes>
          <Route path="/recentEvents" element={<RecentEvents />} />
          <Route path="/nasa" element={<Nasa />} />
          <Route path="/sun" element={<Sun />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

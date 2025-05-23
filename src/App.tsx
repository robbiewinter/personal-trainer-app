import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavigationBar from './components/AppBar';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Customer from './components/Customer';
import Training from './components/Training';
import PtCalendar from './components/PtCalendar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

function HeaderTitle() {
  const currPage = useLocation();

  let title = "Customer Management";
  if (currPage.pathname === "/trainings") {
    title = "Trainings";
  } else if (currPage.pathname === "/customers") {
    title = "Customers";
  } else if (currPage.pathname === "/calendar") {
    title = "Calendar";
  }

  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      {title}
    </Typography>
  );
}


function App() {
  return (

    <Router basename="/personal-trainer-app/">
      <NavigationBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <HeaderTitle />
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/trainings" element={<Training />} />
          <Route path="/calendar" element={<PtCalendar />} />
        </Routes>
        <CssBaseline />
      </Container>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customer from "./components/Customer";
import Training from "./components/Training";

import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Customer site</Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/trainings" element={<Training />} />
        </Routes>
        <CssBaseline />
      </Container>
    </BrowserRouter>
  );
}

export default App;

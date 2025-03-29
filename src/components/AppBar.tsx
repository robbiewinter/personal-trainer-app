import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavigationBar() {
    return (
        <AppBar sx={{
            position: "static",
            backgroundColor: "blue",
            borderRadius: 2,
            width: "20%",
            margin: "0 auto",
            
        }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/customers">
                    Customers
                </Button>
                <Button color="inherit" component={Link} to="/trainings">
                    Trainings
                </Button>
            </Toolbar>
        </AppBar>
    );
}

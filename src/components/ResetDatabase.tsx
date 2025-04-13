import { Button } from "@mui/material";
import { resetDatabase } from "../ptapi";

type ResetDatabaseButtonProps = {
    fetchCustomers: () => void;
    fetchTrainings: () => void;
};

export default function ResetDatabaseButton({ fetchCustomers, fetchTrainings }: ResetDatabaseButtonProps) {
    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the database? This action cannot be undone.")) {
            resetDatabase()
                .then(() => {
                    alert("Database has been reset.");
                    fetchCustomers();
                    fetchTrainings();
                })
                .catch(err => {
                    console.error(err);
                    alert("Failed to reset the database.");
                });
        }
    };

    return (
        <Button variant="contained" color="error" onClick={handleReset}>
            Reset Database
        </Button>
    );
}
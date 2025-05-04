import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Training } from "../types";
import { getTrainings, deleteTraining } from "../ptapi";
import AddTraining from "./AddTraining";
import { Button } from "@mui/material";

// Registering the AG Grid community module
ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
    // Stores training data
    const [trainings, setTrainings] = useState<Training[]>([]);

    // Defines columns for AG Grid
    const [columnDefs] = useState<ColDef<Training>[]>([
        { field: "customer.firstname", headerName: "Firstname", filter: true },
        { field: "customer.lastname", headerName: "Lastname", filter: true },
        { field: "date", headerName: "Date", filter: true, width: 250 },
        { field: "duration", headerName: "Duration (minutes)", filter: true, width: 120 },
        { field: "activity", headerName: "Activity", filter: true, width: 130 },
        {
            width: 120,
            cellRenderer: (params: ICellRendererParams) => 
                <Button size="small" color="error" onClick={() => handleDelete(params)}>
                    Delete
                </Button>
        }
    ]);

    // Fetch training data when the component mounts
    useEffect(() => {
        fetchTrainings();
    }, []);

    // Function to fetch training data from the API
    const fetchTrainings = async () => {
        try {
            const data = await getTrainings();

            // Format the data for the grid
            const formattedData = data.map((training: Training) => ({
                ...training,
                date: dayjs(training.date).format("DD.MM.YYYY HH:mm"), // Format the date
            }));

            setTrainings(formattedData); // Update state with formatted data
        } catch (error) {
            console.error(error); // Log errors to the console
        }
    };

    const handleDelete = (params: ICellRendererParams) => {
        if (window.confirm("Are you sure?")) {
            deleteTraining(params.data._links.self.href) // Delete the training using its link
            .then(() => fetchTrainings())
            .catch(err => console.error(err));
        }
    }

    return (
        <>
            <AddTraining fetchTrainings={fetchTrainings} />

            {/* Renders AG Grid */}
            <div style={{ width: "100%", height: 500 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </>
    );
}
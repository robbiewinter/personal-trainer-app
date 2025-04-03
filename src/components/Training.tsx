import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { Training } from "../types";
import { getTrainings } from "../ptapi";

// Registering the AG Grid community module
ModuleRegistry.registerModules([AllCommunityModule]);


export default function TrainingList() {
    // Stores training data
    const [trainings, setTrainings] = useState<Training[]>([]);

    // Defines columns for AG Grid
    const [columnDefs] = useState<ColDef<Training>[]>([
        { field: "firstname", filter: true},
        { field: "lastname", filter: true},
        { field: "date", filter: true, width: 250 },
        { field: "duration", filter: true, width: 120 },
        { field: "activity", filter: true, width: 130 }
    ]);

    // Fetch training data when the component mounts
    useEffect(() => {
        fetchTrainings();
    }, [])

    // Function to fetch training data from the API
    const fetchTrainings = () => {
        getTrainings()
        .then(data => {
            // Format the fetched data
            const formattedData = data.map((training: Training) => ({
                ...training,
                firstname: training.customer.firstname,
                lastname: training.customer.lastname,
                date: dayjs(training.date).format('DD.MM.YYYY hh:mm'),
            }));
            setTrainings(formattedData); // Update state with formatted data
        })
        .catch(error => console.error(error)); // Log errors to the console
    }

    return (
        <>
            {/* Renders AG Grid */}
            <div style={{ width: '100%', height: 500}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </>
    )
}
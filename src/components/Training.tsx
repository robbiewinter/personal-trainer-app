import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import NavigationBar from "./AppBar";

ModuleRegistry.registerModules([AllCommunityModule]);

type Training = {
    firstname: string;
    lastname: string;
    date: string;
    duration: number;
    activity: string;
}

export default function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const [columnDefs] = useState<ColDef<Training>[]>([
        { field: "firstname", filter: true},
        { field: "lastname", filter: true},
        { field: "date", filter: true, width: 250 },
        { field: "duration", filter: true, width: 120 },
        { field: "activity", filter: true, width: 130 }
    ]);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching trainings.");
            }
            return response.json();
        })
        .then(data => {
            const formattedData = data.map((training: any) => ({
                ...training,
                firstname: training.customer.firstname,
                lastname: training.customer.lastname,
            }));
            setTrainings(formattedData);
        })
        .catch(error => console.error(error));
    }

    return (
        <>
            <div style={{ width: '100%', height: 600}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <NavigationBar />
        </>
    )
}
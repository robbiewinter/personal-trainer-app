import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import NavigationBar from "./AppBar";

ModuleRegistry.registerModules([AllCommunityModule]);

type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export default function Carlist() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const [columnDefs] = useState<ColDef<Customer>[]>([
        { field: "firstname", filter: true},
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true, width: 100 },
        { field: "city", filter: true, width: 120 },
        { field: "email", filter: true, width: 160 },
        { field: "phone", filter: true, width: 120 }
    ]);

    useEffect(() => {
        fetchCars();
    }, [])

    const fetchCars = () => {
        fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching cars.");
            }
            return response.json()
        })
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => console.error(error))
    }
  
    return (
        <>
            <div style={{ width: '100%', height: 500}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <NavigationBar />
        </>
    )
}
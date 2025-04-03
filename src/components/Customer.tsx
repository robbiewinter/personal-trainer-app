import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { Customer } from "../types";
import { getCustomers } from "../ptapi";

// Registering the AG Grid community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
    // State to store the list of customers
    const [customers, setCustomers] = useState<Customer[]>([]);

    // Column definitions for the AG Grid
    const [columnDefs] = useState<ColDef<Customer>[]>([
        { field: "firstname", filter: true},
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true, width: 100 },
        { field: "city", filter: true, width: 120 },
        { field: "email", filter: true, width: 160 },
        { field: "phone", filter: true, width: 120 }
    ]);

    // Fetch customers when the component is mounted
    useEffect(() => {
        fetchCustomers();
    }, [])

    // Function to fetch customers from the API
    const fetchCustomers = () => {
        getCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => console.error(error))
    }
  
    return (
        <>
            {/* AG Grid to display customer data */}
            <div style={{ width: '100%', height: 500, }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </>
    )
}
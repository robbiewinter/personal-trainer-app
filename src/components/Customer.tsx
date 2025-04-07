import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from "ag-grid-community";
import { CustomerData } from "../types";
import { getCustomers } from "../ptapi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

// Registering the AG Grid community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
    // State to store the list of customers
    const [customers, setCustomers] = useState<CustomerData[]>([]);

    // Column definitions for the AG Grid
    const [columnDefs] = useState<ColDef<CustomerData>[]>([
        { field: "firstname", filter: true, width: 130},
        { field: "lastname", filter: true, width: 130},
        { field: "streetaddress", filter: true, width: 150},
        { field: "postcode", filter: true, width: 115 },
        { field: "city", filter: true, width: 115 },
        { field: "email", filter: true, width: 160 },
        { field: "phone", filter: true, width: 120 },
        {
            width: 120,
            cellRenderer: (params: ICellRendererParams) =>
                <EditCustomer data={params.data} fetchCustomers={fetchCustomers} />
        }
    ]);

    // Fetch customers when the component is mounted
    useEffect(() => {
        fetchCustomers();
    }, [])

    // Function to fetch customers from the API
    const fetchCustomers = () => {
        getCustomers()
        .then(data => setCustomers(data))
        .catch(error => console.error(error))
    }
  
    return (
        <>
            <AddCustomer fetchCustomers={fetchCustomers}/>

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
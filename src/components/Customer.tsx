import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from "ag-grid-community";
import { Button, Snackbar} from "@mui/material";
import { CustomerData } from "../types";
import { getCustomers, deleteCustomer } from "../ptapi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import ResetDatabaseButton from "./ResetDatabase";

// Registering the AG Grid community modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
    // State to store the list of customers
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [open, setOpen] = useState(false);

    const gridRef = useRef<AgGridReact>(null);

    const exportCsv = () => {
        if (gridRef.current) {
            gridRef.current.api.exportDataAsCsv({
                fileName: "customers.csv",
                allColumns: true,
            });
        }
    };

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
        },
        {
            width: 120,
            cellRenderer: (params: ICellRendererParams) => 
                <Button size="small" color="error" onClick={() => handleDelete(params)}>
                    Delete
                </Button>
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

    const handleDelete = (params: ICellRendererParams) => {
        if (window.confirm("Are you sure?")) {
            deleteCustomer(params.data._links.self.href)
            .then(() => fetchCustomers())
            .then(() => setOpen(true))
            .catch(err => console.error(err));
        }
    }
  
    return (
        <>
            <AddCustomer fetchCustomers={fetchCustomers}/>
            <ResetDatabaseButton fetchCustomers={fetchCustomers} fetchTrainings={function (): void {
                throw new Error("Function not implemented.");
            } } />
            <Button variant="contained" onClick={exportCsv}>
                Export to CSV
            </Button>
            {/* AG Grid to display customer data */}
            <div style={{ width: '100%', height: 500, }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer deleted successfully"
            />
        </>
    )
}
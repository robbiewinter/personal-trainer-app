import { useState } from "react";
import { Customer } from "../types";
import { PropaneSharp } from "@mui/icons-material";

type AddCustomerProps = {
    fetchCustomers: () => void;
}

export default function AddCustomer(props: AddCustomerProps) {
    const [customer, setCustomer] = useState<Customer>({} as Customer);
    const [open, setOpen] = useState(false);

    const handleOpenClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        fetch(import.meta.env.VITE_API_URL + "/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(() => props.fetchCustomers())
        .then(() => handleClose())
        .catch(err => console.log(err));
    }
}
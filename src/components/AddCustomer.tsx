import { useState } from "react";
import { CustomerData } from "../types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

type AddCustomerProps = {
    fetchCustomers: () => void;
}

export default function AddCustomer(props: AddCustomerProps) {
    const [customer, setCustomer] = useState<CustomerData>({} as CustomerData);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
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
                throw new Error("Error when fetching customer");
            }
            return response.json();
        })
        .then(() => props.fetchCustomers())
        .then(() => handleClose())
        .catch(err => console.log(err));
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add a new Customer</DialogTitle>
                <DialogContent>
                <TextField
                    required
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={event => setCustomer({ ...customer, firstname: event.target.value })}
                    label="Firstname"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    required
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={event => setCustomer({ ...customer, lastname: event.target.value })}
                    label="Lastname"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    required
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={event => setCustomer({ ...customer, streetaddress: event.target.value })}
                    label="Address"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    required
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={event => setCustomer({ ...customer, postcode: event.target.value })}
                    label="postcode"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    required
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={event => setCustomer({ ...customer, city: event.target.value })}
                    label="city"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    required
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={event => setCustomer({ ...customer, email: event.target.value })}
                    label="email"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    required
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={event => setCustomer({ ...customer, phone: event.target.value })}
                    label="Phone number"
                    fullWidth
                    variant="standard"
                />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleSave()}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}
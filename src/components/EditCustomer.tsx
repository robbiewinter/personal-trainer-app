import { useState } from "react";
import { Customer, CustomerData } from "../types";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";

type EditCustomerProps = {
    data: CustomerData;
    fetchCustomers: () => void;
}


export default function EditCustomer(props: EditCustomerProps) {
    const [customer, setCustomer] = useState<Customer>({} as Customer);
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
      setCustomer({
          id: props.data.id,
          firstname: props.data.firstname,
          lastname: props.data.lastname,
          streetaddress: props.data.streetaddress,
          postcode: props.data.postcode,
          city: props.data.city,
          email: props.data.email,
          phone: props.data.phone
      });
    };

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleUpdate = () => {
        fetch(`${import.meta.env.VITE_API_URL}/customers/${props.data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok) {
            throw new Error("Error when updating customer.");
            }
            return response.json();
        })
        .then(() => props.fetchCustomers())
        .then(() => handleClose())
        .catch(err => console.error(err))
      }

      return (
        <>
          <Button size="small" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Update a customer</DialogTitle>
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
                label="Street address"
                fullWidth
                variant="standard"
              />
    
              <TextField
                required
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={event => setCustomer({ ...customer, postcode: event.target.value })}
                label="Postcode"
                fullWidth
                variant="standard"
              />
    
              <TextField
                required
                margin="dense"
                name="city"
                value={customer.city}
                onChange={event => setCustomer({ ...customer, city: event.target.value })}
                label="City"
                fullWidth
                variant="standard"
              />
    
              <TextField
                required
                margin="dense"
                name="email"
                value={customer.email}
                onChange={event => setCustomer({ ...customer, email: event.target.value })}
                label="Email"
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
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
        </>
      );
}
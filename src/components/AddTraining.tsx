import { useState } from "react";
import { TrainingData } from "../types";
import { Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


type AddTrainingProps = {
    fetchTrainings: () => void;
};

export default function AddTraining(props: AddTrainingProps) {
    const [training, setTraining] = useState<Omit<TrainingData, "id">>({
        date: "",
        duration: 0,
        activity: "",
        customer: {
            id: "",
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: "",
        },
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Fetch customer based on name
        fetch(
            `${import.meta.env.VITE_API_URL}/customers?firstname=${training.customer.firstname}&lastname=${training.customer.lastname}`
        )
            .then((customerResponse) => {
                if (!customerResponse.ok) {
                    throw new Error("Error fetching customer");
                }
                return customerResponse.json();
            })
            .then((customerData) => {
                // Matches customers firstname and lastname
                const matchingCustomer = customerData._embedded.customers.find(
                    (customer: any) =>
                        customer.firstname === training.customer.firstname &&
                        customer.lastname === training.customer.lastname
                );
    
                if (!matchingCustomer) {
                    throw new Error("No matching customer found");
                }
    
                const customerUrl = matchingCustomer._links.self.href;
    
                const data = {
                    date: new Date(training.date).toISOString(), // Format as ISO-8601 
                    duration: training.duration,
                    activity: training.activity,
                    customer: customerUrl, // Use the correct customer URL
                };
    
                // Send the training data to the server
                return fetch(import.meta.env.VITE_API_URL + "/trainings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error saving training");
                }
                return response.json();
            })
            .then(() => {
                props.fetchTrainings();
                handleClose();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new Training</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        name="firstname"
                        value={training.customer.firstname}
                        onChange={(e) =>
                            setTraining({
                                ...training,
                                customer: { ...training.customer, firstname: e.target.value },
                            })
                        }
                        label="Customer Firstname"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="lastname"
                        value={training.customer.lastname}
                        onChange={(e) =>
                            setTraining({
                                ...training,
                                customer: { ...training.customer, lastname: e.target.value },
                            })
                        }
                        label="Customer Lastname"
                        fullWidth
                        variant="standard"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date and Time"
                            value={dayjs(training.date)}
                            onChange={(newValue) =>
                            setTraining({ ...training, date: newValue ? newValue.toISOString() : '' })
                            }
                            slotProps={{ textField: {
                                variant: 'standard',
                                margin: 'dense',
                                required: true,
                                fullWidth: true } 
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        required
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={(e) =>
                            setTraining({
                                ...training,
                                duration: Number(e.target.value),
                            })
                        }
                        label="Duration (minutes)"
                        fullWidth
                        variant="standard"
                        type="number"
                    />
                    <TextField
                        required
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={(e) =>
                            setTraining({ ...training, activity: e.target.value })
                        }
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
// This file contains the type definitions for the application
export type Customer = Omit<CustomerData, "_links">;

export type CustomerData = {
    id: string;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type Training = {
    firstname: string;
    lastname: string;
    date: string;
    duration: number;
    activity: string;
    customer: {
        firstname: string;
        lastname: string;
    };
}
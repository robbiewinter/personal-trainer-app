// This file contains the type definitions for the application
export type Customer = Omit<CustomerData, "_links">;
export type Training = Omit<TrainingData, "_links">;

export type CustomerData = {
    id: string;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
};

export type TrainingData = {
    id?: string; // Optional, as it may not exist before saving
    date: string;
    duration: number;
    activity: string;
    customer: CustomerData; // Link to the customer object
    _links?: {
        self: { href: string };
        customer: { href: string };
    };
};

export type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
};

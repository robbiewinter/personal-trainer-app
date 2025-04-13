export const getTrainings = () => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching trainings.");
            }
            return response.json();
        })
        .then(data => {
            // Extract trainings from the "_embedded" object
            return data._embedded.trainings.map(async (training: any) => {
                const customerResponse = await fetch(training._links.customer.href);
                const customer = await customerResponse.json();

                return {
                    ...training,
                    customer, // Include the full customer object
                    id: training._links.self.href.split("/").pop(), // Extract training ID
                };
            });
        })
        .then(promises => Promise.all(promises)); // Resolve all promises
};

export const getCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error when fetching customers.");
        }
        return response.json()
    })
    .then(data => {
        return data._embedded.customers.map((customer: any) => {
            const id = customer._links.self.href.split("/").pop();
            return { ...customer, id };
        });
    });
};

export function deleteCustomer(url: string) {
    return fetch(url, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error when deleting customer.");
        }
        return response.text();
    });
};

export function deleteTraining(url: string) {
    return fetch(url, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error when deleting training.");
        }
        return response.text();
    });
};

export const resetDatabase = () => {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset", {
        method: "POST",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error when resetting the database.");
        }
        return response.text();
    });
};
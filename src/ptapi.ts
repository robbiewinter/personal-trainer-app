export const getTrainings = () => {
        return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching trainings.");
            }
            return response.json();
        })
    }

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
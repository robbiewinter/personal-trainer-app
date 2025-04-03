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
            throw new Error("Error when fetching cars.");
        }
        return response.json()
    })
}
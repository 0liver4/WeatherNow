import { geoApi } from "../axios/axiosInstance";

export default async function getCountry(country) {
    try {
        const req = await geoApi.get("", {
            params: {
                name: country,
            }
        });

        const data = req.data;

        // Return ALL the country
        return data.results?.[0] ?? null;

    } catch (error) {
        console.log("Error GEO:", error);
        return null;
    }
}

// AGREGA ESTO 👇
export async function getCountrySuggestions(query) {
    if (!query || query.trim().length < 2) return [];

    try {
        const req = await geoApi.get("", {
            params: {
                name: query,
                count: 5,
            }
        });

        return req.data.results ?? [];

    } catch (error) {
        console.log("Error GEO suggestions:", error);
        return [];
    }
}
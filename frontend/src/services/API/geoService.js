import { geoApi } from "../axios/axiosInstance";

export default async function getCountry(country) {

    try {

        const req = await geoApi.get("", {
            params: {
                name: country,
                count: 1
            }
        });

        const data = req.data;

        // Devuelve TODO el país
        return data.results?.[0] ?? null;

    } catch (error) {

        console.log("Error GEO:", error);

        return null;
    }
}
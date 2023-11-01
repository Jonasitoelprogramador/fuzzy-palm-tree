import axios from "axios";

export const getDataFromAPI = async <T>(
    endpoint: string, 
    transformFn: (data: any) => T[]
): Promise<T[]> => {
    try {
        const response = await axios.get(endpoint, {
            params: {
                key: import.meta.env.VITE_API_KEY,
            },
        });
        const transformedData = transformFn(response.data.results);
        
        return transformedData;
    } catch (error) {
        console.error("API Error:", error);
        throw error; 
    }
}

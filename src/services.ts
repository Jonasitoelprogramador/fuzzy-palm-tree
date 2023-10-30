import axios from "axios";

export const getDataFromAPI = async <T>(
    endpoint: string, 
    transformFn: (data: any) => T[]
): Promise<T[]> => {
    try {
        const response = await axios.get(endpoint, {
            params: {
                key: 'df4b6861d0794b25b02189c5ae2d9611',
            },
        });
        
        console.log("API Response:", response.data.results);

        const transformedData = transformFn(response.data.results);
        
        return transformedData;
    } catch (error) {
        console.error("API Error:", error);
        throw error; 
    }
}

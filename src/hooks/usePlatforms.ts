import { useEffect, useState } from 'react';

import 'react-loading-skeleton/dist/skeleton.css'

import {getDataFromAPI} from "../services"

import { Platform } from "../interfaces";

export const usePlatforms = () => {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    useEffect(() => {

        const transformPlatforms = (data: any): Platform[] => 
    data.map((point: Platform) => ({
        id: point.id,
        name: point.name,
        slug: point.slug
    }));

    const fetchPlatforms = async () => {
        const platforms = await getDataFromAPI<Platform>('https://api.rawg.io/api/platforms/lists/parents', transformPlatforms);
        // do something with genres
        setPlatforms(platforms)
    }

    fetchPlatforms()
}, []);
    return {platforms}
}
import { useEffect, useState } from 'react';

import 'react-loading-skeleton/dist/skeleton.css'

import {getDataFromAPI} from "../services"

import { Genre } from "../interfaces";

export const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    useEffect(() => {

        const transformGenres = (data: any): Genre[] => 
          data.map((point: Genre) => ({
              id: point.id,
              image_background: point.image_background,
              name: point.name,
              slug: point.slug
          }));
    
        const fetchGenres = async () => {
            const genres = await getDataFromAPI<Genre>('https://api.rawg.io/api/genres', transformGenres);
            // do something with genres
            setGenres(genres)
        }
    
        fetchGenres(); // Notice the function invocation here
}, []);
    return {genres}
}
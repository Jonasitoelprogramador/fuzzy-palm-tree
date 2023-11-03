import { useEffect, useState } from 'react';

import { faWindows, faPlaystation, faXbox, faLinux, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';
import { faN, faEllipsis  } from '@fortawesome/free-solid-svg-icons';

import 'react-loading-skeleton/dist/skeleton.css'

import {getDataFromAPI} from "../services"

import { Platform, Order, Genre, defaultInput, defaultOrder, Result, Game, PlatformDetails } from "../interfaces";

export const getGames = (order: Order, genre: Genre|null, formInput: string, platform: Platform|null) => {
    const [games, setGames] = useState<Game[]>([]);
    const [skeleton, setSkeleton] = useState(true);
    const platformsToIcons = (listy: string[]) => {
        const Icons = listy.map(platform => {
            if (platform.toLowerCase().includes('playstation')) {
                return faPlaystation;
            } else if (platform.toLowerCase().includes('xbox')) {
                return faXbox;
            } else if (platform.toLowerCase().includes('pc')) {
                return faWindows;
            } else if (platform.toLowerCase().includes('nintendo')) {
                return faN;
            } else if (platform.toLowerCase().includes('linux')) {
                return faLinux;
            } else if (platform.toLowerCase().includes('macos')) {
                return faApple;
            } else if (platform.toLowerCase().includes('android')) {
                return faAndroid;
            } else {
                return faEllipsis;
            }
        });
    
        // Filter out all ellipsis icons
        const filteredIcons = Icons.filter(icon => icon !== faEllipsis);
        
        // Create a set of the filtered icons
        const uniqueIcons = [...new Set(filteredIcons)];
    
        // If there was an ellipsis icon in the original array, append it to the end of the unique icons array
        if (Icons.includes(faEllipsis)) {
            uniqueIcons.push(faEllipsis);
        }
    
        return uniqueIcons;
    }
    
      //idea that this takes in the array of platformDetails and turns it into an array of strings
        const getPlatforms = (platformdetails: PlatformDetails[]) => {
            let stringArray: string[] = [];
            // at this point I have an array of platform objects
            platformdetails.map((platformdetail: PlatformDetails) => {
                stringArray.push(platformdetail.platform.name);
            });
            return stringArray
        };
        
        useEffect(() => {
            //const platformPara = platform ?
            let url = 'https://api.rawg.io/api/games?'
            platform ? url+= `parent_platforms=${platform.id}&` : url
            genre ? url+= `genres=${genre?.slug}&` : url
            order !== defaultOrder ? url+= `ordering=${order.slug}&` : url
            formInput !== defaultInput ? url+= `search=${encodeURIComponent(formInput)}&` : url
            
            if (url.endsWith('&')) {
                url = url.slice(0, -1);
            }
    
            const transformGames = (data: any): Game[] => {
                return data.map((point: Result) => ({
                  id: point.id,
                  name: point.name,
                  platformicons: platformsToIcons(getPlatforms(point.platforms)),
                  background_image: point.background_image,
                  metacritic: point.metacritic,
                  slug: point.slug
                }));
              };
        
            const fetchGames = async () => {
                setSkeleton(true);
                const games = await getDataFromAPI<Game>(url, transformGames);
                // do something with genres
                setGames(games)
                setSkeleton(false);
            }
        
            fetchGames(); // Notice the function invocation here
            
        }, [order, genre, platform, formInput]);
        return {games, skeleton}
}
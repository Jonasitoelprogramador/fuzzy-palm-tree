import styles from "./GameDisplay.module.css"

import { Grid, 
    Box, 
    GridItem, 
    useTheme, 
    useColorMode, 
    Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows, faPlaystation, faXbox, faLinux, faApple, faAndroid, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faN  } from '@fortawesome/free-solid-svg-icons';

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import  {FormData} from './Search';


interface Genre {
    id?: number;
    name?: string;
    slug?: string;
}

interface PlatformDetails {
    platform: {
        id: number;
        name: string;
    };
}

interface Game {
  id: number;
  name: string;
  genres: Genre[];
  platforms: string[];
  platformicons: IconDefinition[];
  background_image: string;
  metacritic: number;
  released: string;
  rating: number;
}

interface Result {
    id: number;
    name: string;
    genres: Genre[];
    platforms: PlatformDetails[];
    background_image: string;
    metacritic: number;
    released: string;
    rating: number;
}

interface Props {
    platform: string;
    order: string;
    defaultPlatform: string;
    genre: string;
    defaultGenre: string;
    formInput: string;
}

const Testing = ({ platform, order, defaultPlatform, defaultGenre, genre, formInput }: Props) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const [games, setGames] = useState<Game[]>([]);
  console.log('API call made');
  
  const gameOrdering = (order: string, games: Game[]) => {
    let sortedGames=[...games];
    
    if (order === 'Name') {
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (order === 'Release date') {
        sortedGames.sort((a, b) => {
            if (a.released < b.released) return 1;
            if (a.released > b.released) return -1;
            return 0;
          });
    }
    else if (order === 'Average rating') {
        sortedGames.sort((a, b) => b.rating - a.rating);
    }
    else {
        null
    }
    return sortedGames
  }

  const sortedGames = gameOrdering(order, games)

  // we want to get the ordered games and check if each of them has the current platform in their platforms array
  // if they do then we add them to the array that is, in turn, returned.
  const platformCheck = (platform: string, sortedGames: Game[], defaultPlatform: string) => {
    let checkedGames: Game[] = []
    sortedGames.map((game: Game) => (
        game.platforms.some(p => p && typeof p === 'string' && p.toLowerCase() === platform.toLowerCase()) && checkedGames.push(game)))
    if (platform === defaultPlatform) {
        return games
    }
    else {
        return checkedGames
    }
  }

  const checkedGames = platformCheck(platform, sortedGames, defaultPlatform)

  const genreFilter = (genre: string, checkedGames: Game[]) => {
    let genreFiltered: Game[] = []
    checkedGames.map((game: Game) => (
        game.genres.some(g => g.slug && g.slug.toLowerCase() === genre.toLowerCase()) && genreFiltered.push(game)))
    if (genre === defaultGenre) {
        return checkedGames
    }
    else {
        return genreFiltered
    }    
  }

  const genreFiltered = genreFilter(genre, checkedGames)

  const searchGames = (genre: string, genreFiltered: Game[]) => {
    let searchedGames: Game[] = []
    genreFiltered.map((game: Game) => (
        game.name.toLowerCase().includes(formInput.toLowerCase())) && searchedGames.push(game))
    if (genre === defaultGenre) {
        return genreFiltered
    }
    else {
        return searchedGames
    }    
  }

  const searcedGames = searchGames(formInput, genreFiltered)
  
  const platformsToIcons = (listy: string[]) => {
        const Icons = listy.map(platform => {
            if (platform.toLowerCase().includes('playstation')) {
                return faPlaystation
            } else if (platform.toLowerCase().includes('xbox')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return faXbox
            } else if (platform.toLowerCase().includes('pc')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return faWindows
            } else if (platform.toLowerCase().includes('nintendo')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return faN
            } else if (platform.toLowerCase().includes('linux')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return faLinux
            } else if (platform.toLowerCase().includes('macos')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return faApple
            } else if (platform.toLowerCase().includes('android')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return faAndroid
            }        
        }
        );
        return [...new Set(Icons)];
        }

    const cleanStrings = (listy: string[]) => {
        const cleanedPlatforms = listy.map(platform => {
            if (platform.toLowerCase().includes('playstation')) {
                return 'playstation'
            } else if (platform.toLowerCase().includes('xbox')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return 'xbox'
            } else if (platform.toLowerCase().includes('pc')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return 'pc'
            } else if (platform.toLowerCase().includes('nintendo')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return 'nintendo'
            } else if (platform.toLowerCase().includes('linux')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return 'linux'
            } else if (platform.toLowerCase().includes('macos')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return 'apple'
            } else if (platform.toLowerCase().includes('android')) {
                // block of code to be executed if the condition1 is false and condition2 is true
                return 'android'
            }        
        }
        );
        return [... new Set(cleanedPlatforms)];
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
        axios
        .get('https://api.rawg.io/api/games?genres=indie&platforms=187', {
            params: {
            key: 'df4b6861d0794b25b02189c5ae2d9611',
            },
        })
        .then((res) => {
            console.log("API Response:", res.data);
            const transformedData = res.data.results.map((point: Result) => ({
            id: point.id,
            name: point.name,
            genres: point.genres,
            platforms: cleanStrings(getPlatforms(point.platforms)),
            platformicons: platformsToIcons((getPlatforms(point.platforms))),
            background_image: point.background_image,
            metacritic: point.metacritic,
            released: point.released,
            rating: point.rating
            }));
            setGames(transformedData);
        })
        .catch((error) => {
            console.error('Error fetching the games:', error);
        });
    }, []);

    const skeletons = Array.from({ length: 20 }).map((_, index) => (
        <GridItem className={styles.gameCard}>
            <Skeleton height='145.5px' />
            <Box padding='10px' bg="#202020">
                <Skeleton count={1} height={30} />
                <Skeleton count={1} height={60} />
            </Box>
        </GridItem>
    ));
    console.log('this is the platform state '+platform)

    /*games.map((game: Game) => (console.log(game.platforms.map(p => p.platform.name.toLowerCase()))))*/
        
  return (
    <>
        <Grid
        minH="100vh"
        templateColumns={{
            base: 'repeat(3, 1fr)',    
            xl: 'repeat(4, 1fr)',
            '2xl': 'repeat(5, 1fr)'
        }}
        templateRows="repeat(auto-fill, 290px)"
        gap={6}
        marginRight="10px"
        >
            {(() => {
            if (games.length > 0 ) {
                return searcedGames.map((game: Game) => (
                        (<GridItem className={styles.gameCard} key={game.id} bg={colorMode === 'dark' ? theme.colors.brand[100] : 'white'}>
                        <Box h="150px" bgImage={`url(${game.background_image})`} bgSize="100% 100%" bgRepeat="no-repeat"></Box>
                        <Flex gap='2' style={{ margin: '8px', fontSize: '20px', paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                            {game.platformicons.map((item: IconDefinition | undefined) => {
                            if (!item) {
                                console.error("Undefined icon encountered");
                                return null;  // Or return some default/fallback component
                            }
                            return (
                                <>
                                    <FontAwesomeIcon icon={item} style={{ marginTop: 'auto', marginBottom: 'auto', color:'grey' }}></FontAwesomeIcon>
                                </>
                                );
                            })}
                            <span style={{ marginLeft: 'auto', paddingLeft: '8px', paddingRight: '8px', borderRadius: '10%', backgroundColor: theme.colors.rating_green[100], fontWeight: 'bold'  }}>{game.metacritic}</span>
                        </Flex>
                        <Box fontSize='25px' fontFamily='Arial' style={{ fontWeight: 800 }} paddingLeft='10px' paddingBottom='10px' paddingRight='10px'>{game.name}</Box>
                        </GridItem>)
                ));
            } else {
                return (
                    (
                        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                            {skeletons}
                        </SkeletonTheme>
                    )
            
                );
            }
            })()}  
        </Grid>
    </>
  );
};

export default Testing;

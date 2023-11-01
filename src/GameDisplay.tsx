import styles from "./GameDisplay.module.css"

import { Grid, 
    Box, 
    GridItem, 
    useTheme, 
    useColorMode, 
    Flex } from '@chakra-ui/react';

    import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows, faPlaystation, faXbox, faLinux, faApple, faAndroid, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faN, faEllipsis  } from '@fortawesome/free-solid-svg-icons';

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {getDataFromAPI} from "./services"

import { PlatformDetails, Game, Result, Order, Platform, Genre } from "./interfaces";

interface Props {
    platform: Platform | null;
    order: Order;
    defaultOrder: Order;
    genre: Genre | null;
    defaultGenre: Genre | null;
    formInput: string;
    setSkeleton: (value: boolean) => void;
    skeleton: boolean;
    defaultInput: string;
}

const Testing = ({ platform, order, defaultGenre, genre, setSkeleton, skeleton, defaultOrder, formInput, defaultInput }: Props) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const [games, setGames] = useState<Game[]>([]);
  
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
            const games = await getDataFromAPI<Game>(url, transformGames);
            // do something with genres
            setGames(games)
            setSkeleton(false);
        }
    
        fetchGames(); // Notice the function invocation here
    }, [order, genre, platform, formInput]);
    

    const skeletons = Array.from({ length: 20 }).map((_, index) => (
        <GridItem className={styles.gameCard} key={index}>
            <Skeleton height='145.5px' />
            <Box padding='10px' background={colorMode === 'dark' ? '#202020' : '#ebf3f3'}>
                <Skeleton count={1} height={30} />
                <Skeleton count={1} height={60} />
            </Box>
        </GridItem>
    ));        
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
            if (games.length > 0 && skeleton === false  ) {
                return games.map((game: Game) => (
                        (<GridItem className={styles.gameCard} key={game.id} bg={colorMode === 'dark' ? theme.colors.brand[100] : 'white'}>
                            <Box bgImage={`url(${game.background_image})`} bgSize="100% 100%" bgRepeat="no-repeat" minHeight="150px"></Box>
                            <Flex gap='2' style={{ margin: '8px', fontSize: '20px', paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                {game.platformicons.map((item: IconDefinition | undefined, index) => {
                                    if (!item) {
                                        console.error("Undefined icon encountered");
                                        return null;  // Or return some default/fallback component
                                    }
                                    return (
                                        <>
                                            <FontAwesomeIcon key={index} icon={item} style={{ marginTop: 'auto', marginBottom: 'auto', color:'grey' }}></FontAwesomeIcon>
                                        </>
                                    );
                                })}
                                <span style={{ marginLeft: 'auto', paddingLeft: '8px', paddingRight: '8px', borderRadius: '10%', backgroundColor: theme.colors.rating_green[100], fontWeight: 'bold'  }}>{game.metacritic ? game.metacritic : 'N/A'}</span>
                            </Flex>
                            <Box fontSize='25px' fontFamily='Arial' style={{ fontWeight: 800, whiteSpace: 'normal', overflowWrap: 'break-word' }} paddingLeft='10px' paddingBottom='10px' paddingRight='10px'>{game.name}</Box>
                        </GridItem>
                    )
                ));
            } else {
                return (
                    (
                        <SkeletonTheme highlightColor="#444" baseColor={colorMode === 'dark' ? '#202020' : '#edf2f7'}>
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

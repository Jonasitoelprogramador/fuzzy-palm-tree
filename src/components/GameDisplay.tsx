import styles from "../css_modules/GameDisplay.module.css"

import { Grid, 
    Box, 
    GridItem, 
    useTheme, 
    useColorMode, 
    Flex } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';


import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Game, Order, Platform, Genre } from "../interfaces";
import {getGames} from "../hooks/useGames"

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

const Testing = ({ platform, order, genre, setSkeleton, defaultOrder, formInput, defaultInput }: Props) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const {games, skeleton} = getGames(order, genre, formInput, platform);
    

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
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',   // for small screens
            md: 'repeat(3, 1fr)',    
            xl: 'repeat(4, 1fr)',
            '2xl': 'repeat(5, 1fr)'
        }}
        templateRows="repeat(auto-fill, 290px)"
        gap={6}
        marginRight={{
            base: "50px",
            sm: "10px"}}
        marginLeft={{
            base: "50px",
            sm: "10px"}}
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

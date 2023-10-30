import { Grid, Show, GridItem, Flex, useColorMode } from "@chakra-ui/react";
import Search from "./Search";
import LightToggle from "./LightToggle";
import Logo from "./Logo";
import  {FormData} from './Search';
import { Genre } from "./Genres";

import { HandleClickType } from './types';

import { useEffect, useState } from "react";
import FilterTitle from "./FilterTitle";
import Genres from "./Genres";
import GameDisplay from "./GameDisplay";
import Testing from "./Testing";

import {getDataFromAPI} from "./services"



function MyGrid() {
  const defaultPlatform = ""
  const defaultOrder = "Relevance"
  const defaultGenre = null
  const defaultInput = ""

  const [platform, setPlatform] = useState<string>(defaultPlatform);
  const [order, setOrder] = useState<string>(defaultOrder);
  const [genre, setGenre] = useState<Genre|null>(defaultGenre);
  const [formInput, setformInput] = useState<string>(defaultInput);
  const [skeleton, setSkeleton] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<Genre|null>(null);
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


  const { colorMode } = useColorMode();

  const handlePlatformClick: HandleClickType = (event) => {
    const plat: string | null = event.currentTarget.getAttribute('data-id')
    plat ? setPlatform(plat) : console.log('Input to setPlatform is null')
  }
  
  const handleOrderClick: HandleClickType = (event) => {
    const order: string | null = event.currentTarget.getAttribute('data-id')
    order ? setOrder(order) : console.log('Input to setOrder is null')
  }

  const handleGenreClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const genreId = event.currentTarget.getAttribute('data-id');
    const genre = genres.find(g => g.id === Number(genreId));

    if (genre) {
        setGenre(genre);
        setSelectedGenre(genre);
        setSkeleton(true);
    } else {
        console.log('Genre not found');
    }
}


  const handleInput = (formInput: FormData) => {
    setformInput(formInput.search)
  } 

  return (
    <Grid 
    height={
      "100vh"
    } 
    templateAreas={{
      base: `"nav" "main"`,
      lg: `"nav nav" "aside main"`
    }}
    templateColumns= {{
      base: "1fr",
      lg: "250px 1fr" 
    }}
    templateRows={
      "80px"
    }
    bg={colorMode === 'dark' ? 'black' : 'white'}
    >
      <GridItem gridArea="nav" alignItems={"center"}>
        <Flex align="center" h="100%">
          <Logo src='https://game-hub-phi.vercel.app/assets/logo-ff4914e6.webp' alt="weird logo"></Logo>
          <Search handleInput={handleInput}></Search>
          <LightToggle></LightToggle>
        </Flex>
      </GridItem>
      <Show above="lg">
        <GridItem gridArea="aside">
          <Genres genres={genres} selectedGenre={selectedGenre} handleGenreClick={handleGenreClick}></Genres>
        </GridItem>
      </Show>
      <GridItem gridArea="main">
        <FilterTitle genre={genre} handlePlatformClick={handlePlatformClick} handleOrderClick={handleOrderClick} platform={platform} order={order}></FilterTitle>
        <Testing defaultInput={defaultInput} defaultPlatform={defaultPlatform} defaultGenre={defaultGenre} defaultOrder={defaultOrder} platform={platform} order={order} genre={genre} formInput={formInput} setSkeleton={setSkeleton} skeleton={skeleton}></Testing>
        <GameDisplay></GameDisplay>
      </GridItem>
    </Grid>
  );
}

export default MyGrid;


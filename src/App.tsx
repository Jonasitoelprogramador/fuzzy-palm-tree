import { Grid, Show, GridItem, Flex, useColorMode } from "@chakra-ui/react";

import LightToggle from "./LightToggle";
import Logo from "./Logo";

import { HandleClickType } from './types';

import { useEffect, useState } from "react";

import FilterTitle from "./FilterTitle";
import Genres from "./Genres";
import GameDisplay from "./GameDisplay";
import Search from "./Search";

import {getDataFromAPI} from "./services"

import { Platform, Order, FormData, Genre } from "./interfaces";

function MyGrid() {
  const defaultPlatform = null
  const defaultOrder = {name: 'Relevance', slug: '', id: 0}
  const defaultGenre = null
  const defaultInput = ""

  const [platform, setPlatform] = useState<Platform|null>(defaultPlatform);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  const [order, setOrder] = useState<Order>(defaultOrder);
  const [genre, setGenre] = useState<Genre|null>(defaultGenre);
  const [formInput, setformInput] = useState<string>(defaultInput);
  const [skeleton, setSkeleton] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<Genre|null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  const orderingDropDown = [{name: 'Name', slug: 'name', id: 1}, {name: 'Release Date', slug: '-released', id: 2}, {name: 'Date Added', slug: '-added', id: 3}, {name: 'Average Rating', slug: '-rating', id: 4}, {name: 'Popularity', slug: '-metacritic', id: 5}]
  
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

    const tranformPlatforms = (data: any): Platform[] => 
    data.map((point: Platform) => ({
        id: point.id,
        name: point.name,
        slug: point.slug
    }));

    const fetchPlatforms = async () => {
        const platforms = await getDataFromAPI<Platform>('https://api.rawg.io/api/platforms/lists/parents', tranformPlatforms);
        // do something with genres
        setPlatforms(platforms)
    }

    fetchPlatforms()

    }, []);


  const { colorMode } = useColorMode();

  const handlePlatformClick: HandleClickType = (event) => {
    const platId  = event.currentTarget.getAttribute('data-id')
    const matchedPlatform = platforms.find(p => p.id === Number(platId));

    if (matchedPlatform) {
        setPlatform(matchedPlatform);
        setSkeleton(true);
    } else {
        console.log('Platform not found');
    }
  }
  
  const handleOrderClick: HandleClickType = (event) => {
    const orderId: string | null = event.currentTarget.getAttribute('data-id')
    const matchedOrder = orderingDropDown.find(g => g.id === Number(orderId));

    if (matchedOrder) {
        setOrder(matchedOrder)
        setSkeleton(true);
    } else {
        console.log('Order not found');
    }
  }

  const handleGenreClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const genreId = event.currentTarget.getAttribute('data-id');
    const matchedGenre = genres.find(g => g.id === Number(genreId));

    if (matchedGenre) {
        setGenre(matchedGenre);
        setSelectedGenre(matchedGenre);
        genre !== matchedGenre && setSkeleton(true);
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
      "100%"
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
        <FilterTitle genre={genre} handlePlatformClick={handlePlatformClick} handleOrderClick={handleOrderClick} platform={platform} platforms={platforms} order={order} ordering={orderingDropDown}></FilterTitle>
        <GameDisplay defaultInput={defaultInput} defaultGenre={defaultGenre} defaultOrder={defaultOrder} platform={platform} order={order} genre={genre} formInput={formInput} setSkeleton={setSkeleton} skeleton={skeleton}></GameDisplay>
      </GridItem>
    </Grid>
  );
}

export default MyGrid;
export type {Platform}
export type {Order}


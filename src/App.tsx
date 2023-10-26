import { Grid, Show, GridItem, Flex, useColorMode } from "@chakra-ui/react";
import Search from "./Search";
import LightToggle from "./LightToggle";
import Logo from "./Logo";
import  {FormData} from './Search';

import { HandleClickType } from './types';

import { useState } from "react";
import FilterTitle from "./FilterTitle";
import Genres from "./Genres";
import GameDisplay from "./GameDisplay";
import Testing from "./Testing";


function MyGrid() {
  const defaultPlatform = ""
  const defaultOrder = "Relevance"
  const defaultGenre = ""
  const defaultInput = ""

  const [platform, setPlatform] = useState<string>(defaultPlatform);
  const [order, setOrder] = useState<string>(defaultOrder);
  const [genre, setGenre] = useState<string>(defaultGenre);
  const [formInput, setformInput] = useState<string>(defaultInput);
  const [skeleton, setSkeleton] = useState(true);

  console.log('general render skeleton '+skeleton)

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
    const genre: string | null = event.currentTarget.getAttribute('data-name');
    genre ? setGenre(genre) : console.log('Input to setGenre is null')
    setSkeleton(true)
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
          <Genres genre={genre} handleGenreClick={handleGenreClick}></Genres>
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


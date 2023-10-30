import styles from "./GameDisplay.module.css"
import { HandleClickType } from './types';
import { Genre } from "./Genres";


import { 
    Flex,
    Heading, 
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList} from '@chakra-ui/react';

import { ChevronDownIcon } from "@chakra-ui/icons";

interface Props {
    handlePlatformClick: HandleClickType;
    handleOrderClick: HandleClickType;
    platform: string;
    order: string;
    genre: Genre | null;
}

const FilterTitle = ({handlePlatformClick, handleOrderClick, platform, order, genre }: Props) => {
  return (
    <>
        <Heading as="h1">{platform} {genre ? genre.name : null} Games</Heading>
        <Flex gap={3} paddingTop='30px' paddingBottom='30px'>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {platform === "" ? "Platforms": platform}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handlePlatformClick} data-id='Playstation'>Playstation</MenuItem>
                    <MenuItem onClick={handlePlatformClick} data-id='Xbox'>Xbox</MenuItem>
                    <MenuItem onClick={handlePlatformClick} data-id='PC'>PC</MenuItem>
                    <MenuItem onClick={handlePlatformClick} data-id='Nintendo'>Nintendo</MenuItem>
                    <MenuItem onClick={handlePlatformClick} data-id='Linux'>Linux</MenuItem>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Order by: {order}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleOrderClick} data-id='Name'>Name</MenuItem>
                    <MenuItem onClick={handleOrderClick} data-id='Release date'>Release date</MenuItem>
                    <MenuItem onClick={handleOrderClick} data-id='Average rating'>Average rating</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    </>
  )
}

export default FilterTitle
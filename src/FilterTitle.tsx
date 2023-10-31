import styles from "./GameDisplay.module.css"
import { HandleClickType } from './types';
import { Genre } from "./Genres";
import { Platform } from "./App";
import { Order } from "./App";


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
    platform: Platform | null;
    platforms: Platform[];
    order: Order;
    genre: Genre | null;
    ordering: Order[];
}

const FilterTitle = ({handlePlatformClick, handleOrderClick, platform, platforms, order, ordering, genre }: Props) => {
    console.log('platforms', platforms)
    return (
    <>
        <Heading as="h1">{platform?.name} {genre ? genre.name : null} Games</Heading>
        <Flex gap={3} paddingTop='30px' paddingBottom='30px'>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {platform ? platform.name : "Platforms"}
                </MenuButton>
                <MenuList>
                    {platforms.map((platform: Platform) => (
                        <MenuItem onClick={handlePlatformClick} data-id={platform.id}>{platform.name}</MenuItem>
                    ))}  
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Order by: {order.name}
                </MenuButton>
                <MenuList>
                    {ordering.map((order: Order) => (
                        <MenuItem onClick={handleOrderClick} data-id={order.id}>{order.name}</MenuItem>
                    ))}    
                </MenuList>
            </Menu>
        </Flex>
    </>
  )
}

export default FilterTitle

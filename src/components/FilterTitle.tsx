import { HandleClickType } from '../types';

import { 
    Flex,
    Heading, 
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode,
    Box
} from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";

import { Genre, Platform, Order } from "../interfaces";

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
    const { colorMode } = useColorMode();
    return (
    <Box marginLeft='10px'>
        <Heading as="h1">{platform?.name} {genre ? genre.name : null} Games</Heading>
        <Flex gap={3} paddingTop='30px' paddingBottom='30px'>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {platform ? platform.name : "Platforms"}
                </MenuButton>
                <MenuList bg={colorMode === 'dark' ? 'black' : 'white'}>
                    {platforms.map((platform: Platform) => (
                        <MenuItem 
                            key={platform.id}
                            onClick={handlePlatformClick} 
                            data-id={platform.id}
                            _hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.200' }}
                            bg={colorMode === 'dark' ? 'black' : 'white'}
                        >
                            {platform.name}
                        </MenuItem>
                    ))}  
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Order by: {order.name}
                </MenuButton>
                <MenuList bg={colorMode === 'dark' ? 'black' : 'white'}>
                    {ordering.map((order: Order) => (
                        <MenuItem
                            key={order.id} 
                            onClick={handleOrderClick} 
                            data-id={order.id}
                            _hover={{ bg: colorMode === 'dark' ? 'gray.600' : 'gray.200' }}
                            bg={colorMode === 'dark' ? 'black' : 'white'}
                        >
                            {order.name}
                        </MenuItem>
                    ))}    
                </MenuList>
            </Menu>
        </Flex>

    </Box>
  )
}

export default FilterTitle

import styles from "../css_modules/Genres.module.css"

import { 
    Flex,
    Heading,
    Box} from '@chakra-ui/react';

import { Genre } from "../interfaces";

interface Props {
    handleGenreClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    genres: Genre[] | [];
    selectedGenre: Genre | null;
}

const Genres = ({ handleGenreClick, genres, selectedGenre }: Props) => {
    return (
        <>
            <Heading as="h1" marginLeft="20px">Genres</Heading>
                <Box marginLeft="20px">
                    {genres && genres.map(genre => (
                        <Flex align="center" mt={4} key={genre.id}> {/* Added a margin-top for some spacing between each genre */}
                            <Box h="50px" w="50px" borderRadius="10px" bgImage={`url(${genre.image_background})`} bgSize="80% 80%" backgroundSize="cover" backgroundPosition="center" bgRepeat="no-repeat"></Box>
                            <div data-id={genre.id} className={`${styles['hoverable']} ${selectedGenre?.slug === genre.name.toLowerCase() ? styles['bold'] : ''}`} onClick={handleGenreClick} style={{ fontSize:'20px', fontFamily:'Arial', marginLeft: '10px' }}> {/* Added a margin-left for some spacing between image and text */}
                                {genre.name}
                            </div>
                        </Flex>
                    ))}
                </Box>
        </>
    );
}

export default Genres;
export type {Genre};





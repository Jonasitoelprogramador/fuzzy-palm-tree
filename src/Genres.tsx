import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from "./Genres.module.css"

import { 
    Flex,
    Heading,
    Box} from '@chakra-ui/react';

interface Genre {
    id: string;
    image_background: string;
    name: string
}

interface Props {
    handleGenreClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    genre: string;
}

const Genres = ({ handleGenreClick, genre }: Props) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    useEffect(() => {
        axios
        .get('https://api.rawg.io/api/genres', {
            params: {
            key: 'df4b6861d0794b25b02189c5ae2d9611',
            },
        })
        .then((res) => {
                console.log("API Response:", res.data.results[0].image_background);
                const transformedData = res.data.results.map((point: Genre) => ({
                id: point.id,
                image_background: point.image_background,
                name: point.name
                }));
                setGenres(transformedData);
        })
        .catch((error) => { 
            console.error("API Error:", error);
        });
    }, []);  

    return (
        <>
            <Heading as="h1" marginLeft="20px">Genres</Heading>
                <Box marginLeft="20px">
                    {genres.map(genre => (
                        <Flex align="center" mt={4} key={genre.id}> {/* Added a margin-top for some spacing between each genre */}
                            <Box h="50px" w="50px" borderRadius="10px" bgImage={`url(${genre.image_background})`} bgSize="80% 80%" backgroundSize="cover" backgroundPosition="center" bgRepeat="no-repeat"></Box>
                            <div data-name={genre.name} className={styles['hoverable']} onClick={handleGenreClick} style={{ fontSize:'20px', fontFamily:'Arial', marginLeft: '10px' }}> {/* Added a margin-left for some spacing between image and text */}
                                {genre.name}
                            </div>
                        </Flex>
                    ))}
                </Box>
        </>
    );
}

export default Genres;




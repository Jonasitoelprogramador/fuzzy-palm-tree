import styles from "./GameDisplay.module.css"

import { Grid, 
    Box, 
    GridItem, 
    useTheme, 
    useColorMode, 
    Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows, faPlaystation, faXbox, faLinux, faApple, faAndroid, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faN  } from '@fortawesome/free-solid-svg-icons';

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import  {FormData} from './Search';

const GameDisplay = () => {


useEffect(() => {
    axios
    .get('https://api.rawg.io/api/platforms/lists/parents', {
        params: {
            key: 'df4b6861d0794b25b02189c5ae2d9611',
        },
    })
    .then((res) => {
        console.log(res.data.results);
    });
}, []);

  
    return (
    <div>GameDisplay</div>
  )
}

export default GameDisplay
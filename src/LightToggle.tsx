import { Flex, Switch, useColorMode } from '@chakra-ui/react'
import { useState } from 'react';

const LightToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    toggleColorMode();
    setIsChecked(!isChecked);
  };

  return (
    <Flex width="160px" justifyContent="center" flexShrink={0} gap={1}>
        <Switch size='md' colorScheme='green' isChecked={isChecked} onChange={handleChange}/>
        <span>Dark Mode</span>
    </Flex>
  )
}

export default LightToggle
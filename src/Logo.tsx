import { Flex, Image } from '@chakra-ui/react'

interface Props {
    src: string;
    alt?: string;

}

const Logo = ({src, alt}: Props) => {
    return (
        <Flex boxSize='65px' marginLeft="10px" marginRight="10px" flexShrink={0}>
            <Image borderRadius='10px' src={src} alt={src} />
        </Flex>
    )
}

export default Logo
import { useForm } from "react-hook-form";

import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    search: z.string()
});

export type FormData = z.infer<typeof schema>;

interface Props {
    handleInput: (data: FormData) => void;
}

const Search = ({handleInput}: Props) => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({resolver: zodResolver(schema)});
    const onSubmit = (data: FormData) => {
        handleInput(data);
    }
    return (
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%'}}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <Search2Icon  />
                    </InputLeftElement>
                    <Input  {...register('search')} borderRadius="50px" placeholder='Search games...' variant='filled' />
                </InputGroup>
            </form>
    )
}

export default Search




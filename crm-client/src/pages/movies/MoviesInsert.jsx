import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import api from '../../api'

import styled from 'styled-components'

import { nameValidator } from '../../services/validation-rules'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 30px 80px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    width: 30%;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

function MoviesInsert() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCreateMovie = useCallback(async (data) => {
        const { name, rating, time } = data
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        try {
            await api.insertMovie(payload);

            window.alert(`Movie inserted successfully`)

            window.location.href = '/movies/list';
        } catch(err) {
            window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors'])
        }
    }, []);

    return (
        <Wrapper>
            <Title>Create Movie</Title>

            <form onSubmit={handleSubmit(handleCreateMovie)}>
                <Label>Name: </Label>
                <InputText
                    type="text"
                    {...register("name", nameValidator)}
                />
                {errors.name && <p>Please check the Name</p>}

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    {...register("rating", { required: true, min: 0, max: 10, pattern: /[0-9]+([,.][0-9]+)?/ })}
                />
                {errors.rating && <p>Please check the Rating</p>}

                <Label>Time: </Label>
                <InputText
                    type="text"
                    {...register("time", { required: true, pattern: /([0-9]{1,2}):([0-9]{2})/ })}
                />
                {errors.time && <p>Please check the Time</p>}

                <Button type="submit">Add Movie</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </form>
        </Wrapper>
    )
}

export default MoviesInsert

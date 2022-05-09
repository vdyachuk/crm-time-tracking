import styled from 'styled-components'

export const Title = styled.h1.attrs({
    className: 'h1',
})``

export const Label = styled.label`
    margin: 5px;
`

export const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    width: 30%;
`

export const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 30px 80px;
`

export const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
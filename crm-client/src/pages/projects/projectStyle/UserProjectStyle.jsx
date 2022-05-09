
import styled from 'styled-components'

export const Label = styled.label`
    margin-top: 50px;
    margin: 15px 15px 15px 5px;
    font-size: 35px;
    
`
export const Title = styled.h1.attrs({
    className: 'h1',
})`
    text-align: center;
`

export const InputText = styled.input.attrs({
    className: 'form',
})`
    width: 250px;
    height: 8%;
    font-size: 30px;
    display: block;
`
export const ButtonSave = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 20px 15px 15px 420px;
    width: 12%;
    height: 12%;
    font-size: 20px;
`

export const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 20px 15px 15px 5px;
    width: 12%;
    height: 12%;
    font-size: 20px;   
`
export const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 0px 15px 15px 42px;
    width: 12%;
    height: 12%;
    font-size: 30px;
`
export const ButtonAdd = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 0px 0px 5px 0px;
    width: 20px;
    height: 59px;
    font-size: 20px;
`
export const ButtonProject = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 0px 1px 5px 42px;
    width: 12%;
    height: 12%;
    font-size: 30px;
`
export const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
export const Update = styled.a.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
export const Delete = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
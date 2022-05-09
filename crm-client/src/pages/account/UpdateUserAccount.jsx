import React, { useCallback, useState, useEffect } from 'react'
import api from '../../api'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import {Wrapper,Title,Label,InputText,CancelButton,Button} from '../account/style/UpdateUserAccountStyle'


function UsersUpdate() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUpdateUser = useCallback(async () => {
        const payload = {id, name, lastName}

        await api.updateUser(payload).then(res => {
            window.alert(`Account updated`);
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [id, name, lastName]);
    const fetchData = useCallback(async () => {
        await api.getUserById(id).then(response => { 
            setName(response.data.data.name)
            setLastName(response.data.data.lastName)
           })
       }, [id]);

       useEffect(() => {
                fetchData();
       },[fetchData]);

    const handleChangeInputName = useCallback(async(event) => {
        const name = event.target.value
        setName(name);
    }, []);
    const handleChangeInputLastName = useCallback(async(event) => {
        const lastName = event.target.value
        setLastName(lastName);
    }, []);
        return (
            <Wrapper>
                <Title>User Data</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={handleChangeInputName}
                />

                <Label>Last Name: </Label>
                <InputText
                    type="text"
                    value={lastName}
                    onChange={handleChangeInputLastName}
                />

                <Button onClick={handleUpdateUser}>Save</Button>
                <CancelButton href={'/users/list'}>Back</CancelButton>
            </Wrapper>
        );
    }

export default UsersUpdate


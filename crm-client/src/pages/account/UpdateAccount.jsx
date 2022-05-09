import React, { useCallback, useState, useEffect } from 'react'
import api from '../../api'
import {Wrapper,Title,Label,InputText,CancelButton,Button} from '../account/style/UpdateAccountStyle'

function UsersUpdate() {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUpdateUser = useCallback(async () => {
        const payload = {name, lastName}

        await api.updateAccount(payload).then(res => {
            window.alert(`Account updated`);
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [name, lastName]);
    
    const fetchData = useCallback(async () => {
        await api.getAccount().then(response => {
            setName(response.data.user.name)
            setLastName(response.data.user.lastName)
           })
       }, []);

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
                <CancelButton href={'/account'}>Back</CancelButton>
            </Wrapper>
        );
    }

export default UsersUpdate


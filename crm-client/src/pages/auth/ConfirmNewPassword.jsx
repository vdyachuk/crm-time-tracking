import React, { useState, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import qs from 'qs';

import api from '../../api'
import {Wrapper,Title,Label,InputText,Button} from '../auth/style/ConfirmNewPasswordStyle'

function ConfirmNewPassword() {
    const { search } = useLocation();

    const [token] = useState(qs.parse(search, { ignoreQueryPrefix: true }).resetPasswordToken);
    const [password, setPassword] = useState('');

    const handleConfirmPassword = useCallback(async () => {
        const payload = {
            resetPasswordToken: token,
            password
        }

        await api.confirmNewPassword(payload).then(res => {
            window.alert(`Password changed`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [token, password]);

    function handleChangeInputPassword(event) {
        const password = event.target.value;
        setPassword(password);
    }

    return (
        <Wrapper>
            <Title>Confirm New Password</Title>

            <Label>New password: </Label>
            <InputText
                type="text"
                value={password}
                onChange={handleChangeInputPassword}
            />

            <Button onClick={handleConfirmPassword}>Confirm password</Button>
        </Wrapper>
    );
}

export default ConfirmNewPassword

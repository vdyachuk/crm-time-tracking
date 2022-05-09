import React, { useState, useCallback } from 'react';

import api from '../../api'
import {Wrapper,Title,Label,InputText,Button} from '../auth/style/ResetPasswordStyle'

function ResetPassword() {
    const [email, setEmail] = useState('');

    const handleResetPassword = useCallback(async () => {
        const payload = { email }

        await api.resetPassword(payload).then(res => {
            window.alert(`Sent confirmation email`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [email]);

    function handleChangeInputEmail(event) {
        const email = event.target.value;
        setEmail(email);
    }

    return (
        <Wrapper>
            <Title>Reset Password</Title>

            <Label>Email: </Label>
            <InputText
                type="text"
                value={email}
                onChange={handleChangeInputEmail}
            />

            <Button onClick={handleResetPassword}>Send email</Button>
        </Wrapper>
    );
}

export default ResetPassword

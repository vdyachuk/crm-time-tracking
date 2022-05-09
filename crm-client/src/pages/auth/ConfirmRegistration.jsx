import React, { useState, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import qs from 'qs';

import api from '../../api'
import {Wrapper, Title, Button} from '../auth/style/ConfirmRegistrationvStyle'

function ConfirmRegistration() {
    const { search } = useLocation();

    const [token] = useState(qs.parse(search, { ignoreQueryPrefix: true }).emailConfirmToken);

    const handleConfirmRegistration = useCallback(async () => {
        const payload = { emailConfirmToken: token }

        await api.confirmRegistration(payload).then(res => {
            window.alert(`Ragistration finished`);

            window.location.href = '/';
        }).catch((_) => {
            window.alert(`Something went wrong`);
        })
    }, [token]);

    return (
        <Wrapper>
            <Title>Confirm Registration</Title>

            <Button onClick={handleConfirmRegistration}>Confirm</Button>
        </Wrapper>
    );
}

export default ConfirmRegistration

import React, { useCallback } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'

import api from '../../api'
import { emailValidator, passwordValidator } from '../../services/validation-rules'
import {Wrapper,Title,Label,InputText,Button} from '../auth/style/UserLoginStyle'


function UserLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUserLogin = useCallback(async (data) => {
            try {
                const response = await api.loginUser(data);
                sessionStorage.setItem('accessToken', response.data.accessToken)
                sessionStorage.setItem('refreshToken', response.data.refreshToken)

                window.location.href = '/';
            } catch(err) {
                window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors']);
            }

    }, []);

    return (
        <Wrapper>
            <Title>Login</Title>
            <form onSubmit={handleSubmit(handleUserLogin)}>
                <Label>Email: </Label>
                <InputText
                    type="text"
                    autoComplete="off"
                    {...register("email", emailValidator)}
                />
                {errors.email && <p>Please check the Email</p>}

                <Label>Password: </Label>
                <InputText
                    type="password"
                    {...register("password", passwordValidator)}
                />
                {errors.password && <p>Please check the Password</p>}

                <Button type="submit">SignIn</Button>

                <Link to="/auth/reset-password" className="nav-link">
                    Forgot password?
                </Link>
            </form>
        </Wrapper>
    );
}

export default UserLogin
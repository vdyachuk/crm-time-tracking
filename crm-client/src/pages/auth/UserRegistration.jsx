import React, { useCallback } from 'react';
import api from '../../api'
import { useForm } from "react-hook-form";

import { emailValidator, passwordValidator, nameValidator } from '../../services/validation-rules'
import {Wrapper,Title,Label,InputText,Button} from '../auth/style/UserRegistrationStyle'

function UserRegistration() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleIncAddedUser = useCallback(async (data) => {
        try {
            await api.addedUser(data);

            window.alert(`Sent confirmation email`);

            window.location.href = '/';
        } catch(err) {
            window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors']);
        }
    }, []);

    return (
        <Wrapper>
            <Title>Registration</Title>

            <form onSubmit={handleSubmit(handleIncAddedUser)}>
                <Label>First Name </Label>
                <InputText
                    type="text"
                    autoComplete="off"
                    {...register("name", nameValidator)}
                />
                {errors.name && <p>Please check the Name</p>}

                <Label>Last Name </Label>
                <InputText
                    type="text"
                    autoComplete="off"
                    {...register("lastName", nameValidator)}
                />
                {errors.lastName && <p>Please check the LastName</p>}

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
                    autoComplete="off"
                    {...register("password", passwordValidator)}
                />
                {errors.password && <p>Please check the Password</p>}

                <Button type="submit">SignUp</Button>
            </form>
        </Wrapper>
    );
}

export default UserRegistration
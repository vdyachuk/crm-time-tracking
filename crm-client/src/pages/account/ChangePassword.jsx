import React, { useCallback, useRef } from 'react';
import { useForm } from "react-hook-form";
import {Wrapper,Title,Label,InputText,CancelButton,Button} from '../account/style/ChangePasswordStyle'

import api from '../../api'
import { passwordValidator } from '../../services/validation-rules'

function ChangePassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const newPassword = useRef({});
    newPassword.current = watch("newPassword", "");

    const handleChangePassword = useCallback(async (data) => {
        try {
            await api.changePassword(data);

            window.alert('Password changed');

        } catch(err) {
            window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors']);
        }

    }, []);

    return (
        <Wrapper>
            <Title>Change Password</Title>
            <form onSubmit={handleSubmit(handleChangePassword)}>
                <Label>Old Password: </Label>
                <InputText
                    type="password"
                    {...register("oldPassword", passwordValidator)}
                />
                {errors.oldPassword && <p>Please check Old Password</p>}

                <Label>New Password: </Label>
                <InputText
                    type="password"
                    {...register("newPassword", passwordValidator)}
                />
                {errors.newPassword && <p>Please check New Password</p>}

                <Label>Confirm New Password: </Label>
                <InputText
                    type="password"
                    {...register("confirmNewPassword", { validate: value => value === newPassword.current })}
                />
                {errors.confirmNewPassword && <p>Please Confirm New Password</p>}

                <Button type="submit">Save password</Button>
                <CancelButton href={'/account'}>Back to account</CancelButton>
            </form>
        </Wrapper>
    );
}

export default ChangePassword

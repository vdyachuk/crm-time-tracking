import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import api from '../../api'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Wrapper,Title,Label,InputText,CancelButton,Button} from '../projects/projectStyle/ProjectInsertStyle.jsx'

import { nameValidator } from '../../services/validation-rules'


function ProjectsInsert() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCreateProject = useCallback(async (data) => {
        const { name } = data
        const payload = { name }

        try {
            await api.insertProject(payload);

        } catch(err) {
            window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors'])
        }
    }, []);
    const notify = () => toast("Project inserted successfully");
    return (
        <Wrapper>
            <Title>Create Project</Title>
            <form onSubmit={handleSubmit(handleCreateProject)}>
                <Label>Name: </Label>
                <InputText
                    type="text"
                    {...register("name", nameValidator)}
                />
                {errors.name && <p>Please check the Name</p>}
            <div>
                <ToastContainer />
                <Button onClick={notify} type="submit">Add Project</Button>
                <CancelButton href={'user/project'}>Cancel</CancelButton>
            </div>
            </form>
       
        </Wrapper>
    )
}

export default ProjectsInsert

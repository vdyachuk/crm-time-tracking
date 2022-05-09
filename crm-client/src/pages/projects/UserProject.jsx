import React, {useState, useCallback, useEffect} from "react";
import Modal from "../modal/Modal";
import api from '../../api'
import ReactTable from 'react-table'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import '../modal/UserProject.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css'
import '../modal/calendar.css'
import '../modal/UserProject.css'
import {Update,Delete,ButtonProject,ButtonAdd,Wrapper,Title,Label,InputText,ButtonSave,CancelButton,Button} from '../projects/projectStyle/UserProjectStyle.jsx'
  

function UserProject() {
    const [modalActive, setModalActive] = useState()
    const showModal = () => setModalActive(true);

    const [projectsData, setProjectsData] = useState({});

    const notify = () => toast("Data save successfully");
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
        const handleProjectDataSave = useCallback(async (data) => {
            const { time, date } = data
            const arrayTime = time.split('/')
            const payload = { date, time: arrayTime }
    
            try {
                await api.insertProjectData(payload);
    
            } catch(err) {
                window.alert(err['validationErrors'] ? err['validationErrors'][0]['msg'] : err['errors'])
            }
        }, []);
        const updateProjectData  = (id) => () => {
       
            window.location.href = `/projects/update/${id}`
        };
    
        const deleteProjectData  = (id) => () => {
           
            if (
                window.confirm(
                    `Do tou want to delete the project ${id} permanently?`,
                )
            ) {
                api.deleteProjectsData(id)
                window.location.reload()
            }
        };
          
        const fetchData = useCallback(async () => {
    
           await api.getProjectsData().then(response => {
               setProjectsData(response.data.data)
              })
          }, []);
    
          useEffect(() => {
                   fetchData();
          },[fetchData]);
          const columns = [
            {
                Header: 'Project name',
                accessor: 'name',
            },
            {
                Header: 'Hours',
                accessor: 'time',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <Update onClick={updateProjectData(props.original._id)}>Update</Update>
                            <Delete onClick={deleteProjectData(props.original._id)}>Delete</Delete>
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!projectsData.length) {
            showTable = false
        }
    return (

    <form onSubmit={handleSubmit(handleProjectDataSave)}> 
                <ButtonProject>Project</ButtonProject>
                <ButtonAdd  onClick={showModal}>+</ButtonAdd>
            
        <Wrapper>
                {showTable && (
                    <ReactTable
                        data={projectsData}
                        columns={columns}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        minRows={0}
                    />
                )}
        </Wrapper>
         <div className='user-project'>
            <Modal active={modalActive} setActive={setModalActive}>
            <Title>Time tracking</Title>
             <Label>Hours</Label>
               <InputText
                    type="text"
                    {...register("time", { required: true, min: 0, max: 15, pattern: /[0-9]+([,.][0-9]+)?/ })}
                />
                {errors.time && <p></p>}
             <Label for="start">Date</Label>
             <InputText
                    type="date"
                    id="start" 
                    name="trip-start"
                    {...register("date", { required: true, min: 0, max: 15, pattern: /[0-9]+([,.][0-9]+)?/ })}
                  />
              <ToastContainer />
                <ButtonSave onClick={notify} type="submit">Save</ButtonSave>
                <CancelButton href={'/user/project'}>Close</CancelButton>
            </Modal>
        </div>
        <Button href={'/projects/create'}>Add Project</Button>
     </form>
    );
  };
export default UserProject;
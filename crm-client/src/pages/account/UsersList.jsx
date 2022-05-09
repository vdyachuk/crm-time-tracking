import React, {useCallback, useState, useEffect} from 'react'
import ReactTable from 'react-table'
import api from '../../api'

import 'react-table/react-table.css'
import {Wrapper,Update, Delete} from '../account/style/UsersListStyle'

function UsersList() {
    const [users, setUsers] = useState({});

    const updateUser  = (id) => () => {
       
        window.location.href = `/users/update/${id}`
    };

    const deleteUser  = (id) => () => {
       
        if (
            window.confirm(
                `Do tou want to delete the user ${id} permanently?`,
            )
        ) {
            api.deleteUser(id)
            window.location.reload()
        }
    };
      

   const fetchData = useCallback(async () => {

       await api.getUsers().then(response => {
           setUsers(response.data.data)
          })
      }, []);

      useEffect(() => {
               fetchData();
      },[fetchData]);
      
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'LastName',
                accessor: 'lastName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <Update onClick={updateUser(props.original._id)}>Update</Update>
                            <Delete onClick={deleteUser(props.original._id)}>Delete</Delete>
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!users.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={users}
                        columns={columns}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }

export default UsersList
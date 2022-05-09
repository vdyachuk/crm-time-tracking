import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import api from '../../api'
import {Wrapper,Title, Button} from '../account/style/UserAccountStyle'

function Account() {
     const [user, setUser] = useState({});
       

    const fetchData = useCallback(async () => {
        await api.getAccount().then(response => {
            setUser(response.data.user)
           })
       }, []);

       useEffect(() => {
                fetchData();
       },[fetchData]);

     return (
        <Wrapper>
             <Title>{user.name}</Title>
             <Title>{user.lastName}</Title>
             <Title>{user.email}</Title>
        <Button>
             <Link  to="/account/update-account" className="btn btn-primary">
               Change personal data
             </Link>
        </Button>
        <Button>
              <Link  to="/account/change-password" className="btn btn-primary">
               Change password
        </Link>
        </Button>
        <Button>
              <Link  to="" className="btn btn-primary">
               Change Email
        </Link>
        </Button>
     </Wrapper>
     );
}
export default Account
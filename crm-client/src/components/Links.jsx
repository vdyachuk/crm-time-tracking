import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authenticationService } from '../services/authentication'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

function Links(props) {
    const [isLogged, setIsLogged] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUser(props);
        setIsLogged(Boolean(currentUser && currentUser.id));
    }, [props, currentUser]);

    const onLogoutPressed = useCallback(() => {
        authenticationService.logout()
    }, []);

    return (
        <React.Fragment>
            <Link to="/" className="navbar-brand">
                CRM
            </Link>
            <Collapse>
                {isLogged &&
                    <List>
                        <Item>
                            <Link to="/movies/list" className="nav-link">
                                List Movies
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/movies/create" className="nav-link">
                                Create Movie
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/user/project" className="nav-link">
                                Project
                            </Link>
                        </Item>
                        {currentUser && currentUser.role === 'admin' && <>
                            <Item>
                                <Link to="/users/list" className="nav-link">
                                    Users
                                </Link>
                            </Item>
                            <Item>
                                <Link to="/users/create" className="nav-link">
                                    Create User
                                </Link>
                            </Item>
                        </>}
                    </List>
                }
            </Collapse>
            <List>
                <Item>
                    {!isLogged &&
                        <Link to="/auth/login" className="nav-link">
                            Login
                        </Link>
                    }
                    {isLogged &&
                        <Link to="/account" className="nav-link">
                            {currentUser && currentUser.email}
                        </Link>
                    }
                </Item>
                <Item>
                    {!isLogged &&
                        <Link to="/auth/registration" className="nav-link">
                            Registration
                        </Link>
                    }
                    {isLogged &&
                        <Link to="/" onClick={onLogoutPressed} className="nav-link">
                            Logout
                        </Link>
                    }
                </Item>
            </List>
        </React.Fragment>
    )
}

export default Links

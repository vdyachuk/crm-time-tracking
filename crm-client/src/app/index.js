import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate, ConfirmRegistration, ResetPassword, ConfirmNewPassword, UserLogin, UserRegistration, UserAccount, ChangePassword, UpdateAccount, UsersList, UpdateUserAccount, UserProject, ProjectsInsert } from '../pages'
import { authenticationService } from '../services/authentication'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const sub = authenticationService.observableCurrentUser.subscribe(user => setCurrentUser(user))
        return () => sub.unsubscribe();
    });

    return (
        <Router>
            <NavBar {...currentUser}/>
            <Switch>
                {currentUser && <>
                    <Route path="/movies/list" exact component={MoviesList} />
                    <Route path="/movies/create" exact component={MoviesInsert} />
                    <Route path="/movies/update/:id" exact component={MoviesUpdate} />
                    <Route path="/movies/update/:id" exact component={MoviesUpdate} />
                    <Route path="/account" exact component={UserAccount} />
                    <Route path="/account/change-password" exact component={ChangePassword} />
                    <Route path="/account/update-account" exact component={UpdateAccount} />
                    {currentUser.role === 'admin' && <>
                        <Route path="/users/list" exact component={UsersList} />
                        <Route path="/users/create" exact component={MoviesInsert} />
                        <Route path="/users/update/:id" exact component={UpdateUserAccount} />
                        <Route path="/user/project" exact component={UserProject} />
                        <Route path="/projects/create" exact component={ProjectsInsert} />
                    </>}
                </>}
                    <Route path="/auth/login" exact component={UserLogin} />
                    <Route path="/auth/registration" exact component={UserRegistration} />
                    <Route path="/auth/reset-password" exact component={ResetPassword} />
                    <Route path="/auth/confirm-new-password" exact component={ConfirmNewPassword} />
                    <Route path="/auth/confirm-registration" exact component={ConfirmRegistration} />
            </Switch>
        </Router>
    )
}

export default App
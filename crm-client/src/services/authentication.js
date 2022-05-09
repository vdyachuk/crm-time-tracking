import { BehaviorSubject } from 'rxjs';
import axios from "axios";

import api, { BASE_URL } from '../api';

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

function getCurrentUser(token) {
    if (!token) {
        return null;
    }

    const tokenData = parseJwt(token);

    if (!tokenData) {
        return null;
    }

    const currentUser = {
        id: tokenData.userId,
        email: tokenData.email,
        role: tokenData.role
    }

    return currentUser;
}

const currentUserSubject = new BehaviorSubject(getCurrentUser(sessionStorage.getItem('accessToken')));

async function getLocalAccessToken() {
    let accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
        currentUserSubject.next(null);

        return null;
    }

    const tokenData = parseJwt(accessToken);

    if (!tokenData) {
        currentUserSubject.next(null);

        return null;
    }

    if (Date.now() > tokenData.exp * 1000) {
        try {
            const response = await axios.post(BASE_URL + '/auth/refresh-tokens', {
                refreshToken: getLocalRefreshToken(),
            });

            accessToken = response.data.accessToken;
            sessionStorage.setItem('accessToken', accessToken);
        } catch (_) {
            currentUserSubject.next(null);

            return null;
        }
    }

    currentUserSubject.next(getCurrentUser(accessToken));

    return accessToken;
}

function getLocalRefreshToken() {
    const refreshToken = sessionStorage.getItem('refreshToken');
    return refreshToken;
}

function deleteLocalTokens() {
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');

    currentUserSubject.next(null);
}

async function logout() {
    api.logout({ refreshToken: getLocalRefreshToken() });

    deleteLocalTokens();
}

export const authenticationService = {
    getLocalAccessToken,
    getLocalRefreshToken,
    observableCurrentUser: currentUserSubject.asObservable(),
    logout,
    deleteLocalTokens
}

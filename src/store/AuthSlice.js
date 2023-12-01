import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: [{
        id: null,
        name: null,
        username: null,
        pic: null,
        status:null,
    }],
    users: [{
        id: null,
        name: null,
        pic: null,
        status:null,
    }]
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const useradd = {
                id: action.payload.id,
                name: action.payload.name,
                username: action.payload.username,
                pic: action.payload.pic,
                status: action.payload.status
            }
            state.userData.push(useradd)
        },
        logout: (state) => {
            state.status = false;
            state.userData = null
        },
        storeUser: (state, action) => {
            const adduser = {
                id: action.payload.id,
                name: action.payload.name,
                pic: action.payload.pic,
                status: action.payload.status
            }
            state.users.push(adduser)
        }
    }
})

export const {login, logout, storeUser} = authSlice.actions

export default authSlice.reducer;
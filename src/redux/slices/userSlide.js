import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    accessToken: '',
    id: '',
    city: '',
    refreshToken: '',
    userAuth:''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', accessToken = '', address = '', phone = '', avatar = '', id = '',city= '',refreshToken = '',userAuth='' } = action.payload
            state.name = name ? name : state.name;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = id ? id : state.id
            state.accessToken = accessToken ? accessToken : state.accessToken;
            state.city = city ? city : state.city;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
            state.userAuth=userAuth ? userAuth:state.userAuth;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.accessToken = '';
            state.city = '';
            state.refreshToken = '';
            state.userAuth=''
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import homeReducer from "./home/logo";
import aboutReducer from "./home/about";
import serviceReducer from "./home/service";
import homeContactReducer from "./home/homeContact";
import contactReducer from "./home/contact";
import aboutMeReducer from "./extra/aboutMe";
import photoReducer from "./extra/photo";
import userDetailsReducer from "./auth-slice/userDetails";
import usersReducer from "./auth-slice/allUsers";
import passwordReducer from "./auth-slice/forgotPassword";
import profileReducer from "./auth-slice/profile";
import createUserReducer from "./auth-slice/createUser";

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    about: aboutReducer,
    service: serviceReducer,
    homeContact: homeContactReducer,
    contact: contactReducer,
    aboutMe: aboutMeReducer,
    photo: photoReducer,
    userDetails: userDetailsReducer,
    getUsers: usersReducer,
    password: passwordReducer,
    profile: profileReducer,
    createUser: createUserReducer,
  },
});

export default store;

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './Ultis';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slices/userSlide';
import * as UserService from './service/UserSevice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

const handleDecoded = () => {
  let storageData = localStorage.getItem('accessToken');
  let decoded = {};
  if (storageData && isJsonString(storageData)) {
    storageData = JSON.parse(storageData);
    decoded = jwtDecode(storageData);
  }
  return { decoded, storageData };
}

const handleGetDetailsUser = async (id, token) => {
  try {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.body, access_token: token }));
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

UserService.axiosJWT.interceptors.request.use(async function (config) {
  const currentTime = new Date();
  const { decoded, storageData } = handleDecoded();
  if (decoded?.exp < (currentTime.getTime() / 1000)) {
    try {
      const data = await UserService.refreshToken();
      config.headers['Authorization'] = `Bearer ${data.accessToken}`;
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
    } catch (error) {
      console.error("Error refreshing token:", error);
      return Promise.reject(error);
    }
  } else {
    config.headers['Authorization'] = `Bearer ${storageData}`;
  }
  return config;
}, function (error) {
  console.error("Interceptor error:", error);
  return Promise.reject(error);
});

useEffect(() => {
  const { storageData, decoded } = handleDecoded();
  if (decoded?.id && storageData) {
    handleGetDetailsUser(decoded.id, storageData);
  }

}, []);

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                        return (
                            <Route key={index} path={route.path} element={
                                <Layout>
                                    <Page />
                                </Layout>
                            } />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;

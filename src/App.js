import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './Ultis';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slices/userSlide';
import * as UserService from './service/UserSevice';
import * as ProductService from './service/ProductService';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000); 
        } else {
            setIsLoading(false); 
        }
        return () => clearTimeout(timer);
    }, [isLoading]);
  
  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id && storageData) {
      handleGetDetailsUser(decoded.id, storageData);
    }
  
  }, []);
  

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
    dispatch(updateUser({ ...res?.body, accessToken: token }));
    
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


return (
  <div>
    <LoadingComponent isLoading={isLoading}>
      <Router>
          <Routes>
              {routes.map((route, index) => {
                  const Page = route.page;
                  const isCheckAuth = route.isPrivate ? (user.userAuth === 'ADMIN') : true;
                  const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                  return isCheckAuth ? (
                      <Route key={index} path={route.path} element={
                          <Layout>
                              <Page />
                          </Layout>
                      } />
                  ) : null;
              })}
          </Routes>
      </Router>
      </LoadingComponent>
  </div>
);
}

export default App;

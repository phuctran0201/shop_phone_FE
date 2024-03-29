import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
export const routes=[
    {
        path:"/",
        page:HomePage,
        isShowHeader:true
    },
    {
        path:"/order",
        page:OrderPage,
        isShowHeader:true
    },
    {
        path:"/product",
        page:ProductPage,
        isShowHeader:true
    },
    {
        path:"/type",
        page:TypeProductPage,
        isShowHeader:true
    },
  
    {
        path:"/product-details",
        page:ProductDetailsPage,
        isShowHeader:true
    },
    {
        path:"/admin",
        page:AdminPage,
        isShowHeader:true,
        isPrivate:true
    },
    {
        path:"/profile",
        page:ProfilePage,
        isShowHeader:true,
        
    },
    {
        path:"*",
        page:NotFoundPage
    }

]
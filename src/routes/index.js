import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import SignInComponent from "../components/SignInComponent/SignInComponent";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import MyOrder from "../pages/MyOrder/MyOrder";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
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
        path:"products/:type",
        page:TypeProductPage,
        isShowHeader:true
    },
  
    {
        path:"/product-details/:id",
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
        path:"/my-order",
        page:MyOrder,
        isShowHeader:true,
        
    },
    {
        path:"/orderSuccess",
        page:OrderSuccess,
        isShowHeader:true,
        
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path:"/payment",
        page:PaymentPage,
        isShowHeader:true,
        
    },
    {
        path:"*",
        page:NotFoundPage
    }

]
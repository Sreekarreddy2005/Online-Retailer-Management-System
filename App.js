import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import RetailerLogin from "./components/RetailerLogin";
import UserRegister from "./components/UserRegister";
import RetailerRegister from "./components/RetailerRegister";
import BrowseProducts from "./components/BrowseProducts";
import ViewCart from "./components/ViewCart";
import RetailerDashboard from "./components/RetailerDashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-login" element={<UserLogin />} />
                <Route path="/retailer-login" element={<RetailerLogin />} />
                <Route path="/user-register" element={<UserRegister />} />
                <Route path="/retailer-register" element={<RetailerRegister />} />
                <Route path="/browse-products" element={<BrowseProducts />} />
                <Route path="/view-cart" element={<ViewCart />} />
                <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;

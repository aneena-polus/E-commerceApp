import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import SellPage from "./Components/SellPage";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import ShopPage from "./Components/ShopPage";
import CartPage from "./Components/CartPage"
import Forbidden from "./Components/Forbidden"
import ProductOverview from "./Components/ProductOverview";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/shop" element={<><Navbar /><ShopPage /></>} />
                <Route path="/sell" element={<><Navbar /><SellPage /></>} />
                <Route path="/cart" element={<><Navbar /><CartPage /></>} />
                <Route path="/shop/:id?" element={<><Navbar /><ProductOverview /></>} />
                <Route path="/403" element={<Forbidden />} />
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                draggable
                theme="dark"
            />
        </div>
    );
}

export default App;

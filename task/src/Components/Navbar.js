import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../Styles/NavStyle.css"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Navbar() {
    const navigate = useNavigate();
    const cartCount = useSelector((state) => state.product.cartCount);
    const [activeButton, setActiveButton] = useState("shop");

    const signOut = () => {
        axios.get('/api/logout').then(() => {
            navigate("/");
        });
    }
    const goToShopPage = () => {
        setActiveButton("shop");
        navigate("/shop");
    }
    const gotoSellPage = () => {
        setActiveButton("sell");
        navigate("/sell");
    }
    const gotoHistoryPage = () => {
        setActiveButton("history");
        navigate("/history");
    }
    const goToCart = () => {
        setActiveButton("cart");
        navigate("/cart");
    }

    return (
        <div className="nav-color d-flex flex-wrap justify-content-between align-items-center w-100 px-2 py-1 icon-button-black">
            <div className="fw-bold d-flex text-nav align-items-center fs-5 col-12 col-md-3 text-center mb-2 mb-md-0">
                <ShoppingBagIcon fontSize="inherit" />E-commerce App
            </div>
            <div className="d-flex justify-content-center align-items-center col-12 col-md-6 mb-2 mb-md-0">
                <IconButton color="inherit" size="medium" title="Shop" onClick={goToShopPage} className="px-2" style={{ borderRadius: "0" }}>
                    <Link style={{ color: activeButton === "shop" ? "white" : "black", textDecoration: "none", fontSize: "20px" }}>Shop</Link>
                </IconButton>
                <IconButton color="inherit" size="medium" title="Sell" onClick={gotoSellPage} className="px-2" style={{ borderRadius: "0" }}>
                    <Link style={{ color: activeButton === "sell" ? "white" : "black", textDecoration: "none", fontSize: "20px" }}>Sell</Link>
                </IconButton>
                <IconButton color="inherit" size="medium" title="History" onClick={gotoHistoryPage} className="px-2" style={{ borderRadius: "0" }}>
                    <Link style={{ color: activeButton === "history" ? "white" : "black", textDecoration: "none", fontSize: "20px" }}>History</Link>
                </IconButton>
            </div>
            <div className="col-12 col-md-3 d-flex justify-content-end">
                <ul className="nav">
                    <li className="nav-item me-2">
                        <IconButton color="inherit" size="medium" title="My Cart" onClick={goToCart}>
                            <Badge color="secondary" badgeContent={cartCount}>
                                <ShoppingCartIcon style={{ color: activeButton === "cart" ? "white" : "black" }} fontSize="inherit" />
                            </Badge>
                        </IconButton>
                    </li>
                    <li className="nav-item">
                        <IconButton color="secondary" size="medium" title="Sign Out" onClick={signOut}>
                            <ExitToAppIcon style={{ color: activeButton === "signout" ? "pink" : "black" }} fontSize="inherit" />
                        </IconButton>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
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
        localStorage.removeItem('userData');
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
    // const gotoExplorePage = () => {
    //     setActiveButton("explore");
    //     navigate("/explore");
    // }
    const goToCart = () => {
        setActiveButton("cart");
        navigate("/cart");
    }

    return (
        <div className='align-items-center nav-color d-flex justify-content-between w-100 px-2 py-1 icon-button-black'>
            <div className='fw-bold d-flex text-center text-nav align-items-center fs-5'>
                <ShoppingBagIcon fontSize="inherit" /><span>{" "}E-commerce App</span>
            </div>
            <div>
                <IconButton color="inherit" size="medium" title="Shop" onClick={goToShopPage} style={{ borderRadius: "0" }}>
                    <Link color=" inherit" style={{ color: activeButton === "shop" ? "white" : "black", textDecoration: 'none', fontSize:"20px" }}>
                        Shop
                    </Link>
                </IconButton>
                <IconButton color="inherit" size="medium" title="Sell" onClick={gotoSellPage} style={{ borderRadius: "0" }}>
                    <Link style={{ color: activeButton === "sell" ? "white" : "black", textDecoration: 'none', fontSize:"20px"  }}>
                        Sell
                    </Link>
                </IconButton>
                <IconButton color="inherit" size="medium" title="Explore" style={{ borderRadius: "0" }}>
                    <Link style={{ color: activeButton === "explore" ? "white" : "black", textDecoration: 'none', fontSize:"20px"  }}>
                        Explore
                    </Link>
                </IconButton>
            </div>
            <div>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <IconButton color="inherit" size="medium" title="My Cart" onClick={goToCart}>
                            <Badge color="secondary" badgeContent={cartCount}>
                                <ShoppingCartIcon style={{
                                    color: activeButton === "cart" ? "white" : "black",
                                }} fontSize="inherit" />
                            </Badge>
                        </IconButton>
                    </li>
                    <li className="nav-item">
                        <IconButton color="secondary" size="medium" title="Sign Out" onClick={signOut}>
                            <ExitToAppIcon style={{
                                color: activeButton === "signout" ? "pink" : "black",
                            }} fontSize="inherit" />
                        </IconButton>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
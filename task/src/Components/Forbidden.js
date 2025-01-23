import { Link } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ErrorMsg() {

    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate('/')
    };

    return (
        <div className="align-items-center d-flex justify-content-center flex-column" style={{height: "100vh"}}>
            <h2>403 Forbidden</h2>
            <span>Session expired</span>
            <span>Click to login <Link href="#" underline="always" onClick={goToLoginPage} style={{ fontSize: 14 }}>
                    redirect
                </Link>
            </span>
        </div>
    )
}

export default ErrorMsg
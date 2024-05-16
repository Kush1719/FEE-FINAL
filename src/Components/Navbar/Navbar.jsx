import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [initial, setinitial] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);    
    const { getTotalCartItems } = useContext(ShopContext);
    const location = useLocation();
    const history = useNavigate();

    let user;
    useEffect(() => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            user = JSON.parse(getuser);
            setinitial(user[0].name); // Set the user's name directly
        }
    }, []);
    
    useEffect(() => {
        console.log(initial);
    }, [initial]);
    

    const handleLoginLogout = () => {
        const newLoggedInStatus = !isLoggedIn;
        localStorage.removeItem("user_login");
        setIsLoggedIn(newLoggedInStatus);
        localStorage.setItem('isLoggedIn', JSON.stringify(newLoggedInStatus));
        history("/");
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("mens")}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("womens")}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("kids")}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {location.pathname !== ('/login') && location.pathname !== ('/signin') &&
                (isLoggedIn ? (
                    <button onClick={handleLoginLogout}><p style={{ fontSize: "16px" }}>Logout</p></button>
                ) : (
                    <Link to='/signin'><button onClick={handleLoginLogout}>Sign Up</button></Link>
                ))}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

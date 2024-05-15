import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [initial, setinitial] = useState("");
    const { getTotalCartItems } = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus) {
          setIsLoggedIn(JSON.parse(loggedInStatus));
          setinitial(localStorage.getItem('initial'));
        }
    }, []);

    const handleloginlogout = () => {
        const newLoggedInStatus = !isLoggedIn;
        setIsLoggedIn(newLoggedInStatus);
        localStorage.setItem('isLoggedIn', JSON.stringify(newLoggedInStatus));
    };


    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                { location.pathname !== '/login' &&
                (isLoggedIn ? (
                    <Link to='/'><button style={{"padding":"0px"}} onClick={handleloginlogout}><p style={{"fontSize":"46px"}}>{initial}</p></button></Link>
                ) : (
                    <Link to='/login'><button onClick={handleloginlogout}>Sign Up</button></Link>
                ))
                }
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

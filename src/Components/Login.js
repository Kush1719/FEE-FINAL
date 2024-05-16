import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const history = useNavigate();
    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addData = (e) => {
        e.preventDefault();
        const getuserArr = localStorage.getItem("useryoutube");
        const { email, password } = inpval;
        
        if (email === "") {
            toast.error('Email field is required', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('Password field is required', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('Password length should be greater than five', {
                position: "top-center",
            });
        } else {
            if (getuserArr && getuserArr.length) {
                const userdata = JSON.parse(getuserArr);
                const userlogin = userdata.filter((el) => {
                    return el.email === email && el.password === password
                });
                if (userlogin.length === 0) {
                    alert("Invalid details")
                } else {
                    localStorage.setItem("user_login", JSON.stringify(userlogin))
                    history("/")
                }
            }
        }
    };

    const styles = {
        section: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '45vh',
        },
        leftData: {
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
        signInLink: {
            fontWeight: 'normal',
            color: 'blue',
            marginLeft: '10px',
            textDecoration: 'underline',
        },
    };

    return (
        <div className="container mt-2">
            <section style={styles.section}>
                <div className="left_data mt-3 p-3" style={styles.leftData}>
                    <h3 className='text-center col-lg-6' style={{fontSize:"30px"}}>Log IN</h3>
                    <Form>
                        <Form.Group className="mb-3 col-lg-6" style={{"padding": "10px"}} controlId="formBasicEmail">
                            <Form.Control style={{"height": "40px","width":"400px"}} type="email" name='email' onChange={getdata} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" style={{"padding": "10px"}} controlId="formBasicPassword">
                            <Form.Control style={{"height": "40px","width":"400px"}} type="password" name='password' onChange={getdata} placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)","height":"40px","width":"420px","padding": "10px" }} type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p style={{marginTop:"10px", marginLeft:"30px"}} className='mt-3'>Already Have an Account <span><NavLink to="/signin" style={styles.signInLink}>SignIn</NavLink></span> </p>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
};

export default Login;

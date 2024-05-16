import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const history = useNavigate();
    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [data, setData] = useState([]);

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addData = (e) => {
        e.preventDefault();
        const { name, email, password } = inpval;
        if (name === "") {
            toast.error('Name field is required!', {
                position: "top-center",
            });
        } else if (email === "") {
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
            console.log("Data added successfully");
            history("/login");
            localStorage.setItem("useryoutube", JSON.stringify([...data, inpval]));
        }
    };
    
    const styles = {
        section: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
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
            fontWeight: 'bold',
            color: 'blue',
            textDecoration: 'none',
        },
    };

    return (
        <div className="container mt-3 d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
            <section  style={styles.section}>
                <div className="left_data p-3" style={{ maxWidth: "400px", width: "100%", backgroundColor: "#fff", borderRadius: "8px"}}>
                    <h3 className='text-center' style={{fontSize:"30px", marginTop:"10px", marginBottom:"10px"}}>Sign Up</h3>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control style={{"height": "40px","width":"400px", marginTop:"10px", marginBottom:"10px"}} type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control style={{"height": "40px","width":"400px", marginTop:"10px", marginBottom:"10px"}} type="email" name='email' onChange={getdata} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control style={{"height": "40px","width":"400px", marginTop:"10px", marginBottom:"10px"}} type="password" name='password' onChange={getdata} placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" style={{ background: "rgb(67, 185, 127)","height":"40px","width":"410px","padding": "10px",margin:"10px 0 10px 0" }} onClick={addData} type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p style={{marginTop:"7px", marginBottom:"10px", marginLeft:"10px"}} className='mt-3 text-center'>Already Have an Account? <NavLink to="/login" style={{ color: "blue", marginLeft:"10px" }}>Log In</NavLink></p>
                </div>
            </section>
        </div>

    );
};

export default Home;

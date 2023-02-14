import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './CSS/Login.css'

function Login() {
    const [logindata, setLoginData] = useState({
        username: "",
        password: "",
    })

    function onSubmit(e) {
        const loginform = new FormData
        loginform.append('username', logindata.username)
        loginform.append('password', logindata.password)
        try {
            axios.post("http://127.0.0.1:8000/login/", loginform)
                .then((res) => {
                    if(res.data.bool == true) {
                        localStorage.setItem('loginstatus', true)
                        localStorage.setItem('userid',res.data.userid)
                        window.location.href = "http://localhost:3000/detail/1"
                        console.log(res.data.bool)
                        console.log(res.data.userid)
                        alert()
                    } else {
                        console.log("nahi chala")
                    }
                });
        } catch (error) {
            console.log(error)
         }
    }

    const loginstatus = localStorage.getItem('loginstatus')
    if (loginstatus == 'true'){
        
    }


    function handleChange(e) {
        const newdata = { ...logindata }
        newdata[e.target.id] = e.target.value
        setLoginData(newdata)
        // console.log(newdata)
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your Email and password!</p>

                                        <div className="form-outline form-white mb-4">
                                            <input type="email" onChange={(e) => handleChange(e)} id="username" className="form-control form-control-lg" required="Enter things" />
                                            <label className="form-label" for="typeEmailX">Email</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="password" onChange={(e) => handleChange(e)} id="password" className="form-control form-control-lg" required />
                                            <label className="form-label" for="typePasswordX">Password</label>
                                        </div>

                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" value="Submit">Login</button>

                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                            <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                            <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                        </div>

                                    </div>
                                </form>

                                <div>
                                    <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
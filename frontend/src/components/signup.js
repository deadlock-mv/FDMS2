import { useState, useEffect } from "react";
import axios from "axios";

// posting should have these 
// {
//     "name": "Naruto",
//     "username": "hokage@gmail.com",
//     "address": "Kona",
//     "pincode": "546564",
//     "phone": "5465465465",
//     "password": "12345",
// }


function Signup() {

    useEffect(() => {
        
    })
    
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        address: "",
        pincode: "",
        phone: "",
    })


    function onSubmit(e) {
        e.preventDefault();
        console.log(data.username)
        axios({
            method: "POST",
            url: "http://127.0.0.1:8000/userlist/",
            data:
                {name: data.name,
                username: data.username,
                password: data.password,
                address: data.address,
                pincode: data.pincode,
                phone: data.phone},
        }).then((response) => {
            console.log(response.data);
            alert("Registration successful");
            window.location.href = "http://localhost:3000/login"
        })
    }


    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        // console.log(newdata)
    }


    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderradius: "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Help Us Serving You Better By Signing Up!!!!</h3>
                                <form onSubmit={(e) => onSubmit(e)}>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input onChange={(e) => handleChange(e)} type="text" id="name" required className="form-control form-control-lg" />
                                                <label className="form-label" for="firstName">Name</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input onChange={(e) => handleChange(e)} type="email" id="username" required className="form-control form-control-lg" />
                                                <label className="form-label" for="lastName">Email/Username</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">

                                            <div className="form-outline datepicker w-100">
                                                <input onChange={(e) => handleChange(e)} type="text" required className="form-control form-control-lg" id="password" />
                                                <label for="birthdayDate" className="form-label">Password</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input onChange={(e) => handleChange(e)} type="text" id="address" required className="form-control form-control-lg" />
                                                <label className="form-label" for="lastName">Address</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <input onChange={(e) => handleChange(e)} type="text" id="pincode" required className="form-control form-control-lg" />
                                                <label className="form-label" for="emailAddress">Pincode</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <input onChange={(e) => handleChange(e)} type="tel" id="phone" required className="form-control form-control-lg" />
                                                <label className="form-label" for="phoneNumber">Phone Number</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Signup;
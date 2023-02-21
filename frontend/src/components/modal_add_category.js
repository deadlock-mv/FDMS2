import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalAddCategory(props) {
    const [data, setData] = useState({
        categoryname: "",
    })

    function handleChange(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }

    function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.files[0]
        setData(newdata)

    }
    
    const config = { headers: { 'Content-Type': 'multipart/form-data'}}
    function onSubmit() {
        axios.post(("http://127.0.0.1:8000/res-manager/category/"), data, config)
        .then(alert("submitted successfully"))
        .catch((error)=>{
            console.log(error.response)
        })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Category Addition Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please Fill The Form: </h5>
                <form onSubmit={() => onSubmit()}>

                    <div className="row">
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleChange(e)} type="text" name="categoryname" required className="form-control form-control-lg" />
                                <label className="form-label" for="firstName">Cateogry Name</label>
                            </div>

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="form-outline">
                                <input onChange={(e)=>handleImage(e)}  type="file" name="image" className="form-control form-control-lg" />
                                <label className="form-label" for="lastName">Image</label>
                            </div>

                        </div>
                        <div className="mt-2 pt-1">
                            <input className="btn btn-success btn-md" type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddCategory;
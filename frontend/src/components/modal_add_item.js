import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

function ModalAddItem(props) {
    const [category, setCategory] = useState();
    const [flag, setFlag] = useState(false);
    const [data, setData] = useState({
        itemname: "",
    })

    function handleCategoryChange(e) {
        if (e.target.value != "cac") {
            setFlag(true);
            const newdata = { ...data };
            newdata[e.target.name] = e.target.value;
            setData(newdata);
        } else {
            setFlag(false);
        }
    }

    function handleChange(e) {
        const newdata = { ...data };
        newdata[e.target.name] = e.target.value;
        setData(newdata);
    }

    function handleImage(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.files[0]
        setData(newdata)

    }

    useEffect(() => {
        getCategory()
    }, []);

    function getCategory() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/res-manager/category/",
        }).then((response) => {
            const data = response.data
            setCategory(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    function onSubmit() {
        axios.post(("http://127.0.0.1:8000/res-manager/item/"), data, config)
            .then(alert("submitted successfully"))
            .catch((error) => {
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
                    Item Addition Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please Fill The Form: </h5>
                <form onSubmit={() => onSubmit()}>

                    <div className="row">
                        <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                            Category
                            <span>&nbsp; &nbsp;</span>
                            <select name='category' value={category && category.categoryname} onChange={(e) => handleCategoryChange(e)} required>
                                <option value="cac">Choose a Category</option>
                                {category && category.map((ct) => (
                                    <option key={ct.id} value={ct.id}>{ct.categoryname}</option>
                                ))}
                            </select>
                            <div className="row mt-3" style={{height:"400px"}}>
                            {flag && <>                                    
                            <div className="col-md-6 mb-4">

                                <div className="form-outline">
                                    <input onChange={(e) => handleChange(e)} type="text" name="itemname" required className="form-control form-control-lg" />
                                    <label className="form-label" for="firstName">Item Name</label>
                                </div>

                            </div>
                            <div className="col-md-6 mb-4">

                                <div className="form-outline">
                                    <input onChange={(e) => handleChange(e)} type="number" name="price" className="form-control form-control-lg" />
                                    <label className="form-label" for="lastName">Price</label>
                                </div>

                            </div>

                            <div className="col-md-6 mb-4">

                                <div className="form-outline">
                                    <input onChange={(e) => handleImage(e)} type="file" name="image" className="form-control form-control-lg" />
                                    <label className="form-label" for="lastName">Image</label>
                                </div>

                            </div>

                            <div className="mt-2 pt-1">
                                <input className="btn btn-success btn-md" type="submit" value="Submit" />
                            </div>
                            </>}
                            </div>
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

export default ModalAddItem;
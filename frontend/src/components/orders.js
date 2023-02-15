import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Orders() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    
    
    const customerid = Number(localStorage.getItem('userid'));

    useEffect(() =>{
        getOrders()
    },[]
    );

    function getOrders() {
        axios({
            method: "GET",
            url: ("http://127.0.0.1:8000/user/orders/" + customerid),
        }).then((response) => {
            const data = response.data
            setData(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    };


    return (
        
        <>
        <div className='card' style={{ margin: 'auto', width: '400px', marginTop: '25px' }}>    
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                OrderId: 
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Pic</th>
                                <th>Item</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                    
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                
                            </tr>
                            
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </div>
        </>
    );
}

export default Orders;
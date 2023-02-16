import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Orders() {
    let [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const customerid = Number(localStorage.getItem('userid'));

    useEffect(() => {
        getOrders()
    }, []
    );

    function getOrders() {
        axios({
            method: "GET",
            url: ("http://127.0.0.1:8000/user/orders/" + customerid),
        }).then((response) => {
            const data = response.data
            setData(data)
        }).catch((error) => {
            if (error) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    };

    // seting the open variable with id:false pair at beginning for collapsible 
    useEffect(() => {
        let collapse = {}
        for (let key in data) {
            collapse = { ...collapse, [data[key].id]: false }
        }
        setOpen(collapse)
    }, [])

    return (
        // maping to get orderid 
        <>
            {data.map((order) =>
                <div className='card' style={{ margin: 'auto', width: '400px', marginTop: '25px' }}>
                    <Button
                        onClick={() => setOpen(open => ({ ...open, [order.id]: !open[order.id] }))}
                        aria-controls="example-collapse-text"
                        aria-expanded={open[order.id]}
                    >
                        OrderId: {order.id}
                    </Button>
                    <Collapse in={open[order.id]}>
                        <div id="example-collapse-text">
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Pic</th>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                {/* filling up the table with order items  */}
                                {order.orderitem.map((item) =>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div style={{ marign: 'auto'}}>
                                                    <img src={item.itemid.image} style={{ height: '60px', width: '60px', borderRadius: '8px' }} alt="loading" />
                                                </div>
                                            </td>
                                            <td>{item.itemid.itemname}</td>
                                            <td>{item.quantity}</td>

                                        </tr>
                                    </tbody>
                                )}
                                {/* end of filling order items  */}
                            </Table>
                        </div>
                    </Collapse>
                </div>
            )}
        </>
    )
}

export default Orders;



// {data.map((order)=>{
//     <div className='card' style={{ margin: 'auto', width: '400px', marginTop: '25px' }}>    
//         <Button
//             onClick={() => setOpen(!open)}
//             aria-controls="example-collapse-text"
//             aria-expanded={open}
//         >
//             OrderId: {order.id}
//         </Button>
//         <Collapse in={open}>
//             <div id="example-collapse-text">
//                 <Table striped bordered hover size="sm">
//                     <thead>
//                         <tr>
//                             <th>Pic</th>
//                             <th>Item</th>
//                             <th>Quantity</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>Mark</td>
//                             <td>Otto</td>

//                         </tr>
//                         <tr>
//                             <td>2</td>
//                             <td>Jacob</td>
//                             <td>Thornton</td>

//                         </tr>

//                     </tbody>
//                 </Table>
//             </div>
//         </Collapse>
//     </div>
//     })}



{/* <Table striped bordered hover size="sm">
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
                            </Table> */}
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Payment() {
    const location = useLocation();
    const data = location.state?.data;
    const list = location.state?.list;
    console.log(data);
    console.log(list);

    function handleClick(e) {
        e.preventDefault();
        alert()
        try {
            axios({
                method: "POST",
                url: "http://127.0.0.1:8000/Order-items/",
                data:
                {
                    customerid: data.customerid,
                    totalamount: data.total,

                },
            })
            // .then((res) => {
            //     try {
            //         for (let key in list) {
            //             orderlist.push({
            //                 itemid: key,
            //                 quantity: data[key][1],
            //                 orderid: '',
            //             });
            //         };
            //         axios({
            //             method: "POST",
            //             url: "http://127.0.0.1:8000/ordlist/",
            //             data:
            //             {
            //                 data: list,

            //             },
            //         })
            //     } catch (error) {

            //     }
            // });

        } catch (error) {

        }
    };

    return (


        <div style={{ width: "18rem", height: '400px', margin: 'auto' }}>
            <ListGroup>
                <Link onClick={(e) => handleClick(e)} to='/orders'>
                    <ListGroup.Item action variant="primary">UPI</ListGroup.Item>
                </Link>
                <Link onClick={(e) => handleClick(e)} to='/orders'>
                    <ListGroup.Item action variant="warning">Debit/Credit Card</ListGroup.Item>
                </Link>
                <Link onClick={(e) => handleClick(e)} to='/orders'>
                    <ListGroup.Item action variant="success">Netbanking</ListGroup.Item>
                </Link>
                <Link onClick={(e) => handleClick(e)} to='/orders'>
                    <ListGroup.Item action variant="danger">Wallets</ListGroup.Item>
                </Link>
            </ListGroup>
        </div>



    );

}; 
import { useLocation } from "react-router-dom";
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Payment() {
    const location = useLocation();
    const data = location.state?.data;
    const list = location.state?.list;
    // console.log(data);
    // console.log(list);
    const navigate = useNavigate()
    function handleClick(e) {
        e.preventDefault();
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
            .then((res) => {
                let id = res.data  
                for (let key in list) {
                        list[key].orderid = id
                    };
                    try{
                    axios.post("http://127.0.0.1:8000/ordlist/",list)
                } catch (error) {
                    console.log(error)
                }
            }).then(()=>{
                navigate('/orders')
            })

        } catch (error) {
            console.log(error);

        }
    }
    return (


        <div style={{ width: "18rem", height: '400px', margin: 'auto', marginTop:'50px' }}>
            <ListGroup>
                
                <ListGroup.Item onClick={(e) => handleClick(e)} action variant="primary">UPI</ListGroup.Item>
                
                <ListGroup.Item action variant="warning" onClick={(e) => handleClick(e)}>Debit/Credit Card</ListGroup.Item>
                
                <ListGroup.Item action variant="success" onClick={(e) => handleClick(e)}>Netbanking</ListGroup.Item>
                
                <ListGroup.Item action variant="danger" onClick={(e) => handleClick(e)}>Wallets</ListGroup.Item>
                
            </ListGroup>
        </div>



    );

}; 
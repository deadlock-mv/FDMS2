import { useLocation } from "react-router-dom";

export default function Payment() {
    const location = useLocation();
    const data = location.state?.data;
    const list = location.state?.list;
    console.log(data);
    console.log(list);
    


    return (
        <div className="card container mx-auto mt-4">
            <ul className="list-group list-group-flush">
                <li href="#" className="list-group-item list-group-item-action">UPI</li>
                <li href="#" className="list-group-item list-group-item-action">Credit/Debit Card</li>
                <li href="#" className="list-group-item list-group-item-action">Wallets</li>
                <li href="#" className="list-group-item list-group-item-action">A fourth link item</li>
                <li className="list-group-item list-group-item-action disabled">A disabled link item</li>
            </ul>
        </div>

        
    );

}; 
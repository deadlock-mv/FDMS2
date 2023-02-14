
function Orders(){
    return(
        <div className="card mt-3 ms-5" style={{width: "18rem"}}>
            <div className="card-header">
                Order Id: 12345
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">
                    <div className="text mb-1">
                        <a href="#!" className="btn btn-sm btn-primary">Reorder</a>
                      </div>
                </li>
            </ul>
        </div>
        
    );
}

export default Orders;
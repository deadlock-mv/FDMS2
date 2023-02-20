import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function SideBar() {
    return (
        <SideMenu>

            <div class="position-fixed" style={{ width: "20vw" }}>
                <div className="card menuSidebar">
                    <h5 className="card-header">Dashboard</h5>
                    <div id="list-example" className="list-group list-group-flush">
                        <Link to='/manager/dashboard/category' className='list-group-item list-group-item-action text-muted'>Category/Cuisines</Link>
                        <Link to='/manager/dashboard/item' className='list-group-item list-group-item-action text-muted'>Items</Link>
                        <Link to='/manager/dashboard/order' className='list-group-item list-group-item-action text-muted'>Orders</Link>
                    </div>
                </div>
            </div>

        </SideMenu>
    );
}


const SideMenu = styled.div`
    display : block;
    width : 20vw;
    margin-left: 20px;
    margin-top: 60px !important;
`

{/* <div className="card">
<div className='card-header'>Dashboard</div>
<div className="list-group list-group-flush">
    <Link to='/manager/category' className='list-group-item list-group-item-action text-muted'>Category/Cuisines</Link>
    <Link to='/manager/item' className='list-group-item list-group-item-action text-muted'>Items</Link>
    <Link to='/manager/orders' className='list-group-item list-group-item-action text-muted'>Orders</Link>
</div>
</div> */}


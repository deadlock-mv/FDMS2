import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import SideBar from "./manager_sidebar";

export default function ManagerItem() {
    
    const [item, setItem] = useState()

    useEffect(() => {
        getItem()
    }, []);
    
    function getItem() {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/res-manager/item/",
        }).then((response) => {
            const data = response.data
            setItem(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);

            }
        })
    }

    function handleChange(e){
        e.preventDefault();
    }
    
    return (
        <ParentContainer >
            <SideBar />
            <BodyContainer>
                <head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
                </head>

                <div className="card p-5" >
                    <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                        <div className='row'>
                            <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                                Items
                                <span>&nbsp; &nbsp;</span>
                                <select name='itemid' value={item && item.itemname} onChange={handleChange} required>
                                    <option value="">Choose a item</option>
                                    {item && item.map((it) => (
                                        <option key={it.id} value={it.id}>{it.itemname}</option>
                                    ))}
                                </select>
                                <Link to="" className="btn btn-primary btn-sm ms-4"><i class="fa-solid fa-pen-to-square"></i> Edit</Link>
                                <Link to="" className="btn btn-primary btn-sm ms-4"><i class="fa-solid fa-trash"></i> Del</Link>
                            </div>

                        </div>
                        <div className='row'>
                            <Link to="" className="btn btn-primary btn-sm mt-4 w-25"><i class="fa-duotone fa-plus"></i> Add Item</Link>

                        </div>
                    </div>
                </div>

            </BodyContainer>

        </ParentContainer>
    )
}

const ParentContainer = styled.div`
    position : relative;
    display : flex;
    flex-direction : row;
    justify-content : space-evenly;
    margin : auto;
`

const BodyContainer = styled.div`
    width: 45vw;
    margin-top : 4rem;
    marign-right : 100px;
`
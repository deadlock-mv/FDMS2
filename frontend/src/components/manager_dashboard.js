import { Link } from "react-router-dom";
import styled from 'styled-components';
import SideBar from "./manager_sidebar";

export default function ManagerDash() {
    return (
        <ParentContainer >
            <SideBar />
            <BodyContainer>

                <div className="card p-5" >
                    <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                        Dash
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
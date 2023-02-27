import { StyledComponent } from "styled-components";
function Footer() {
    return(
        <div className="d-flex flex-column" style={{minHeight : "30vh"}}>
        <footer className="mt-auto fixed-bottom">
            <div className="card">
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                <p>Laughter is brightest where Food tastes Great</p>
                <p className="float-end mb-1 ">
                    <a href='#'>Go Top</a>
                </p>
                <footer className="blockquote-footer">MV<cite title="Source Title">Guardians of Galaxy</cite></footer>
                </blockquote>
            </div>
            </div>
        </footer>
        </div>
    );
}

export default Footer;
import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="container-mt-4 ms-2 me-2">    
        {/* Cuisines */}
        <h3 className="pb-1 mb-4">Cuisines</h3>
        <div className="row">
            <div className="col-md-3 ">
                <div className="card text-bg-dark">
                    <Link to='/detail/1'><img src="chinese.png" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/1'>Chinese</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark">
                    <Link to='/detail/2'><img src="south.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/2'>South Indian</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark">
                    <Link to='/detail/3'><img src="punjabi.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/3'>Punjabi</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark">
                    <Link to='/detail/4'><img src="italian.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/4'>Italian</Link></h5>
                </div>
            </div>
        </div>
        {/* End Cuisines */}

        {/* Popular Dishes */}
        <div className="row">
        <h3 className="pb-1 mb-4 mt-5">Popular Dishes</h3>
            <div className="col-md-3">
                <div className="card text-bg-dark">
                    <Link to='#'><img src="chinese.png" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='#'>Chinese</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark">
                    <Link to='#'><img src="south.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='#'>South Indian</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark">
                    <Link to='#'><img src="punjabi.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='#'>Punjabi</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark">
                    <Link to='#'><img src="italian.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='#'>Italian</Link></h5>
                </div>
            </div>
        </div>
        {/* End Popular Dishes */}

    </div>
  );
}

export default Home;
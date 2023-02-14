function Logout(){
    localStorage.removeItem('loginstatus');
    localStorage.removeItem('userid');
    window.location.href = "http://localhost:3000/login"
    return (
        <div></div>
    );
}

export default Logout
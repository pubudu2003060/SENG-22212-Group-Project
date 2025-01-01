import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="notFoundContainer">
            <div className="notFoundContent">
                <img id = "face-img"src = "/images/pageNotFound.png" alt = "User"/>
                <h4 className="errorCode">404</h4>
                <h5 className="error">Page Not Found</h5>
                <p className="errorMessage">Oops... The page you are looking for does not exist.</p>
                
            </div>
        </div>
    );
}

export default PageNotFound;
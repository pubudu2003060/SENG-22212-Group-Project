import './PageNotFound.css';
import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div className="notFoundContainer">
            <div className="notFoundContent">
                <img id = "face-img"src = "/images/pageNotFound.png" alt = "User"/>
                <h4 className="errorCode">404</h4>
                <h5 className="error">Page Not Found</h5>
                <p className="errorMessage">Oops... The page you are looking for does not exist.</p>
                <button className="backHome-btn" onClick={() => navigate("/dashboard")}>
                    <img src="/images/arrow.png" alt="Go Back" id="arrow-img" />
                    Go Back to Home
                </button>
            </div>
        </div>
    );
}

export default PageNotFound;
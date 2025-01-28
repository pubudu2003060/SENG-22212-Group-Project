import '../Styles/WebHeader.css';
import {useNavigate} from "react-router-dom";


function WebHeader() {

    const navigate = useNavigate()

    let userId = sessionStorage.getItem("userId");
    let userContactNumber = sessionStorage.getItem("userContactNumber");
    let firstName = sessionStorage.getItem("firstName");
    let lastName = sessionStorage.getItem("lastName");

    if(userId === null){
        navigate("/login")
    }

    return (  
        <div className = "header">            
            <img className="Comlogo" src="/images/logo.png" alt="ComLogo" />  
            <div className = "header-info">
                <p>passmyfuel@gmail.com</p>       
                <p>+94 11 2369099</p>
                <p>+94 11 2369099</p>
            </div>       
        </div>
        
    );
}

export default WebHeader;

export const getSessionData = () => ({
    userId: sessionStorage.getItem("userId"),
    userContactNumber: sessionStorage.getItem("userContactNumber"),
    firstName: sessionStorage.getItem("firstName"),
    lastName: sessionStorage.getItem("lastName"),
});
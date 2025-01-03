import {useState} from 'react';
import './ProfileManagement.css';
import NavigationBar from './NavigationBar';

function ProfileManagement() {
    const defaultProfileData = {
        UserID: "",
        Name: "",
        NIC: "",
        PhoneNo: "",
        OTP: ""
    };  

    const [profileData, setProfileData] = useState(defaultProfileData);
    const [originalData, setOriginalData] = useState(defaultProfileData);
    const [isVerified, setIsVerified] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleVerifyClick = () => {
        setIsVerified(true);  
    };

    const handleSaveChanges = () => {
        // add logic to save the updated data (Like, sending to an API)
        setOriginalData(profileData); 
        console.log('Profile Data Saved:', profileData); 
    };

    return (  
        <div className = "profile">
            <NavigationBar/>
            <div className = "profile-body">
                <div id = "profile-profileBody">
                    <div id = "profile-user">
                        <img src = "/images/userProfile.png" alt = "User" />
                        <h4>User ID: {profileData.UserID}</h4>
                    </div>
                    <div className = "ProfileInfo">                        
                        <div className = "profile-form-group">
                            <label>Name:</label><br />
                            <input type = "text" id="Name" placeholder="Enter your name here" value={profileData.Name} onChange={handleInputChange}/>
                        </div><br />
                        <div className = "profile-form-group">
                            <label>NIC:</label><br />
                            <input type = "text" id="NIC" placeholder="Enter your NIC here" value={profileData.NIC} onChange={handleInputChange}/>
                        </div><br />
                        <div className = "profile-form-group">
                            <label>Phone No:</label><br />
                            <input type = "text" id="PhoneNo" placeholder="Enter your telephone number here" value={profileData.PhoneNo} onChange={handleInputChange}/>
                        </div><br />
                        <p id = "profile-p">Please verify your phone number through the OTP code we have sent.</p>
                        <button id = "profile-verify-btn" onClick={handleVerifyClick} >Verify</button><br/>
                        <div className = "profile-form-group" id = "profile-OTP-group">
                            <label>OTP:</label><br />
                            <input type = "text" id="OTP" placeholder="Enter your OTP here" value={profileData.OTP} onChange={handleInputChange} disabled={!isVerified}  />
                        </div><br />
                        <button id = "profile-confirm-btn" >Confirm</button>
                        <hr /> 
                        <div className="profile-form-group">
                            <input type="checkbox" id="agreeTerms" value="agree" />
                            <label htmlFor="agreeTerms">I certify that the updated profile information provided is accurate and up-to-date.</label>
                        </div>
                        <div className = "profile-footer-btn">
                            <button id = "profile-cancel-btn" onClick={() => setProfileData(originalData)}>Cancel</button>
                            <button id = "profile-save-btn" onClick={handleSaveChanges}>Save Changes</button>
                        </div> 
                         
                    </div> 
                    
                </div>                       
            </div>
        </div>    
    );
}


export default ProfileManagement;
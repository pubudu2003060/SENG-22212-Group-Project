import {useState} from 'react';
import '../Styles/ProfileManagement.css';
import NavigationBar from '../Components/NavigationBar';
import WebFooter from '../Components/WebFooter';
import WebHeader, {getSessionData} from '../Components/WebHeader';

function ProfileManagement() {

    const {userId, userContactNumber, firstName, lastName, address, idNo} = getSessionData();

    const defaultProfileData = {
        UserID: userId,
        firstName: firstName,
        lastName: lastName,
        PhoneNo: userContactNumber,
        address: address,
        idNo: idNo
    };

    const [profileData, setProfileData] = useState(defaultProfileData);
    const [originalData, setOriginalData] = useState(defaultProfileData);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };


    const handleSaveChanges = () => {
        //api
        setOriginalData(profileData);
        console.log('Profile Data Saved:', profileData);
    };

    return (
        <div className="profile">
            <WebHeader/>
            <NavigationBar/>
            <div className="profile-body">

                <div id="profile-profileBody">

                    <div id="profile-user">
                        <img src="/images/userProfile.png" alt="User"/>
                        <h4>User ID: {profileData.UserID}</h4>
                    </div>

                    <div className="ProfileInfo">

                        <div className="profile-form-group">
                            <label>First Name:</label><br/>
                            <input type="text" id="fName" value={profileData.firstName} onChange={handleInputChange}
                            />
                        </div>

                        <div className="profile-form-group">
                            <label>Last Name:</label><br/>
                            <input type="text" id="lName" value={profileData.lastName} onChange={handleInputChange}
                            />
                        </div>

                        <div className="profile-form-group">
                            <label>Address:</label><br/>
                            <input type="text" id="adddress" value={profileData.address} onChange={handleInputChange}
                            />
                        </div>

                        <div className="profile-form-group">
                            <label>NIC:</label><br/>
                            <input type="text" id="NIC" value={profileData.idNo} onChange={handleInputChange} disabled/>
                        </div>

                        <div className="profile-form-group">
                            <label>Phone No:</label><br/>
                            <input type="text" id="PhoneNo" value={profileData.PhoneNo} onChange={handleInputChange}
                                   disabled/>
                        </div>

                        <hr/>
                        <div className="profile-form-group">
                            <input type="checkbox" id="agreeTerms" value="agree"/>
                            <label htmlFor="agreeTerms">I certify that the updated profile information provided is
                                accurate and up-to-date.</label>
                        </div>

                        <div className="profile-footer-btn">
                            <button id="profile-cancel-btn" onClick={() => setProfileData(originalData)}>Cancel</button>
                            <button id="profile-save-btn" onClick={handleSaveChanges}>Save Changes</button>
                        </div>

                    </div>

                </div>
            </div>
            <WebFooter/>
        </div>
    );
}


export default ProfileManagement;

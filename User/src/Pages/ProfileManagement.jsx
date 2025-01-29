import {useState} from 'react';
import '../Styles/ProfileManagement.css';
import NavigationBar from '../Components/NavigationBar';
import WebFooter from '../Components/WebFooter';
import WebHeader, {getSessionData} from '../Components/WebHeader';
import "../Styles/otp.css"

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
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    // New function to request OTP
    const requestOtp = async () => {
        try {
            let url = `http://localhost:8080/api/v1/login/send-otp/${defaultProfileData.PhoneNo}`;
            const response = await fetch(url, {
                method: "POST",
            });

            if (response.ok) {
                const result = await response.text();
                alert(result);
                setShowOtpInput(true);
                setOtpError('');
            } else {
                setOtpError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setOtpError('Error sending OTP. Please try again.');
            console.error('Error:', error);
        }
    };

    // New function to validate OTP
    const validateOtp = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/login/validate-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber: defaultProfileData.PhoneNo,
                    otp: otp,
                }),
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                alert("Validate Successfull!");
                setIsOtpVerified(true);
                setOtpError('');
                updateProfile();
            } else {
                setOtpError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setOtpError('Error validating OTP. Please try again.');
            console.error('Error:', error);
        }
    };

    // New function to update profile
    const updateProfile = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/updateuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({   // Convert object to JSON string
                    userId: defaultProfileData.UserID,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    contactNo: defaultProfileData.PhoneNo,
                    address: profileData.address,
                    identityType: "NIC",
                    idNo: profileData.idNo
                })
            });

            let result = await response.json()
            if (response.ok) {
                sessionStorage.setItem("userId", result.userId)
                sessionStorage.setItem("userContactNumber", result.contactNo)
                sessionStorage.setItem("firstName", result.firstName)
                sessionStorage.setItem("lastName", result.lastName)
                sessionStorage.setItem("address", result.address)
                sessionStorage.setItem("idNo", result.idNo)
                alert("Data Saved")
                setOriginalData(profileData);
                setShowOtpInput(false);
                setOtp('');
                setIsOtpVerified(false);
                console.log('Profile Data Saved:', profileData);
            } else {
                setOtpError('Failed to update profile. Please try again.');
            }
        } catch (error) {
            setOtpError('Error updating profile. Please try again.');
            console.error('Error:', error);
        }
    };

    const handleSaveChanges = () => {
        requestOtp();
    };

    // Add OTP input UI after the existing form
    const renderOtpSection = () => {
        if (!showOtpInput) return null;

        return (
            <div className="otp-section">
                <div className="profile-form-group">
                    <label>Enter OTP sent to your phone:</label><br/>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        maxLength="6"
                    />
                    {otpError && <p className="error-message">{otpError}</p>}
                    <button
                        className="otp-verify-btn"
                        onClick={validateOtp}
                    >
                        Verify OTP
                    </button>
                    <button
                        className="otp-resend-btn"
                        onClick={requestOtp}
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        );
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
                            <input type="text" id="firstName" value={profileData.firstName} onChange={handleInputChange}
                            />
                        </div>

                        <div className="profile-form-group">
                            <label>Last Name:</label><br/>
                            <input type="text" id="lastName" value={profileData.lastName} onChange={handleInputChange}
                            />
                        </div>

                        <div className="profile-form-group">
                            <label>Address:</label><br/>
                            <input type="text" id="address" value={profileData.address} onChange={handleInputChange}
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

                        {renderOtpSection()}

                        <div className="profile-footer-btn">
                            <button id="profile-cancel-btn" onClick={() => {
                                setProfileData(originalData);
                                setShowOtpInput(false);
                                setOtp('');
                                setOtpError('');
                            }}>Cancel
                            </button>
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
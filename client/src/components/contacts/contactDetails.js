import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const ContactDetails = ({ contact }) => {
    const { info, error } = useSelector(state => state.user);
    const history = useHistory();
    console.log("info", info);
    const sendMessage = () => {
        history.push("/sendMessage")
    }
    return (<>

        <div className="row" >
            <div className="col-7 col-sm-7 col-lg-5 col-md-5 col-xl-5" id="contactDetails">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <img src="/images/contact.png"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12">
                        <h2>OTP Verification</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12" >
                        <p><b>{info.firstName + " " + info.lastName + " "}</b>We will send you one time password to this mobile number</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12" >
                        <span style={{ color: 'grey' }}>Mobile Number</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 col-sm-5 col-lg-5 col-md-5 col-xl-5" id="contactNo" >
                        {info.contactNumber}
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 col-sm-5 col-lg-5 col-md-5 col-xl-5" >
                        <button id="otpBtn" onClick={sendMessage}>Send Message</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default ContactDetails;
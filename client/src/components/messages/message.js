import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { ADD_MESSAGE } from "../../constants/userConstants";
import axios from "axios";
const Message = () => {
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { info, error } = useSelector(state => state.user);
    const { user, token } = useSelector(state => state.auth);
    const { contactNumber: recipient, firstName: recipientFirstName, lastName: recipientLastName } = info
    const [OTP, setOTP] = useState(Math.floor(100000 + Math.random() * 900000));
    const message = `Hi Your OTP is : ${OTP}`
    const [textMessage, setTextMessage] = useState(message)
    const goBack = () => {
        history.push("/contacts")
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': `${token}`
        }
    }
    const sendOTP = async () => {
        console.log("im in sendotp");
        console.log("token", token);
        const { data } = await axios.post("http://localhost:3001/users/sendMessage", { recipient, textMessage, recipientFirstName, recipientLastName, OTP }, config);
        console.log("data", data);
        if (data.success) {
            alert.success(data.message);
            dispatch({ type: ADD_MESSAGE, payload: data })
        } else {
            alert.error(data.errMessage)
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-12 col-lg-12 col-xl-12 col-md-12">
                    <div className="row">
                        <div className="col-10 col-sm-10 col-lg-5 col-xl-5 col-md-10" id="messageScreen">
                            <div id="mainSection">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
                                        <h3>OTP Will sent to your mobile number</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-xl-12 xol-lg-12" id="messageText">
                                        <div>
                                            {textMessage}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12" id="buttonsDiv">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-lg-12 col-xl-5 col-md-5">
                                                <button onClick={goBack} id="backButton">Back</button>
                                            </div>
                                            <div className="col-12 col-sm-12 col-lg-12 col-xl-5 col-md-5">
                                                <button onClick={sendOTP} id="sendButton">Send</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Message; 
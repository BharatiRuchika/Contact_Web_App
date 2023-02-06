import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MessageList = () => {
    const { messages } = useSelector(state => state.auth);
    const [Messages, setMessages] = useState([])
    useEffect(() => {
        getMessages();
    }, [])
    const getMessages = async () => {
        console.log("messages", messages)
        messages.sort(function compare(a, b) {
            var dateA = Date.parse(a.createdAt);
            var dateB = Date.parse(b.createdAt);
            return dateB - dateA;
        });
        Messages.map((message, index) => {
            const currentDate = new Date(message.createdAt);
            const timestamp = currentDate.toLocaleString();;
            console.log("timestamp", timestamp);
            console.log(timestamp.split(',')[1])
        })
        setMessages(messages)
    }
    return (
        <>
            {messages.length == 0 ? <>
                <h1 style={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10rem', marginTop: '10rem' }}>No message has been sent yet</h1>
            </> : <>
                <div className="row" id="messageContainer">
                    <div className="col-sm-7 col-lg-7 col-md-7 col-xl-7 col-7" id="messageTable">
                        <h3>List of messages</h3>
                        <table class="table">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name Of the Contact</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">OTP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Messages.map((message, index) => {
                                    const currentDate = new Date(message.createdAt);
                                    const timestamp = currentDate.toLocaleString();;
                                    console.log("timestamp", timestamp);
                                    console.log(timestamp.split(',')[1])
                                    let time = timestamp.split(',')[1]
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{message.recipientFirstName + " " + message.recipientLastName}</td>
                                            <td>{time}</td>
                                            <td>{message.OneTimePassword}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </>}

        </>)
}
export default MessageList;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactDetails from './contactDetails';
import { useHistory } from "react-router-dom";
import { getUserDetails } from '../../actions/userActions'
import { useSelector, useDispatch } from "react-redux";
const ContactList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { info, error } = useSelector(state => state.user);
    const contacts = [{
        firstName: 'Ruchika',
        lastName: 'Bharati',
        contactNumber: '919373431164'
    }, {
        firstName: 'Snahal',
        lastName: 'Falake',
        contactNumber: '919373431164'
    }, {
        firstName: 'Poonam',
        lastName: 'Bharati',
        contactNumber: '919373431164'
    }, {
        firstName: 'Varsha',
        lastName: 'Bharati',
        contactNumber: '919373431164'
    }, {
        firstName: 'Manisha',
        lastName: 'Bharati',
        contactNumber: '919373431164'
    }, {
        firstName: 'Akshay',
        lastName: 'Bharati',
        contactNumber: '919130449742'
    }, {
        firstName: 'Yogesh',
        lastName: 'Bharati',
        contactNumber: '919130449742'
    }, {
        firstName: 'Mahesh',
        lastName: 'Bharati',
        contactNumber: '919130449742'
    }, {
        firstName: 'Sandesh',
        lastName: 'Bharati',
        contactNumber: '919373431164'
    }, {
        firstName: 'Dinesh',
        lastName: 'Bharati',
        contactNumber: '919373431164'
    }]
    const [contactList, setContactList] = useState(contacts);
    const [contact, setContact] = useState({})
    const handleContactDetails = (contact) => {
        console.log("im in handleContactDetails")
        dispatch(getUserDetails(contact))
        history.push("/contactDetails")
    }
    return (
        <div className="row">
            <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5" id="contacts">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
                        <h6> Click on Contact Names to send the OTP</h6>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        {contactList.map((contact, index) => {
                            return (<tr>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <Link onClick={() => handleContactDetails(contact)}>{contact.firstName + " " + contact.lastName}</Link>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>)
}
export default ContactList;
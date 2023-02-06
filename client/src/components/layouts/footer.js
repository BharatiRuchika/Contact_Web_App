import React from 'react'
import '../../App.css';
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <div className='row'>
            <div className='col-12 col-sm-12 col-lg-12 col-md-12 col-xl-12' id="footer">
                <div className='row'>
                    <div className='offset-md-1 offset-lg-1 offset-xl-1 col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                        <h4>Contact Management System</h4>
                        <div className='row' id="emailContainer">
                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                           <div>
                           <input type="text" placeholder="Enter Email to receive updates and newsletters"></input>
                            </div>
                        </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col-12 col-sm-12 col-md-12' id="connect">
                                <b>connect with us</b>
                            </div>
                        </div>

                        <div className='row' id="logos">
                            <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                <div><img src="/images/googleLogo.png" /></div>
                            </div>
                            <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                <div><img src="/images/twitterLogo.png" /></div>
                            </div>
                            <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                <div><img src="/images/facebookLogo1.png" /></div>
                            </div>
                        </div>
                        {/* <Link></Link> */}
                    </div>

                    <div className='offset-md-1 offset-lg-1 offset-xl-1 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3' id="support">
                        <div style={{color:"grey",marginBottom:'1.1rem'}}>Support</div>
                        <div>Contact Us</div>
                        <div>FAQ</div>
                        <div>Downloads</div>
                        <div>Contact Us</div>
                        <div>Locate a dealer</div>
                        <div>Product Registration</div>
                        <div>Spare Parts</div>
                    </div>

                    <div className='offset-md-1 offset-lg-1 offset-xl-1 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3' id="furrion">
                        <div style={{color:"grey",marginBottom:'1.1rem'}}>Furrion</div>
                        <div>About Furrion</div>
                        <div>Furrion design</div>
                        <div>Careers</div>
                        <div>newsroom</div>
                        <div>Furrion Access</div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer
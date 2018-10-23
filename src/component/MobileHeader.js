/**
 * Created by tommy on 2018/5/22.
 */
import React, { Component } from 'react';
import '../css/MobileHeader.css'
import '../css/animate.css'
import '../css/fontello-7529c44d/css/font.css'
import logo from "../logo.jpg";
import MobileMenu from './MobileMenu'



class MobileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    ;
    handleClick() {

    }

    ;
    render() {

        return (

            <div className="mobileHeader">
                <a href='/'><img width='102px' height='15px' className='mobile_logo' src={logo} alt='logo'/></a>
                <div className="social">
                    <a href={'http://www.instagram.com/huiuh_'}><i className ='icon-instagram'></i></a>
                    <a href={'mailto:hellohuiuh@gmail.com?subject=Contact from HUIUH.com'}><i className ='icon-mail'></i></a>

                </div>
                <MobileMenu/>
            </div>
        );
    }

}




export default MobileHeader;
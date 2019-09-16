/**
 * Created by tommy on 2018/6/6.
 */
import React, { Component } from 'react';
import Info from './Info'
import PicList from './PicList'
import Navbar from './Navbar'
import '../css/Home.css'
import logo from '../logo.jpg'
import MobileHeader from './MobileHeader'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            isBlur:''
        }
    };
    onChildChanged(value){
        this.setState({
            isBlur:value
        })
    }
    render(){
        if(navigator.userAgent.indexOf('Chrome')==-1 && navigator.userAgent.indexOf('Safari')==-1) {

            document.write('please use chrome or safari')

        }
        return(
            <div className={`home fadeIn animated2`}>
                <a href='/'><img width='102px' height='15px' className='logo' src={logo} alt='logo'/></a>
                <PicList blur={this.state.isBlur}/>
                <Info callbackParent={this.onChildChanged.bind(this)}/>
                <Navbar blur={this.state.isBlur}/>
                <MobileHeader/>
            </div>
        )
    }
}

export default Home;
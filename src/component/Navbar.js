/**
 * Created by tommy on 2018/6/7.
 */
import React, { Component } from 'react';
import '../css/Info.css'
import '../css/animate.css'
import classNames from 'classnames'
import '../css/fontello-4aba2eed/css/fontello.css'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color1: '',
            color2:'',
            color3:''
        }
    }
    handleOver1(){

        this.setState({color1:'white'})

    }
    handleOver2(){

        this.setState({color2:'white'})

    }
    handleOver3(){

        this.setState({color3:'white'})

    }

    render(){
        let filter = this.props.blur ? 'blur(30px)' : '';
        return(
            <div style={{WebkitFilter:filter}} className='navbar'>
                <ul>
                    <Link to='/project' className='link'><li  style={{background:this.state.color1}} onMouseOver={this.handleOver1.bind(this)}>I</li></Link>
                    <Link to='/double' className='link'><li  style={{background:this.state.color2}} onMouseOver={this.handleOver2.bind(this)}>II</li></Link>
                    <Link to='/diary' className='link'><li  style={{background:this.state.color3}} onMouseOver={this.handleOver3.bind(this)}>III</li></Link>
                </ul>
            </div>
        )
    }
}

export default Navbar;

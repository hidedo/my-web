/**
 * Created by tommy on 2018/5/22.
 */
import React, { Component } from 'react';
import '../css/MobileMenu.css'
import '../css/animate.css'
import classNames from 'classnames'
import '../css/fontello-7529c44d/css/font.css'
import Info from './Info'
import { NavLink} from 'react-router-dom'


class MobileMenu extends Info {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isClicked: false,
        }
    }

    ;
    handleClick() {

        this.setState({isClicked: true});

        this.setState({isOpen: !this.state.isOpen});




    }

    ;
    render() {

        return (

            <div style={{display:'inline'}}>
                <div className='mobile_menu'  onClick = {this.handleClick.bind(this)}>
                    {/*{this.state.isOpen ? <i className ='icon-cancel'></i> : <i className ='icon-menu'></i>}*/}

                        <span className={`menu_span ${this.state.isOpen?'span1':''}`}></span>
                        <span className={`menu_span ${this.state.isOpen?'span2':''}`}></span>
                        <span className={`menu_span ${this.state.isOpen?'span3':''}`}></span>

                </div>
                <MenuPage show = {this.state.isOpen} clicked={this.state.isClicked}/>

            </div>
        );
    }

}

class MenuPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        const className = classNames({
            'slideInLeft': this.props.show,
            'animated1': true,
            'slideOutLeft': (!this.props.show) && this.props.clicked,
            'hide': !this.props.clicked,
            'menu_page': true
        })


        return (
            <div className={className}>
                <ul>
                    <NavLink to='/'><li><b>Home</b></li></NavLink>
                    <NavLink to='/project' activeClassName="actived"><li>I</li></NavLink>
                    <NavLink to='/double' activeClassName="actived"><li>II</li></NavLink>
                    <NavLink to='/diary' activeClassName="actived"><li>III</li></NavLink>
                    <NavLink to='/info' activeClassName="actived"><li>Info</li></NavLink>
                </ul>
            </div>
        )


    }
}


export default MobileMenu;
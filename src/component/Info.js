/**
 * Created by tommy on 2018/5/22.
 */
import React, { Component } from 'react';
import '../css/Info.css'
import '../css/animate.css'
import classNames from 'classnames'
import '../css/fontello-7529c44d/css/font.css'


class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isClicked: false

        }
    }

;
    handleClick() {

        this.setState({isClicked: true});
        this.setState({isOpen: !this.state.isOpen});


        this.props.callbackParent(!this.state.isOpen);
    }

;
    render() {

        return (

            <div style={{height: '100%', width: '100%'}}>
                <div className='info'  onClick = {this.handleClick.bind(this)}>
                {this.state.isOpen ? <i className ='icon-cancel'></i> : <i className ='icon-plus'></i>}
                </div>
                <Page show = {this.state.isOpen} clicked={this.state.isClicked}/>

            </div>
        );
    }

}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text1: '',
            text2: ''


        }
    }

    componentDidMount() {
        fetch('./text.txt')
            .then(res => res.text())
            .then(data => {
                this.setState({text1: data.split('text2dontmove')[0], text2: data.split('text2dontmove')[1]});
                this.refs.text1.innerHTML = this.state.text1;
                this.refs.text2.innerHTML = this.state.text2
            })
            .catch((e) => console.log(e.message))
    }

    render() {
        const className = classNames({
            'slideInRight': this.props.show,
            'animated1': true,
            'slideOutRight': (!this.props.show) && this.props.clicked,
            'hide': !this.props.clicked,
            'page': true
        })


        return (
            <div className={className}>
                <div ref="text1" className="text1">
                </div>
                <div ref='text2' className="text2">
                </div>
            </div>
        )


    }
}


export default Info;
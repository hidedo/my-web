import {Component} from "react";
import React from "react";
import MobileHeader from "./MobileHeader";
import '../css/MobileInfo.css'
import BaseUrl from "../baseUrl";

class MobileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text1: '',
            text2: ''


        }
    }

    componentDidMount() {
        fetch(`${BaseUrl.url}/public/text.txt`)
            .then(res => res.text())
            .then(data => {
                this.setState({text1: data.split('text2dontmove')[0], text2: data.split('text2dontmove')[1]});
                this.refs.text1.innerHTML = this.state.text1;
                this.refs.text2.innerHTML = this.state.text2
            })
            .catch((e) => console.log(e.message))
    }

    render() {
        return (
            <div >
                <MobileHeader/>
                <div ref="text1" className="text1">
                </div>
                <div ref='text2' className="text2">
                </div>
            </div>
        )


    }
}


export default MobileInfo;
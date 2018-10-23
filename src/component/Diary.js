/**
 * Created by tommy on 2018/6/16.
 */
import React, { Component } from 'react';
import '../css/animate.css'
import '../css/Diary.css'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load'
import MobileHeader from './MobileHeader'

class Diary extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgArr:[]
        }

    }
    handleClickRight(){
        clearInterval(this.timer);

        let start = this.refs.diary.scrollLeft;
        let lastDom = this.refs.diary.lastChild;

        this.timer=setInterval(()=> {
            if ((this.refs.diary.scrollLeft - start) === 500||Math.round(lastDom.getBoundingClientRect().left)+lastDom.offsetWidth===window.innerWidth) {

                clearInterval(this.timer)
            }
            else {
                let speed = Math.ceil((500 + start - this.refs.diary.scrollLeft) / 10);

                this.refs.diary.scrollLeft += speed
                //console.log(this.timer)
                //console.log(Math.round(lastDom.getBoundingClientRect().left))
                //console.log(lastDom.offsetWidth)
                //console.log(window.innerWidth)

            }
        }, 20)
    }
    handleClickLeft(){
        clearInterval(this.timer)

        let start = this.refs.diary.scrollLeft;


        this.timer=setInterval(()=> {
            if ((start- this.refs.diary.scrollLeft) === 500||this.refs.diary.scrollLeft===0) {

                clearInterval(this.timer)
            }
            else {
                let speed = Math.ceil((500-(start - this.refs.diary.scrollLeft)) / 10);

                this.refs.diary.scrollLeft -= speed



            }
        }, 20)
    }

    componentWillMount(){
        fetch('./conf.json')
            .then(res => res.json())
            .then(data => this.setState({imgArr:data.diary}))
            .catch((e) => console.log(e.message))


    }

    render(){
        const imgArr = this.state.imgArr;
        const imglist = imgArr.map(v =>{
            let index = this.state.imgArr.indexOf(v)+1
            if (window.screen.availWidth < 500){
            return(
                <div className="filler" key={index} style={{'width':v.width/v.scale,'height':v.height/v.scale}}>

                    <LazyLoad>
                    <img width='100%' src={`/image/m-diary-pic/${v.src}.jpg`} alt={v.src} />
                    </LazyLoad>
                </div>
            )}
            else{
                return(
                    <div className="filler" key={index} style={{'width':v.width/v.scale,'height':v.height/v.scale}}>

                        <LazyLoad>
                            <img width='100%' src={`/image/diary-pic/${v.src}.jpg`} alt={v.src} />
                        </LazyLoad>
                    </div>
                )
            }

        });

        return(
            <div>
            <MobileHeader/>
            <div className='diary' ref='diary'>
                <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
                <span className='left' onClick={this.handleClickLeft.bind(this)}></span>
                <span className='right' onClick={this.handleClickRight.bind(this)}></span>
            {imglist}

            </div>
            </div>
        )

    }
}


export default Diary;
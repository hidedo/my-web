/**
 * Created by tommy on 2018/6/16.
 */
import React, { Component } from 'react';
import '../css/animate.css'
import '../css/Diary.css'
import { Link } from 'react-router-dom'

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
            return(
                <div key={v.id} style={{'width':v.width/v.scale,'height':v.height/v.scale}}><img width='100%' src={`/image/${v.src}.jpg`} alt={v.id} /></div>
            )

        });

        return(
            <div className='diary' ref='diary'>
                <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
                <span className='left' onClick={this.handleClickLeft.bind(this)}></span>
                <span className='right' onClick={this.handleClickRight.bind(this)}></span>
            {imglist}
            </div>
        )

    }
}


export default Diary;
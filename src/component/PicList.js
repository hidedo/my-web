/**
 * Created by tommy on 2018/5/24.
 */
import React, { Component } from 'react';
import '../css/PicList.css'
import '../css/animate.css'
import LazyLoad from 'react-lazy-load'
import classNames from 'classnames'

import $ from 'jquery'



class PicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           n:1,//counter
           imgArr:[]

        }
    }

    handleClickRight(e){
        e.stopPropagation()
        let n = this.state.n;
        if(Object.keys(this.refs).length !== 1) {
            if (!this.refs[`myli${n + 1}`]) {
                this.refs.myli1.setAttribute('class', `fadeIn animated pcli`);
                this.refs[`myli${n}`].setAttribute('class', 'notdisplay');
                this.setState({n: 1});
                return;
            }
            this.refs[`myli${n}`].setAttribute('class', 'notdisplay');
            this.refs[`myli${n + 1}`].setAttribute('class', `fadeIn animated pcli`);
            this.setState({n: n + 1})
        }
        else{
            return false;
        }
    }
    handleClickLeft(e){
        e.stopPropagation();
        let n = this.state.n;
        // const classes = classNames({
        //     'fadeIn':true,
        //     'animated':true,
        //     'pcli':true,
        //
        // })

        if(n ===1){
            this.refs[`myli${1}`].classList.remove('fadeIn','animated','pcli')
            this.refs[`myli${1}`].style.animation = 'fadeIn .5s'
            this.refs[`myli${1}`].classList.add('pcli')
            this.refs[`myli${1}`].addEventListener('webkitAnimationEnd',()=>this.refs[`myli${1}`].style.animation = '')
            return;
        }
        else if(n!==1 && n!==2)
        {
            this.refs[`myli${n}`].setAttribute('class', 'notdisplay');
            this.refs[`myli${n - 1}`].setAttribute('class', `fadeIn animated pcli`);
            this.setState({n: n - 1})
        }
        else if(n===2){
            this.refs[`myli${n}`].setAttribute('class', 'notdisplay');
            this.refs[`myli${n - 1}`].classList.remove('notdisplay')
            this.refs[`myli${n - 1}`].classList.add('pcli')
            this.refs[`myli${n - 1}`].setAttribute('style','animation:fadeIn .5s') ;
            this.refs[`myli${1}`].addEventListener('webkitAnimationEnd',()=>this.refs[`myli${1}`].style.animation = '')
            this.setState({n: n - 1})
        }

    }

    componentDidMount(){
        fetch('./conf.json')
        .then(res => res.json())
        .then(data => this.setState({imgArr:data.home}))
        .catch((e) => console.log(e.message))


    }
    render() {


        const imglist = this.state.imgArr.map(v =>{
            let index = this.state.imgArr.indexOf(v)+1

            if (window.screen.availWidth < 500){

            return(

                    <li className={'filler'} ref={`myli${index}`} key={index}>
                        <LazyLoad>
                        <img  height='100%' src={`/image/m-index-pic/${v.src}.jpg`} alt={v.src}/>
                        </LazyLoad>
                    </li>

            )}
            else{
                return (<li ref={`myli${index}`} key={index}>

                        <img  height='100%' src={`/image/index-pic/${v.src}.jpg`} alt={v.src}/>

                </li>)
            }
        });
        let filter = this.props.blur ? 'blur(30px)' : '';

        return(
        <div style={{'filter':filter,'transition':'filter linear 0.2s'}} className={'picList'}>

            <ul  className={'ul'}>
                <span className='left' onClick={this.handleClickLeft.bind(this)}></span>
                <span className='right'  onClick={this.handleClickRight.bind(this)}></span>
            {imglist}
            </ul>


        </div>
        )
    }
}

export default PicList;

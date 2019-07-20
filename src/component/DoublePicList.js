/**
 * Created by tommy on 2018/5/24.
 */
import React, { Component } from 'react';
import '../css/DoublePicList.css'
import '../css/animate.css'
import { Link } from 'react-router-dom'
import MobileHeader from './MobileHeader'
import LazyLoad from 'react-lazy-load'

class DoublePicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            n:1,
            imgArr1:[],
            imgArr2:[],
            length:0,
        }
    }

    handleClickRight() {
        let n = this.state.n;

        if (!this.refs[`myli1${n + 1}`]) {

            this.refs.myli11.setAttribute('class', `fadeIn animated`)
            this.refs.myli21.setAttribute('class', `fadeIn animated`)
            this.refs[`myli1${n}`].setAttribute('class', `fadeOut animated`)
            this.refs[`myli2${n}`].setAttribute('class', `fadeOut animated`)
            this.setState({n: 1})

        }

        else {
            this.refs[`myli1${n}`].setAttribute('class', `fadeOut animated`)
            this.refs[`myli2${n}`].setAttribute('class', `fadeOut animated`)
            this.refs[`myli1${n + 1}`].setAttribute('class', `fadeIn animated`)
            this.refs[`myli2${n + 1}`].setAttribute('class', `fadeIn animated`)
            this.setState({n: n + 1})
        }
    }


    handleClickLeft(){
            let n = this.state.n;

            if(!this.refs[`myli1${n-1}`]){
               this.refs[`myli1${this.state.length}`].setAttribute('class',`fadeIn animated`);
               this.refs[`myli2${this.state.length}`].setAttribute('class',`fadeIn animated`);
               this.refs[`myli1${n}`].setAttribute('class',`fadeOut animated`);
               this.refs[`myli2${n}`].setAttribute('class',`fadeOut animated`);
               this.setState({n: this.state.length})
            }
            else {
                this.refs[`myli1${n}`].setAttribute('class', `fadeOut animated`)
                this.refs[`myli2${n}`].setAttribute('class', `fadeOut animated`)
                this.refs[`myli1${n - 1}`].setAttribute('class', `fadeIn animated`)
                this.refs[`myli2${n - 1}`].setAttribute('class', `fadeIn animated`)
                this.setState({n: n - 1})
            }
        }

    componentDidMount(){
        fetch('./conf.json')
            .then(res => res.json())
            .then(data => this.setState({imgArr1:data.double.imgArr1,imgArr2:data.double.imgArr2,length:data.double.imgArr1.length}))
            .catch((e) => console.log(e.message))


    }

    render() {


        const imglist1 = this.state.imgArr1.map(v =>{

            let index = this.state.imgArr1.indexOf(v)+1

            return (
                <li  ref={`myli1${index}`} key={index}>

                    <img  height='100%' src={`/image/double-pic/${v.src}.jpg`} alt={v.src}/>

                </li>
            )

        });
        const imglist2 = this.state.imgArr2.map(v =>{
            let index = this.state.imgArr2.indexOf(v)+1

            return(
                <li ref={`myli2${index}`} key={index}>

                    <img  height='100%' src={`/image/double-pic/${v.src}.jpg`} alt={v.src}/>

                </li>
            )

        });
        const mobile_imglist = this.state.imgArr1.map(v1 =>{
            let index = this.state.imgArr1.indexOf(v1)+1;
            let imgArr2_src = this.state.imgArr2[index-1].src;

            return (
                <li className={'filler'} key={index}>
                    <LazyLoad>
                    <img  height='100%' src={`/image/m-double-pic/${v1.src}.jpg`} alt={v1.src}/>
                    </LazyLoad>
                    <LazyLoad>
                    <img  height='100%' src={`/image/m-double-pic/${imgArr2_src}.jpg`} alt={imgArr2_src}/>
                    </LazyLoad>
                </li>
            )}

        )

        return(
            <div>
                <MobileHeader/>
            <div  className={`doublePicList fadeIn animated2`}>

                <ul className='ul'>
                    <span className='left' onClick={this.handleClickLeft.bind(this)}></span>

            {imglist1}
                </ul>
                <ul className='ul'>

                    <span className='right'  onClick={this.handleClickRight.bind(this)}></span>
            {imglist2}
                </ul>
                <ul  className='m_ul'>
                    {mobile_imglist}
                </ul>
                <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
            </div>
                </div>
        )
    }
}

export default DoublePicList;

/**
 * Created by tommy on 2018/5/24.
 */
import React, { Component } from 'react';
import '../css/DoublePicList.css'
import '../css/animate.css'
import { Link } from 'react-router-dom'


class DoublePicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            n:1,
            imgArr1:[],
            imgArr2:[]
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
            return;
        }


        this.refs[`myli1${n}`].setAttribute('class', `fadeOut animated`)
        this.refs[`myli2${n}`].setAttribute('class', `fadeOut animated`)
        this.refs[`myli1${n + 1}`].setAttribute('class', `fadeIn animated`)
        this.refs[`myli2${n + 1}`].setAttribute('class', `fadeIn animated`)
        this.setState({n: n + 1})
    }


    handleClickLeft(){
            let n = this.state.n;

            if(!this.refs[`myli1${n-1}`]){

                return;
            };

            this.refs[`myli1${n}`].setAttribute('class',`fadeOut animated`)
            this.refs[`myli2${n}`].setAttribute('class',`fadeOut animated`)
            this.refs[`myli1${n-1}`].setAttribute('class',`fadeIn animated`)
            this.refs[`myli2${n-1}`].setAttribute('class',`fadeIn animated`)
            this.setState({n:n-1})
        }

    componentWillMount(){
        fetch('./conf.json')
            .then(res => res.json())
            .then(data => this.setState({imgArr1:data.double.imgArr1,imgArr2:data.double.imgArr2}))
            .catch((e) => console.log(e.message))


    }

    render() {


        const imglist1 = this.state.imgArr1.map(v =>{


            return (
                <li ref={`myli1${v.id}`} key={v.id}>
                    <img  height='100%' src={`/image/${v.src}.jpg`} alt={v.src}/>
                </li>
            );
        });
        const imglist2 = this.state.imgArr2.map(v =>{


            return(
                <li ref={`myli2${v.id}`} key={v.id}>
                    <img  height='100%' src={`/image/${v.src}.jpg`} alt={v.src}/>
                </li>
            )
        });
        let filter = this.props.blur ? 'blur(10px)' : '';
        return(
            <div style={{'WebkitFilter':filter}} className='doublePicList'>


                <ul className='ul'>
                    <span className='left' onClick={this.handleClickLeft.bind(this)}></span>

            {imglist1}
                </ul>
                <ul className='ul'>

                    <span className='right'  onClick={this.handleClickRight.bind(this)}></span>
            {imglist2}
                </ul>
                <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
            </div>
        )
    }
}

export default DoublePicList;

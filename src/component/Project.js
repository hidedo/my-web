/**
 * Created by tommy on 2018/6/8.
 */
import React, { Component } from 'react';
import '../css/Project.css'
import '../css/animate.css'
import PicList from './PicList'
import classNames from 'classnames'
import '../css/fontello-4aba2eed/css/fontello.css'
import logo from '../img/logo.jpg'
import { Link } from 'react-router-dom'

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            blur:'',
            detailImgArrs:[],
            detailImgArr:[],
            imgArr:[]
        }
    }
    handleClick(value){
        this.setState({show:!this.state.show});
        this.setState({blur:'blur(30px)'});
        this.setState({detailImgArr:this.state.detailImgArrs[value-1]})
    }
    handleEnter(...params){

        this.refs[params[0]].firstChild.style.opacity = '1'
        this.refs[params[0]].childNodes[1].style.opacity = '0.5';




    }
    handleLeave(...params){

        this.refs[params[0]].firstChild.style.opacity = '0'
        this.refs[params[0]].childNodes[1].style.opacity = '1'





    }
    handleBack(){

        this.setState({show:false,blur:''});
    }
    onChildChanged(value){
        this.setState({
            show:value,
            blur:''
        })
    }
    componentWillMount(){
        fetch('./conf.json')
            .then(res => res.json())
            .then(data => this.setState({imgArr:data.project,detailImgArrs:Object.values(data.projectDetail)}))
            .catch((e) => console.log(e.message))


    }


        render(){

            const imglist = this.state.imgArr.map(v =>{
                return(
                    <div style={{'width':v.width/v.scale,'height':v.height/v.scale,'margin':v.margin}} key={v.id} ref={`${v.id}`} onClick={this.handleClick.bind(this,v.id)} onMouseEnter={this.handleEnter.bind(this,`${v.id}`)} onMouseLeave={this.handleLeave.bind(this,`${v.id}`)}>

                        <span><i></i>{v.name}</span>
                        <img width='100%' src={require('../'+v.src+'.jpg')} alt={v.src} />
                    </div>
                )

            });


        return(

        <div className='wrapper'>

            <div className='project' style={{'WebkitFilter':this.state.blur}}>
            <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
        {imglist}

        </div>

        {this.state.show ? <DetailPic callbackParent={this.onChildChanged.bind(this)} show={this.state.show} imgArr={this.state.detailImgArr}/> : null}
        </div>)
        }
    }

class DetailPic extends PicList {
    constructor(props) {
        super(props);
    }

    handleClick(){
        this.props.callbackParent(false);
    }
    componentWillMount(){}
    render() {

        const func = imgArr => {
            return (imgArr.map(v => {


                return (
                    <li ref={`myli${v.id}`} key={v.id}>
                        <img  height='100%' src={require('../'+v.src+'.jpg')} alt=''/>

                    </li>
                )
            }))
        }
        const imglist = func(this.props.imgArr);

        return (
            <div className='detailPic'>
                <span className='close' onClick={this.handleClick.bind(this)}><i className='icon-cancel'></i></span>

                <ul className={`ul fadeIn animated`}>
                    <span className='left' onClick={this.handleClickLeft.bind(this)}></span>
                    <span className='right'  onClick={this.handleClickRight.bind(this)}></span>
                {imglist}
                </ul>

            </div>
        )
    }
}


export default Project;

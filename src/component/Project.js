/**
 * Created by tommy on 2018/6/8.
 */
import React, { Component } from 'react';
import '../css/Project.css'
import '../css/animate.css'
import PicList from './PicList'
import '../css/fontello-7529c44d/css/font.css'

import { Link } from 'react-router-dom'

function imagesLoaded(parentNode,id){

    const imgElement = parentNode.querySelectorAll('img')[id-1];
    if (imgElement.complete){
        return {result:true,imgObj:imgElement};
    }



}
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            blur:'',
            detailImgArrs:[],
            detailImgArr:[],
            imgArr:[],
            loading:true

        }
    }
    handleClick(...params) {

        if(this.refs[params[1]].childNodes[1].complete) {
            this.setState({show: !this.state.show});
            this.setState({blur: 'blur(30px)'});
            this.setState({detailImgArr: this.state.detailImgArrs[params[0] - 1]})
        }
    }
    handleEnter(...params){
    if(this.refs[params[0]].childNodes[1].complete) {
        this.refs[params[0]].firstChild.style.opacity = '1'
        this.refs[params[0]].childNodes[1].style.opacity = '0.5';
    }



    }
    handleLeave(...params){
        if(this.refs[params[0]].childNodes[1].complete) {
        this.refs[params[0]].firstChild.style.opacity = '0'
        this.refs[params[0]].childNodes[1].style.opacity = '1'
    }




    }
    handleBack(){

        this.setState({show:false,blur:''});
    }
    handleLoad(...params){
       const obj = imagesLoaded(this.refs.project,params[0]);
       if(obj.result){
       obj.imgObj.style.opacity=1;

       }


    }
    onChildChanged(value){
        this.setState({
            show:value,
            blur:''
        })
    }



    componentWillMount() {
        fetch('./conf.json')
            .then(res => res.json())
            .then(data => {this.setState({imgArr: data.project, detailImgArrs: Object.values(data.projectDetail)});
                //return(this.state.imgArr)
            }
        )
            //.then(imgArr=>{
            //    const preload =[];
            //
            //    for(let i=0;i<imgArr.length;i++){
            //        preload[i]=new Image();
            //        preload[i].src=`/image/${imgArr[i].src}.jpg`
            //    };
            //    const preloadsrc = preload.map(item=>item.src)
            //    this.setState({preloadsrc:preloadsrc});
            //    })
            .catch((e) => console.log(e.message))


        }






        render(){

            const imglist = this.state.imgArr.map(v =>{
                return(
                    <div style={{'width':v.width/v.scale,'height':v.height/v.scale,'margin':v.margin}} key={v.id} ref={`${v.id}`} onClick={this.handleClick.bind(this,v.id,`${v.id}`)} onMouseEnter={this.handleEnter.bind(this,`${v.id}`)} onMouseLeave={this.handleLeave.bind(this,`${v.id}`)}>

                        <span><span></span>{v.name}</span>

                    <img style={{opacity:this.state.loading?0:1}}  onLoad={this.handleLoad.bind(this,v.id)}  width='100%' src={`/image/${v.src}.jpg`} alt={v.src} />
                    </div>
                )

            });


        return(

        <div className='wrapper'>

            <div ref='project' className='project' style={{'WebkitFilter':this.state.blur}}>
            <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
        {imglist}

        </div>

        {this.state.show ? <DetailPic callbackParent={this.onChildChanged.bind(this)} show={this.state.show} imgArr={this.state.detailImgArr}/> : null}
        </div>)
        }
    }

class DetailPic extends PicList {

    handleClick(){
        this.props.callbackParent(false);
    }
    componentWillMount(){}
    render() {

        const func = imgArr => {
            return (imgArr.map(v => {


                return (
                    <li ref={`myli${v.id}`} key={v.id}>
                        <img  height='100%' src={`/image/${v.src}.jpg`} alt={v.src}/>

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

/**
 * Created by tommy on 2018/6/8.
 */
import React, { Component } from 'react';
import '../css/Project.css'
import '../css/animate.css'
import PicList from './PicList'
import '../css/fontello-7529c44d/css/font.css'

import { Link } from 'react-router-dom'
import Transition from 'react-transition-group/Transition'
import MobileHeader from './MobileHeader'
import LazyLoad from "react-lazy-load";


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
            show: false,
            visibility: '',
            detailImgArrs: [],
            detailImgArr: [],
            imgArr: [],
            loading: true,
            title:''
        }

    }

    handleClick(index) {

        if ((this.refs[index].childNodes[1].complete || this.refs[index].firstChild.firstChild.complete) && this.state.detailImgArrs[index - 1]) {
            this.setState({show: !this.state.show});
            this.setState({visibility: 'hidden'});
            this.setState({detailImgArr: this.state.detailImgArrs[index - 1]})
            this.setState({title:this.refs[index].childNodes[0].textContent})
        }
    }

    handleEnter(index) {

        if (this.refs[index].childNodes[1].complete) {
            // this.refs[index].firstChild.style.opacity = '1'
            // this.refs[index].childNodes[1].style.opacity = '0'



        }


    }

    handleLeave(index) {
        if (this.refs[index].childNodes[1].complete) {
            this.refs[index].firstChild.style.opacity = '0'
            this.refs[index].childNodes[1].style.opacity = '1'



        }


    }

    handleBack() {

        this.setState({show: false, visibility: ''});
    }

    handleLoad(index) {

        const obj = imagesLoaded(this.project, index);
        if (obj.result) {
            obj.imgObj.style.opacity = 1;

        }


    }

    onChildChanged(value) {
        this.setState({
            show: value,
            visibility: ''
        })
    }


    componentWillMount() {
        fetch('./conf.json')
            .then(res => res.json())
            .then(data => {
                    this.setState({imgArr: data.project, detailImgArrs: Object.values(data.projectDetail)});
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


    render() {
        const random = [
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzjRbfcfAAZBApGsxJdJAAAAAElFTkSuQmCC',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAA1JREFUGFdjiJdS+g8AAxIBmyOKnnEAAAAASUVORK5CYII=',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAA1JREFUGFdjWJvT/B8ABgICnPuJxesAAAAASUVORK5CYII=',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAA1JREFUGFdjiEgO/A8ABC8CDH1P2HQAAAAASUVORK5CYII='
        ];
        let randomPic = ()=>random[Math.floor(Math.random()*random.length)];




        const imglist = this.state.imgArr.map(v => {
            let index = this.state.imgArr.indexOf(v)+1
            if (window.screen.availWidth <500){
            return (
                <div className={'filler'} style={{'width': v.width / v.scale, 'height': v.height / v.scale, 'margin': v.margin,
                'backgroundImage':`url(${randomPic()})`}} key={index}
                     ref={index} onClick={this.handleClick.bind(this, index)}
                    >

                    <LazyLoad>
                    <img width='100%' src={`/image/m-project-pic/${v.src}.jpg`} alt={v.src}/>
                    </LazyLoad>
                    {v.name}F
                </div>
            )}
            else{
                return (
                <div style={{'width': v.width / v.scale, 'height': v.height / v.scale, 'margin': v.margin,
                    'backgroundImage':`url(${randomPic()})`}} key={index}
                     ref={index} onClick={this.handleClick.bind(this, index)}
                     onMouseEnter={this.handleEnter.bind(this, index)}
                     onMouseLeave={this.handleLeave.bind(this, index)}>

                    <span><span></span>{v.name}</span>

                    <img style={{opacity: this.state.loading ? 0 : 1}} onLoad={this.handleLoad.bind(this, index)}
                         width='100%' src={`/image/project-pic/${v.src}.jpg`} alt={v.src}/>
                </div>
                )
            }

        });

        return (



            <div className='wrapper'>
                <MobileHeader/>
                <div ref={ele=>this.project=ele} className='project' style={{'visibility': this.state.visibility}}>

                    <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
                    {imglist}


                </div>
                <Transition
                in={this.state.show}
                timeout={500}
                unmountOnExit
                >
                    {(state) => {
                        let fade =''
                        switch(state)
                        {
                        case
                            'entering'
                        :
                            fade='fadeIn'

                                return (<DetailPic fade={fade} callbackParent={this.onChildChanged.bind(this)} show={this.state.show}
                                               imgArr={this.state.detailImgArr}/>);
                        case
                            'entered'
                        :

                            return (<DetailPic callbackParent={this.onChildChanged.bind(this)} show={this.state.show}
                                               imgArr={this.state.detailImgArr} title={this.state.title}/>);

                        case
                            'exited'
                        :
                            return 'exited';
                        case
                            'exiting'
                        :
                            fade='fadeOut'
                            return (<DetailPic fade={fade} callbackParent={this.onChildChanged.bind(this)} show={this.state.show}
                                               imgArr={this.state.detailImgArr}/>);
                            default:
                                return 'error'
                        }
                    }
                    }

                </Transition>

            </div>


         )

    }
}

class DetailPic extends PicList {
    constructor(props){
        super(props)
        this.state={
            coordsX:0,
            coordsY:0,
            n:1,
            imgArr:[],
            titleShow:'none'
        }
    }
    handleClick(){
        this.props.callbackParent(false);
    }

    showCoords(e){
       let [x,y]=[e.clientX,e.clientY];
       this.setState({
           coordsX:x+10,
           coordsY:y+10,
           titleShow:'block'
        })


    }
    componentWillMount(){}
    render() {

        const func = imgArr => {
            return (imgArr.map(v => {
                let index = imgArr.indexOf(v)+1
                if (window.screen.availWidth <500){
                return (
                    <li className={'filler'} ref={`myli${index}`} key={index}>
                        <LazyLoad>
                        <img  height='100%' src={`/image/m-project-detail-pic/${v.src}.jpg`} alt={v.src}/>
                        </LazyLoad>
                    </li>
                )}
                else{
                 return   <li ref={`myli${index}`} key={index}>
                        <img  height='100%' src={`/image/project-detail-pic/${v.src}.jpg`} alt={v.src}/>

                    </li>
                }
            }))
        }
        const imglist = func(this.props.imgArr);
        let titleShow = this.state.titleShow
        return (
            <div className={`detailPic ${this.props.fade} animated`} onClick={this.handleClick.bind(this)} onMouseMove={this.showCoords.bind(this)}>
                <span className='close' onClick={this.handleClick.bind(this)}><i className='icon-cancel'></i></span>
                <span className="follow" style={{left:`${this.state.coordsX}px`,top:`${this.state.coordsY}px`,'display':titleShow}}>{this.props.title}</span>
                <ul className='ul'>
                    <span className='left' onClick={this.handleClickLeft.bind(this)}></span>
                    <span className='right'  onClick={this.handleClickRight.bind(this)}></span>
                {imglist}
                </ul>

            </div>
        )
    }
}


export default Project;

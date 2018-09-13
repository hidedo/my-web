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
            loading: true
        }

    }

    handleClick(...params) {

        if (this.refs[params[1]].childNodes[1].complete && this.state.detailImgArrs[params[0] - 1]) {
            this.setState({show: !this.state.show});
            this.setState({visibility: 'hidden'});
            this.setState({detailImgArr: this.state.detailImgArrs[params[0] - 1]})
        }
    }

    handleEnter(...params) {
        if (this.refs[params[0]].childNodes[1].complete) {
            this.refs[params[0]].firstChild.style.opacity = '1'
            this.refs[params[0]].childNodes[1].style.opacity = '0.5';
        }


    }

    handleLeave(...params) {
        if (this.refs[params[0]].childNodes[1].complete) {
            this.refs[params[0]].firstChild.style.opacity = '0'
            this.refs[params[0]].childNodes[1].style.opacity = '1'
        }


    }

    handleBack() {

        this.setState({show: false, visibility: ''});
    }

    handleLoad(...params) {

        const obj = imagesLoaded(this.project, params[0]);
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
            return (
                <div style={{'width': v.width / v.scale, 'height': v.height / v.scale, 'margin': v.margin,
                'backgroundImage':`url(${randomPic()})`}} key={index}
                     ref={index} onClick={this.handleClick.bind(this, index, index)}
                     onMouseEnter={this.handleEnter.bind(this, index)}
                     onMouseLeave={this.handleLeave.bind(this, index)}>

                    <span><span></span>{v.name}</span>

                    <img style={{opacity: this.state.loading ? 0 : 1}} onLoad={this.handleLoad.bind(this, index)}
                         width='100%' src={`/image/${v.src}.jpg`} alt={v.src}/>
                </div>
            )

        });

        return (



            <div className='wrapper'>
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
                                               imgArr={this.state.detailImgArr}/>);

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

    handleClick(){
        this.props.callbackParent(false);
    }
    componentWillMount(){}
    render() {

        const func = imgArr => {
            return (imgArr.map(v => {
                let index = imgArr.indexOf(v)+1

                return (
                    <li ref={`myli${index}`} key={index}>
                        <img  height='100%' src={`/image/${v.src}.jpg`} alt={v.src}/>

                    </li>
                )
            }))
        }
        const imglist = func(this.props.imgArr);

        return (
            <div className={`detailPic ${this.props.fade} animated`} onClick={this.handleClick.bind(this)}>
                <span className='close' onClick={this.handleClick.bind(this)}><i className='icon-cancel'></i></span>

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

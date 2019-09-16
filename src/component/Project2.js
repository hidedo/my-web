/**
 * Created by tommy on 2018/6/8.
 */
import React, { Component } from 'react';
import '../css/Project2.css'
import '../css/animate.css'
import PicList from './PicList'
import '../css/fontello-7529c44d/css/font.css'
import { Link } from 'react-router-dom'
import MobileHeader from './MobileHeader'
import LazyLoad from "react-lazy-load";
import BaseUrl from '../baseUrl'


class ProjectGroup extends PicList{

    componentDidMount(){};
    render(){
        this.state.imgArr = this.props.imgArr;
        const imglist = this.state.imgArr.map(v => {
            let index = this.state.imgArr.indexOf(v) + 1;
            if (window.screen.availWidth < 500) {
                return(
                <li  className={'filler mbli'} ref={`myli${index}`} key={index}>
                    <LazyLoad height={'100%'}>
                        <img height='100%' src={`${BaseUrl.url}/public/image/m-project-pic/${v.src}.jpg`} alt={v.src}/>
                    </LazyLoad>
                </li>
                )
            }
            else {
                return (
                    <li className={'filler pcli'} ref={`myli${index}`} key={index}>
                    <LazyLoad height={'100%'}>
                        <img height='100%' src={`${BaseUrl.url}/public/image/project-pic/${v.src}.jpg`} alt={v.src}/>
                    </LazyLoad>
                    </li>
                )
            }


        }
        )



        let profile = this.props.profile;
        return (
            <div  style={{'width': 2500 / profile.scale, 'height': 1500 / profile.scale, 'margin': profile.margin,
            }}>
                <ul className={'ul'}>
                    <span className='left' onClick={this.handleClickLeft.bind(this)}></span>
                    <span className='right'  onClick={this.handleClickRight.bind(this)}></span>
                    {imglist}
                </ul>
                <span className={'profileName'} style={{'width':'100%','textAlign':'center','marginTop':'10px','display':'block'}}>{profile.name}</span>
            </div>
        )

    }
}
class Project2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],

        }

    }


    componentDidMount() {
        fetch(`${BaseUrl.url}/public/conf.json`)
            .then(res => res.json())
            .then(data => {
                    this.setState({data: data.projectGroup});

                }
            )
            .catch((e) => console.log(e.message))

        document.getElementsByClassName('wrapper')[0].onscroll = handleScroll;


        function handleScroll() {
            const elements = document.querySelectorAll('.profileName');
            const offset = [];
            for (let item of elements) {

                offset.push([item.offsetTop, item.offsetHeight]);

            }


            const scrollTop = document.getElementsByClassName('wrapper')[0].scrollTop;
            const heights = offset.map(value => value[0] + value[1] - scrollTop);
            // console.log(heights,window.innerHeight);
            heights.forEach(function(val,idx) {
                if (0 < val && val < window.innerHeight) {
                    elements[idx].classList.add("fadeIn","animated2")
                }
                else {
                    elements[idx].classList.remove("fadeIn","animated2")

                }

            })



        }









    }







    render() {

        const projectGroupList = this.state.data.map(v => {
            let index = this.state.data.indexOf(v) + 1;
            return <ProjectGroup   key={index} imgArr={v.imgArr} profile={v.profile} />
        })
        return (
            <div  className='wrapper'>
                <MobileHeader/>
                <div ref={'project'} className={`project fadeIn animated2`}>

                    <Link to='/' className='link'><span className='close'><i className='icon-cancel'></i></span></Link>
                    {projectGroupList}

                </div>


            </div>


         )

    }
}




export default Project2;

/**
 * Created by tommy on 2018/5/24.
 */
import React, { Component } from 'react';
import '../css/PicList.css'
import '../css/animate.css'
import LazyLoad from 'react-lazy-load'




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
        e.stopPropagation()
        let n = this.state.n;

        if(!this.refs[`myli${n-1}`]){

            return;
        }
        this.refs[`myli${n}`].setAttribute('class','notdisplay');
        this.refs[`myli${n-1}`].setAttribute('class',`fadeIn animated pcli`);
        this.setState({n:n-1})

    }

    componentWillMount(){
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

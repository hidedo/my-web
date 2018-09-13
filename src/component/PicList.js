/**
 * Created by tommy on 2018/5/24.
 */
import React, { Component } from 'react';
import '../css/PicList.css'
import '../css/animate.css'





class PicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           n:1,
           imgArr:[]

        }
    }

    handleClickRight(e){
        e.stopPropagation()
        let n = this.state.n;

        if(!this.refs[`myli${n+1}`]){

            this.refs.myli1.setAttribute('class',`fadeIn animated`);
            this.refs[`myli${n}`].setAttribute('class','notdisplay');
            this.setState({n:1});
            return;
        }
        this.refs[`myli${n}`].setAttribute('class','notdisplay');
        this.refs[`myli${n+1}`].setAttribute('class',`fadeIn animated`);
        this.setState({n:n+1})

    }
    handleClickLeft(e){
        e.stopPropagation()
        let n = this.state.n;

        if(!this.refs[`myli${n-1}`]){

            return;
        }
        this.refs[`myli${n}`].setAttribute('class','notdisplay');
        this.refs[`myli${n-1}`].setAttribute('class',`fadeIn animated`);
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

            return(

                    <li ref={`myli${index}`} key={index}>
                        <img  height='100%' src={`/image/${v.src}.jpg`} alt={v.src}/>
                    </li>
            )
        });
        let filter = this.props.blur ? 'blur(30px)' : '';

        return(
        <div style={{'filter':filter,'transition':'filter linear 0.2s'}} className='picList'>

            <ul  className='ul'>
                <span className='left' onClick={this.handleClickLeft.bind(this)}></span>
                <span className='right'  onClick={this.handleClickRight.bind(this)}></span>
            {imglist}
            </ul>

        </div>
        )
    }
}

export default PicList;

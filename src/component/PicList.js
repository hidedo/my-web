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

    handleClickRight(){
        let n = this.state.n;

        if(!this.refs[`myli${n+1}`]){

            this.refs.myli1.setAttribute('class',`fadeIn animated`);
            this.refs[`myli${n}`].setAttribute('class',`fadeOut animated`);
            this.setState({n:1});
            return;
        }
        this.refs[`myli${n}`].setAttribute('class',`fadeOut animated`);
        this.refs[`myli${n+1}`].setAttribute('class',`fadeIn animated`);
        this.setState({n:n+1})

    }
    handleClickLeft(){

        let n = this.state.n;

        if(!this.refs[`myli${n-1}`]){

            return;
        }
        this.refs[`myli${n}`].setAttribute('class',`fadeOut animated`);
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


            return(

                    <li ref={`myli${v.id}`} key={v.id}>
                        <img  height='100%' src={require('../' + v.src + '.jpg')} alt={v.src}/>
                    </li>
            )
        });
        let filter = this.props.blur ? 'blur(30px)' : '';

        return(
        <div style={{'WebkitFilter':filter}} className='picList'>

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

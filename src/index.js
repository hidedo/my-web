import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Home from './component/Home'
import Project2 from './component/Project2'
import Diary from './component/Diary'
import DoublePicList from './component/DoublePicList'
import MobileInfo from './component/MobileInfo'
import registerServiceWorker from './registerServiceWorker';
import {  Route, HashRouter,BrowserRouter} from 'react-router-dom'



ReactDOM.render((<HashRouter>
        <div>

        <Route exact path="/" component={Home}/>
        {/*<Route exact path="/project/" component={Project}/>*/}
            <Route exact path="/project/" component={Project2}/>
        <Route exact path="/double/" component={DoublePicList}/>
        <Route exact path="/diary/" component={Diary}/>
        <Route exact path="/info/" component={MobileInfo}/>
        </div>
    </HashRouter>
    ),
    document.getElementById('root'));
// registerServiceWorker();

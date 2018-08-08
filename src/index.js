import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Home from './component/Home'
import Project from './component/Project'
import Diary from './component/Diary'
import DoublePicList from './component/DoublePicList'
import registerServiceWorker from './registerServiceWorker';
import {  Route, HashRouter} from 'react-router-dom'



ReactDOM.render((<HashRouter>
        <div>

        <Route exact path="/" component={Home}/>
        <Route exact path="/project" component={Project}/>
        <Route exact path="/double" component={DoublePicList}/>
        <Route exact path="/diary" component={Diary}/>

            </div>
    </HashRouter>
    ),
    document.getElementById('root'));
registerServiceWorker();

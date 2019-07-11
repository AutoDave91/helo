import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Auth from '../src/Components/Auth'
import Dashboard from '../src/Components/Dashboard'
import Form from '../src/Components/Form'
import Post from '../src/Components/Post'

export default(
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/post/:postid' component={Post} />
        <Route path='/new' component={Form} />
    </Switch>
)
import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Auth extends Component{
    constructor(){
        super()
        this.state ={
            username: '',
            password: '',
            redirect: false
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    handleLogin(e){
        e.preventDefault()
        let userPass = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.getUserInfo(this.state.username)
        axios
            .post('/auth/login', {userPass})
            .then(response => { 
                this.setState({username: '', password: '', redirect: true})
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                alert('Bad Username or Password')
            })
    }
    handleRegister(e){
        e.preventDefault()
        let userPass = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.getUserInfo(this.state.username)
        axios 
            .post('/auth/register', {userPass})
            .then(user => {
                this.setState({username: '', password: '', redirect: true})
            })
            .catch(err => {
                alert('Username Taken')
            })
    }

    render(){
        return(
            <main id='auth'>
                <section id='authContainer'>
                    <img src={require('../../Images/logo.png')}/>
                    <h1>Helo?</h1>
                    <form id='authForm' onSubmit={(e) => this.handleLogin(e)}>
                        <section className='inputSection'>
                            <label for='username'>Username: </label>
                            <input className='authInput' id='username' required  type='text'  name='username'  placeholder='username' onChange={(e) => this.handleChange(e)}/>
                        </section>
                        <section className='inputSection'>
                            <label for='password'>Password: </label>
                            <input className='authInput'  id='password' required  type='text'  name='password'  placeholder='password' onChange={(e) => this.handleChange(e)}/>
                        </section>
                        <section id='authButtonSection'>
                            <input className='authButton' name='login' type='submit' value='Login'/>
                            <input className='authButton' name='register' type='button' value='Register' onClick={(e) => this.handleRegister(e)}/>
                        </section>
                    </form>
                </section>
            </main>
        )
    }
}




export default connect(null,{getUserInfo})(Auth)
import React, { PureComponent } from 'react';
import Axios from 'axios'
import { Redirect } from 'react-router-dom';

export default class Access extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: props.logged,
            setlogin: props.setlogin
        }

        //register binding
        this.newUserInput = React.createRef()
        this.newPassInput = React.createRef()
        this.newPassConfirm = React.createRef()
        this.register = this.register.bind(this)

        //login binding
        this.loginUserInput = React.createRef()
        this.loginPassInput = React.createRef()
        this.login = this.login.bind(this)
    }

    static getDerivedStateFromProps(props) {
        return {
            logged: props.logged
        }
    }

    login(form) {
        //console.log(this.loginPassInput, this.loginUserInput)
        form.preventDefault()

        let username = this.loginUserInput.current.value,
            password = this.loginPassInput.current.value

        axios.post('/auth/login', {
            username: username,
            password: password
        }).then(response => {
            console.log(response.data)
            if (response.data.result == 'success') {
                this.state.setlogin()
            } else {
                alert('Incorrect login details')
            }
        })
    }

    register(form) {
        form.preventDefault()
        let username = this.newUserInput.current.value,
            password = this.newPassInput.current.value,
            passwordConfirmation = (this.newPassInput.current.value == this.newPassConfirm.current.value)

        if (username == '') {
            alert('username cannot be empty');
            return
        }

        if (password == '' || password.length <= 5) {
            alert('Passwords needs to be at least 6 characters long')
            return
        }

        if (!passwordConfirmation) {
            alert('Password and the password confirmation do not match')
            return
        }

        axios.post('/auth/register', {
            username: username,
            password: password
        }).then(response => {
            if (response.data.result == 'error') {
                alert(response.data.message)
            } else if (response.data.result == 'success') {
                this.state.setlogin()
            }
        })
    }

    render() {
        if (this.state.logged) {
            return (
                <Redirect to='/' />
            )
        } else {
            return (
                <div className='uk-child-width-1-2 uk-grid-collapse uk-margin-auto uk-width-3-5 uk-text-center' uk-grid='true'>
                    <div>
                        <div>
                            <h4>Login to view your orders</h4>
                            <form method='post' action='/auth/login' onSubmit={this.login}>
                                <div className="uk-margin uk-margin-remove-bottom uk-margin-remove-top">
                                    <label className='uk-display-block'>You username</label>
                                    <div className="uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                                        <input className="uk-input" type="text" ref={this.loginUserInput} />
                                    </div>
                                </div>
                                <div className="uk-margin uk-margin-remove-bottom uk-margin-remove-top">
                                    <label className='uk-display-block'>Your password</label>
                                    <div className="uk-inline">
                                        <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                                        <input className="uk-input" type="password" ref={this.loginPassInput} />
                                    </div>
                                </div>
                                <div className="uk-margin uk-margin-remove-bottom">
                                    <div className="uk-inline">
                                        <input className="uk-button uk-button-primary uk-border-rounded uk-width-1-1" type="submit" value='Login' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h4>Register to save your orders</h4>
                            <form method='post' action='/auth/register' onSubmit={this.register}>
                                <div className="uk-margin uk-margin-remove-bottom uk-margin-remove-top">
                                    <label className='uk-display-block'>New username</label>
                                    <div className="uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                                        <input className="uk-input" type="text" ref={this.newUserInput} />
                                    </div>
                                </div>
                                <div className="uk-margin uk-margin-remove-bottom uk-margin-remove-top">
                                    <label className='uk-display-block'>New password</label>
                                    <div className="uk-inline">
                                        <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                                        <input className="uk-input" type="password" ref={this.newPassInput} />
                                    </div>
                                </div>
                                <div className="uk-margin uk-margin-remove-bottom uk-margin-remove-top">
                                    <label className='uk-display-block'>New password confirmation</label>
                                    <div className="uk-inline">
                                        <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                                        <input className="uk-input" type="password" ref={this.newPassConfirm} />
                                    </div>
                                </div>
                                <div className="uk-margin uk-margin-remove-bottom">
                                    <div className="uk-inline">
                                        <input className="uk-button uk-button-primary uk-border-rounded uk-width-1-1" type="submit" value='Register' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
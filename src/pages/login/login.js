
import React from 'react';
import api from '../../services/api.services';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import './login.css';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blocklist: false,
            user: '',
            autoload: false
        }
        this.renderlogin = this.renderlogin.bind(this);
        this.renderform = this.renderform.bind(this);
        this.updateblocklist = this.updateblocklist.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (response) => {
        api.createUser(response.profileObj.name, response.profileObj.email)
            .then(response1 => {
                if (response1.data.password === "0") {
                    this.setState({
                        blocklist: true,
                        user: response1.data,
                        autoload: true
                    })
                }
                else {
                    this.props.history.push(`/home/${response1.data._id}/${response1.data.full_name}`);
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    updateblocklist() {
        api.setUserBlockList(this.state.user._id, this.refs.upper.checked, this.refs.middle.checked, this.refs.lower.checked, this.refs.short.checked, this.refs.long.checked)
            .then(response1 => {
                this.setState({
                    blocklist: false
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderform() {
        console.log(this.state.user);
        return (
            <div className="loginBg">
                <h1 className="header-font">Welcome {this.state.user.full_name} </h1>
                <br/>
                <br/>
                <h3 className="header-font">What area of the body you would like to work on?</h3>
                <form>
                    <div className="block-list-div">
                        <label className="container"> upper
                        <input type="checkbox" ref="upper" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container"> middle
                        <input type="checkbox" ref="middle" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container"> lower
                        <input type="checkbox" ref="lower" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <br/>
                    <br/>
                    <h3 className="header-font">How would you like your training ?</h3>
                    <div className="block-list-div">
                        <label className="container"> long
                        <input type="checkbox" ref="long"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container"> short
                        <input type="checkbox" ref="short" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <br/>
                    <button className="update-button" type="button" onClick={() => this.updateblocklist()}>GO</button>
                </form>
            </div>
        );
    }

    renderlogin() {
        return (
            <div className="loginBg">
                    <h1 className="header-font">body-fit</h1>
                    <GoogleLogin
                        clientId="1022951333426-b1ogj66n03jv6afgraq22ppqq275fgdu.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        className="google-login"
                        autoLoad={this.state.autoload}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
            </div>
        );
    }



    render() {
        return (
            this.state.blocklist ? this.renderform() : this.renderlogin()
        );

    }
}

export default withRouter(Login);







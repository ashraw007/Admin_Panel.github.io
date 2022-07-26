import React, {Component} from 'react';
import LoginPage from '../../Component/LoginPage/LoginPage';
import classes from './login.module.css';
import axios from '../../axios';
import SnackBar from '../../Component/MUI/snackbar/snackbar'

class Login extends Component {
    state = {
        id: '',
        password: '',
        isInvalid: false,
        errorMessage: ''
    }

 
    idChangeHandler = (event) => {
        this.setState({id: event.target.value});
    }
      
    passwordChangeHandler = (event) => {
        this.setState({password: event.target.value});
    }
     
    onLoginHandler = () => {
        axios.post("/api/admin/auth/login", 
            {ID: this.state.id, password: this.state.password},
            {withCredentials: true}
        ).then(res => {
            if(res.data.isSuccess === true){
                this.props.refresh()
            }
        }).catch(err => {
            this.setState({isInvalid: true, errorMessage: err.errorMessage})
            setTimeout(()=>{
                this.setState({isInvalid: false, errorMessage: ''})
            }, 3200)
        })
    }


    render() {  
        return (
            <div className={classes.Container}>
            <div className={classes.Background}></div>
                <div className={classes.Layout}>
                            <LoginPage 
                                id={this.state.id}
                                password={this.state.password}
                                idHandler={(event) => this.idChangeHandler(event)}
                                passwordHandler={(event) => this.passwordChangeHandler(event)}
                                loginHandler={() => this.onLoginHandler()}
                            />             
                              
                </div>
                {this.state.isInvalid ? <SnackBar message={this.state.errorMessage} type="error" /> : null}       
                </div>
                )
      }
}

export default Login;
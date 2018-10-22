import React from 'react';
import "../styles/User.scss";

import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

class User extends React.Component{

  constructor(){
    super();
    this.state ={

      name:"",
      phone:""
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleChangeName(event){
     this.setState({
      name: event.target.value
     })

  }

  handleChangePhone(event){
    this.setState({
      phone: event.target.value
    })
  }

  handleSubmit(){
    event.preventDefault();
    const userDetails={
      name: this.state.name,
      phone: this.state.phone
    }
    this.props.receiveUserDetails(userDetails);

  }

render(){

  return(
    <Modal open={this.props.displayUserForm} onClose={this.handleSubmit} center>
    <div className="user">
      <p>Your name</p>
      <input type="text" onChange={this.handleChangeName} value={this.state.name} placeholder="NAME"/>
      <p>Phone number</p>
      <input type="text" onChange={this.handleChangePhone} value= {this.state.phone} placeholder="PHONE NUMBER"/>
      <p type="button" className="button" onClick ={this.handleSubmit}>Submit</p>
    </div>
    </Modal>
  )
}
}

export default User;

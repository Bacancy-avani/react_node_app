import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './App.css';

class InsertForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      isActive: '',
      toHome: '',
    };
  }

  handleChange(e) {

    this.setState({ [e.target.name]: e.target.value })
  }

  async handleSubmit(e) {
    const { firstName, lastName, gender, isActive } = this.state;
    e.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      gender: gender === 'female' ? true : false,
      isActive: isActive === 'active' ? true : false
    };
    let res;
    try {
      res = await axios.post('http://localhost:3000/users', user)
    } catch (err) {
      console.log(err)
    }
    if (res) {
      this.setState({ toHome: true })
    }

  }
  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <form>
          First Name: <input type="text" name="firstName" onChange={e => this.handleChange(e)} /><br />
          Last Name: <input type="text" name="lastName" onChange={e => this.handleChange(e)} /><br />
          Gender:
                <input type="radio" name="gender" value="female" onChange={e => this.handleChange(e)} />Female
                <input type="radio" name="gender" value="male" onChange={e => this.handleChange(e)} />Male<br />

          Is Active :

                <input type="radio" name="isActive" value="active" onChange={e => this.handleChange(e)} />Active
                <input type="radio" name="isActive" value="deactive" onChange={e => this.handleChange(e)} />Deactive
        <br /><input type="button" value="Insert" onClick={e => this.handleSubmit(e)} />
        </form>
      </div>
    );
  }
}

export default InsertForm;

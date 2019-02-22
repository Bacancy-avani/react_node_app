import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      isActive: '',
      gender: '',
      toHome: false
    };
  }
  componentWillMount() {
    axios.get('http://localhost:3000/users/' + this.props.match.params.id)
      .then(response => {
        const { firstName, lastName, isActive, gender } = response.data.data[0];
        this.setState({ firstName, lastName, isActive, gender });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      res = await axios.put('http://localhost:3000/users/' + this.props.match.params.id, user);
      if (res) {
        this.setState({ toHome: true })
      }
    } catch (err) {
      console.log(err);
    }





  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <form>
          First Name: <input type="text" name="firstName" onChange={e => this.handleChange(e)} value={this.state.firstName} /><br />
          Last Name: <input type="text" name="lastName" onChange={e => this.handleChange(e)} value={this.state.lastName} /><br />
          Gender: {
            (this.state.gender) ?
              <div>
                <input
                  type="radio" name="gender" value="female"
                  onChange={e => this.handleChange(e)} defaultChecked
                />Female
                  <input type="radio" name="gender" value="male" onChange={e => this.handleChange(e)} />Male
                </div>
              :
              <div>
                <input type="radio" name="gender" value="female" onChange={e => this.handleChange(e)} />Female
                  <input type="radio" name="gender" value="male" onChange={e => this.handleChange(e)} defaultChecked />Male<br />
              </div>
          }
          Is Active :{
            (this.state.isActive === true) ?
              <div>
                <input type="radio" name="isActive" value="active" onChange={e => this.handleChange(e)} defaultChecked />Active
                  <input type="radio" name="isActive" value="deactive" onChange={e => this.handleChange(e)} />Deactive<br />
              </div>
              :
              <div>
                <input type="radio" name="isActive" value="active" onChange={e => this.handleChange(e)} />Active
                  <input type="radio" name="isActive" value="deactive" onChange={e => this.handleChange(e)} defaultChecked />Deactive<br />
              </div>
          }
          <input type="button" onClick={e => this.handleSubmit(e)} value="Update" />
        </form>
      </div>
    );
  }
}

export default EditForm;

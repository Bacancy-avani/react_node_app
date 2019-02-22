import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  handleDelete(id) {
    //alert(id)
    axios.delete('http://localhost:3000/users/' + id)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    var users = this.state.users.filter(function (user) { return user.id != id });
    this.setState({ users: users });
    // console.log(this.state.users)
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users/')
      .then(response => {
        this.setState({ users: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {
    return (
      <div>
        <center>
          <table border="1">
            <thead>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Gender</td>
                <td>Active Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>

              {this.state.users.map(user =>

                <tr key={user.id}>
                  <td>{user.firstName} </td>
                  <td>{user.lastName}</td>
                  <td>{user.gender === true ? 'Female' : 'Male'}</td>
                  <td>{user.isActive === true ? 'Active' : 'Deactive'}</td>
                  <td><Link to={"/edit/" + user.id}>Edit</Link>|<a href="#" onClick={e => this.handleDelete(user.id)}>Delete</a></td>
                </tr>
              )}




            </tbody>
          </table>
        </center>
      </div>
    );
  }
}

export default List;

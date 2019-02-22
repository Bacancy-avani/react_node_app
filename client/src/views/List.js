import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async handleDelete(id) {
    let res;
    try {
      res = await axios.delete('http://localhost:3000/users/' + id)
      if (res) {
        let users = this.state.users.filter(user => user.id !== id);
        this.setState({ users: users });

      }
    } catch (err) {
      console.log(err);
    }
  }

  async handleActiveState(id, status) {
    let res;
    if (status === true) {
      try{
        res = await axios.put('http://localhost:3000/users/' + id + '/deactive')
      } catch(err) {
        console.log(err);
      }
    } else {
      try{
        res = await axios.put('http://localhost:3000/users/' + id + '/active')
      } catch(err) {
        console.log(err);
      }
    }
    if (res) {
      let users = this.state.users.filter(function (user) {
        if (user.id === id) {
          user.isActive === true ? user.isActive = false : user.isActive = true;
        }
        return user;
      });
      this.setState({ users: users });
    }
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
      <div className="container">
        <center>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Active Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {this.state.users.map(user =>

                <tr key={user.id}>
                  <td>{user.firstName} </td>
                  <td>{user.lastName}</td>
                  <td>{user.gender === true ? 'Female' : 'Male'}</td>
                  <td>
                    <a onClick={e => this.handleActiveState(user.id, user.isActive)}>
                      {user.isActive === true ? 'Active' : 'Deactive'}
                    </a>
                  </td>
                  <td>
                    <Link to={"/edit/" + user.id}>Edit </Link>|
                    <a onClick={e => this.handleDelete(user.id)}>Delete</a>
                  </td>
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

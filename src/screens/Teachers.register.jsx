import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import axios from 'axios';
import faker from 'faker';

class TeachersRegister extends React.Component {
  constructor() {
    super()

    this.state = {
      degrees: [],
      maxStudents: 0,
      insertQuantity: 300,
    }
  }

  componentDidMount() {
    this.getClasses()
    this.getDegrees()
  }

  getDegrees = () => {
    axios.get('degrees', {
      params: {
        _embed: [
          'students',
        ],
      },
    }).then(({ data }) => {
      var maxStudents = 0

      for (let degree of data) {
        if (degree.students.length > maxStudents) {
          maxStudents = degree.students.length
        }
      }

      this.setState({
        degrees: data,
        maxStudents,
      })
    })
  }

  getClasses = () => {
    axios.get('classes').then(({ data }) => {
      this.setState({
        classes: data,
      })
    })
  }

  registerStudents = () => {
    const { degrees, classes, insertQuantity } = this.state

    const students = []

    for (let i = 0; i < insertQuantity; i++) {
      // Get random degree.
      const degree = degrees[Math.floor(Math.random() * degrees.length)]

      // Get random class.
      const _class = classes[Math.floor(Math.random() * classes.length)]

      students.push({
        name     : faker.name.findName(),
        ra       : Math.floor(Math.random() * 999999) + 1,
        degreeId : degree.id,
        classId  : _class.id,
      })
    }

    axios.post('students', students).then(this.getDegrees)
  }

  handleInsertQuantityInput = (e) => {
    this.setState({
      insertQuantity: parseInt(e.target.value),
    })
  }

  render() {
    const { degrees, maxStudents } = this.state

    return (
      <Dashboard>
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">Register students</h6>
          </div>

          <div className="card-body">
            <div className="degree-levels d-flex justify-content-between">
              {degrees?.map((degree, index) => (
                <div className="level" key={index}>
                  <div className="bar-container">
                    <div className="bar" style={{ height: maxStudents > 0 ? ((degree.students.length / maxStudents * 100) + '%') : '100%' }}></div>
                  </div>
                  <div className="quantity">
                    <span>
                      {degree.students.length}
                    </span>
                  </div>
                  <div className="label">
                    <span>{degree.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <Link to="/students" className="btn btn-secondary d-flex align-items-center">
              <span>Back</span>
            </Link>

            <div className="input-group align-self-end" style={{ width: 'auto' }}>
              <button className="btn btn-success" onClick={this.registerStudents}>Register</button>
              <div className="input-group-text">
                <select name="insertQuantity" className="form-control" onChange={this.handleInsertQuantityInput}>
                  <option value="300">300</option>
                  <option value="100">100</option>
                  <option value="50">50</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    )
  }
}

export default TeachersRegister;

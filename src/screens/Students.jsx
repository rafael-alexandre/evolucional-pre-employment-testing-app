import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Student from '../components/Student';
import axios from 'axios';

class Students extends React.Component {
  constructor() {
    super()

    this.state = {
      students: [],
      classes: [],
      degrees: [],
      degreeId: null,
      classId: null,
      page: 1,
      nextPage: true,
      perPage: 10,
    }
  }

  componentDidMount() {
    this.getStudents()
    this.getDegrees()
    this.getClasses()
  }

  getStudents = () => {
    const { degreeId, classId, page, perPage } = this.state

    axios.get('students', {
      params: {
        degreeId,
        classId,
        _expand: [
          'degree', 'class',
        ],
        _page: page,
        _limit: 10,
      },
    }).then(({ data }) => {
      if (data.length) {
        this.setState({
          students: [],
          nextPage: data.length === perPage,
        }, () => {
          this.setState({
            students: data,
          })
        })
      } else {
        this.setState({
          students: [],
          nextPage: false,
        })
      }
    });
  }

  getDegrees = () => {
    axios.get('degrees').then(({ data }) => {
      this.setState({
        degrees: data,
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

  handleSearchInput = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value !== '' ? value : null,
    })
  }

  prevPage = () => {
    const { page } = this.state

    if (page > 1) {
      this.setState({
        page: page - 1,
      }, this.getStudents)
    }
  }

  nextPage = () => {
    const { page } = this.state

    this.setState({
      page: page + 1,
    }, this.getStudents)
  }

  search = () => {
    this.setState({
      page: 1,
    }, this.getStudents)
  }

  render() {
    const { students, classes, degrees, page, nextPage } = this.state

    return (
      <Dashboard>
        <div className="row d-flex justify-content-between align-items-end mb-3">
          <div className="col-6 d-flex justify-content-between align-items-end">
            <div className="row" style={{ width: '100%' }}>
              <div className="col-6">
                <div className="form-group">
                  <label>Degree:</label>
                  <select name="degreeId" onChange={this.handleSearchInput} className="form-control">
                    <option value="">-- All --</option>
                    {degrees?.map((item, index) => (
                      <option value={item.id} key={index}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Class:</label>
                  <select name="classId" onChange={this.handleSearchInput} className="form-control">
                    <option value="">-- All --</option>
                    {classes?.map((item, index) => (
                      <option value={item.id} key={index}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button className="btn btn-primary ms-4" onClick={this.search}>Search</button>
          </div>

          <div className="col-6 d-flex justify-content-end">
            <Link to="/students/register" className="btn btn-primary">Register students</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body pb-0">
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col" style={{ width: 100 }}>#</th>
                  <th scope="col">Name</th>
                  <th scope="col">R.A</th>
                  <th scope="col">Degree</th>
                  <th scope="col">Class</th>
                  <th scope="col" style={{ width: 100 }}>Acion</th>
                </tr>
              </thead>

              <tbody>
                {students.length ? students.map((student, index) => (
                  <Student student={student} degrees={degrees} classes={classes} key={index}></Student>
                )) : (
                  <tr className="table-light">
                    <td colSpan="6" className="text-center">Results not found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="card-footer d-flex justify-content-end">
            <button className={'btn btn-' + (page <= 1 ? 'secondary disabled' : 'primary')} onClick={this.prevPage}>Prev</button>
            <button className={'btn ms-2 btn-' + (nextPage ? 'primary' : 'secondary disabled')} onClick={this.nextPage}>Next</button>
          </div>
        </div>
      </Dashboard>
    )
  }
}

export default Students;

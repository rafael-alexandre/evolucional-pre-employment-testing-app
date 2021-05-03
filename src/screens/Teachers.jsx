import React from 'react';
import Dashboard from '../components/Dashboard';
import Teacher from '../components/Teacher';
import axios from 'axios';
import Degree from '../components/Degree';
import RegisterTeacher from '../components/RegisterTeacher';

class Teachers extends React.Component {
  constructor() {
    super()

    this.state = {
      relationships: [],
      classes: [],
      degrees: [],
      degreeId: null,
      classId: null,
      registerModal: false,
      degree: {},
    }
  }

  componentDidMount() {
    this.getRelationships()
    this.getDegrees()
    this.getClasses()
  }

  getRelationships = () => {
    axios.get('relationships', {
      params: {
        _expand: [
          'teacher', 'matter',
        ],
      },
    }).then(({ data }) => {
      data = this.applyFilters(data)

      this.setState({
        relationships: [],
      }, () => {
        this.setState({
          relationships: data,
        })
      })
    })
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

  applyFilters = (data) => {
    const { degreeId, classId } = this.state

    if (degreeId) {
      data = data.filter(p =>
        p.degrees.filter(p => p.degreeId === parseInt(degreeId)
      ).length > 0)
    }

    if (classId) {
      data = data.filter((data) => {
        return data.degrees.filter((degree) => {
          return degree.classes.filter((e) => {
            return e.classId === parseInt(classId)
          }).length > 0
        }).length > 0
      })
    }

    return data
  }

  search = () => {
    this.getRelationships()
  }

  openRegisterModal = () => {
    this.setState({
      registerModal: true,
    })
  }

  closeRegisterModal = () => {
    this.setState({
      registerModal: false,
    })
  }

  registerModalApply = () => {
    this.setState({
      registerModal: false,
    }, this.getRelationships)
  }

  openDegree = (degreeId, classes) => {
    const { degrees } = this.state

    const classesId = []

    for (let _class of classes) {
      classesId.push(_class.classId)
    }

    this.setState({
      degree: {
        ...degrees.find(p => p.id === parseInt(degreeId)),
        classes: classesId,
      },
    })
  }

  closeDegree = () => {
    this.setState({
      degree: {},
    })
  }

  render() {
    const { relationships, classes, degrees, degree, registerModal } = this.state

    return (
      <Dashboard>
        {degree?.id ? (
          <Degree degree={degree} close={this.closeDegree}></Degree>
        ) : null}

        {registerModal ? (
          <RegisterTeacher apply={this.registerModalApply} close={this.closeRegisterModal}></RegisterTeacher>
        ) : null}

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
            <button className="btn btn-success" onClick={this.openRegisterModal}>Register</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body pb-0">
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col" style={{ width: 100 }}>#</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Matter</th>
                  <th scope="col">Degrees & classes</th>
                </tr>
              </thead>

              <tbody>
                {relationships.length && classes.length && degrees.length ? relationships.map((relationship, index) => (
                  <Teacher relationship={relationship} degrees={degrees} classes={classes} openDegree={this.openDegree} key={index}></Teacher>
                )) : (
                  <tr className="table-light">
                    <td colSpan="6" className="text-center">Results not found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Dashboard>
    )
  }
}

export default Teachers;

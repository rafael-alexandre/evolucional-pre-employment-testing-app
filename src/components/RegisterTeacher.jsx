import axios from 'axios';
import React from 'react';

class RegisterTeacher extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      degrees: [],
      classes: [],
      matters: [],
      teacher: {
        name: null,
      },
      relationship: {
        teacherId: null,
        matterId: null,
        degrees: [],
      },
    }
  }

  componentDidMount() {
    this.getDegrees()
    this.getClasses()
    this.getMatters()
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

  getMatters = () => {
    axios.get('matters').then(({ data }) => {
      this.setState({
        matters: data,
      })
    })
  }

  handleTeacherChange = (e) => {
    const { teacher } = this.state

    this.setState({
      teacher: {
        ...teacher,
        name: e.target.value,
      }
    })
  }

  handleMatterIdChange = (e) => {
    const { relationship } = this.state

    this.setState({
      relationship: {
        ...relationship,
        matterId: parseInt(e.target.value),
      }
    })
  }

  handleCheckboxChange = (degreeId, classId) => {
    const { relationship } = this.state

    const degreeIndex = relationship.degrees.findIndex(p => p.degreeId === parseInt(degreeId))

    if (degreeIndex !== -1) {
      const classIndex = relationship.degrees[degreeIndex]?.classes.findIndex(p => p?.classId === parseInt(classId))

      if (classIndex !== -1) {
        delete relationship.degrees[degreeIndex].classes[classIndex]
      } else {
        relationship.degrees[degreeIndex].classes.push({
          classId,
        })
      }
    } else {
      relationship.degrees.push({
        degreeId,
        classes: [
          {
            classId,
          }
        ],
      })
    }

    relationship.degrees = relationship.degrees.filter((e) => {
      return e.classes.filter(Boolean).length > 0
    })

    this.setState({
      relationship,
    })
  }

  register = () => {
    const { teacher, relationship } = this.state

    axios.post('teachers', teacher).then(({ data }) => {
      relationship.teacherId = data.id
      axios.post('relationships', relationship).then(this.props.apply)
    })
  }

  render() {
    const { degrees, classes, matters } = this.state

    return (
      <>
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register relationship</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.close}></button>
              </div>

              <div className="modal-body pb-0">
                <div className="form-group mb-3">
                  <label>Teacher:</label>
                  <input type="text" name="teacher" className="form-control" onChange={this.handleTeacherChange} />
                </div>

                <div className="form-group mb-3">
                  <label>Matter:</label>
                  <select name="matterId" className="form-control" onChange={this.handleMatterIdChange}>
                    <option value="">-- Select --</option>
                    {matters?.map((item, index) => (
                      <option value={item.id} key={index}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="row mb-0 degree-classes">
                  {degrees?.map((degree, index) => (
                    <div className="col-6" key={index}>
                      <div>{degree.name}</div>
                      <ul className="d-flex justify-content-start">
                        {classes?.map((item, x) => (
                          <li key={x}>
                            <input type="checkbox" id={`cb-${degree.id}-${item.id}`} value={item.id} onChange={(e) => this.handleCheckboxChange(degree.id, item.id)} />
                            <label htmlFor={`cb-${degree.id}-${item.id}`}>{item.name}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.props.close}>Close</button>
                <button type="button" className="btn btn-success" onClick={this.register}>Register</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-backdrop fade show"></div>
      </>
    )
  }
}

export default RegisterTeacher;

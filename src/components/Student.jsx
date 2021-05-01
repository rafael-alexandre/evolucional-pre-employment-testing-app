import axios from 'axios';
import React from 'react';

class Student extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      student: this.props.student,
      editMode: false,
    }
  }

  edit = () => {
    this.setState({
      editMode: true,
    })
  }

  apply = () => {
    const { student } = this.state

    axios.put(`students/${student.id}`, {
      name: student.name,
      ra: student.ra,
      degreeId: student.degreeId,
      classId: student.classId,
    }).then(({ data }) => {
      this.setState({
        editMode: false,
      })
    })
  }

  handleInput = (e) => {
    const { student } = this.state
    const { name, value } = e.target

    this.setState({
      student: {
        ...student,
        [name]: value,
      },
    })
  }

  handleDegreeInput = (e) => {
    const { student } = this.state
    const { degrees } = this.props

    const degreeId = parseInt(e.target.value)

    this.setState({
      student: {
        ...student,
        degreeId,
        degree: degrees.find(p => p.id === degreeId),
      },
    })
  }

  handleClassInput = (e) => {
    const { student } = this.state
    const { classes } = this.props

    const classId = parseInt(e.target.value)

    this.setState({
      student: {
        ...student,
        classId,
        class: classes.find(p => p.id === classId),
      },
    })
  }

  render() {
    const { student, editMode } = this.state
    const { degrees, classes } = this.props

    return (
      <tr className="table-light">
        <th scope="row">{student?.id}</th>
        <td>
          {editMode ? (
            <input name="name" className="form-control" defaultValue={student.name} onChange={this.handleInput} />
          ) : student?.name}
        </td>
        <td>
          {editMode ? (
            <input name="ra" className="form-control" defaultValue={student.ra} onChange={this.handleInput} />
          ) : student?.ra}
        </td>
        <td>
          {editMode ? (
            <select name="degreeId" className="form-control" defaultValue={student.degreeId} onChange={this.handleDegreeInput}>
              {degrees?.map((item, index) => (
                <option value={item.id} key={index}>{item.name}</option>
              ))}
            </select>
          ) : student?.degree?.name}
        </td>
        <td>
          {editMode ? (
            <select name="classId" className="form-control" defaultValue={student.classId} onChange={this.handleClassInput}>
              {classes?.map((item, index) => (
                <option value={item.id} key={index}>{item.name}</option>
              ))}
            </select>
          ) : student?.class?.name}
        </td>
        <td>
          {editMode ? (
            <button className="btn btn-success" onClick={this.apply}>Apply</button>
          ) : (
            <button className="btn btn-primary" onClick={this.edit}>Edit</button>
          )}
        </td>
      </tr>
    )
  }
}

export default Student;


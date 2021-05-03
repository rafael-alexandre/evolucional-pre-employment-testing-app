import axios from 'axios';
import React from 'react';

class Student extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      relationship: this.props.relationship,
    }
  }

  edit = () => {

  }

  apply = () => {
    const { relationship } = this.state

    axios.put(`relationships/${relationship.id}`, {
      //
    }).then(({ data }) => {
      //
    })
  }

  render() {
    const { relationship } = this.state
    const { degrees, classes } = this.props

    return (
      <tr className="table-light">
        <th scope="row">{relationship?.id}</th>
        <td>{relationship?.teacher?.name}</td>
        <td>{relationship?.matter?.name}</td>
        <td>
          <ul className="teacher-degrees">
            {relationship?.degrees?.map((degree, index) => (
              <li key={index}>
                <button className="btn btn-success btn-sm" onClick={() => this.props.openDegree(degree.degreeId)}>
                  {degrees.find(p => p.id === degree.degreeId).name}
                </button>
                <ul>
                  {degree.classes.map((_class, x) => (
                    <li key={x}>{classes.find(p => p.id === _class.classId)?.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </td>
        <td>
          <button className="btn btn-primary disabled" onClick={this.edit}>Edit</button>
        </td>
      </tr>
    )
  }
}

export default Student;

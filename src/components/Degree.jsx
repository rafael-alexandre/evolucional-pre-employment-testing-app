import axios from 'axios';
import React from 'react';

class Degree extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      page: 1,
      nextPage: false,
      perPage: 10,
    }
  }

  componentDidMount() {
    this.getStudents()
  }

  getStudents = () => {
    const { page, perPage } = this.state
    const { degree } = this.props

    axios.get('students', {
      params: {
        degreeId: degree.id,
        classId: degree.classes,
        _expand: [
          'class',
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

  render() {
    const { degree } = this.props
    const { students, page, nextPage } = this.state

    return (
      <>
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{degree.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.closeDegree}></button>
              </div>

              <div className="modal-body">
                <table className="table mb-0">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col" style={{ width: 100 }}>#</th>
                      <th scope="col">Student</th>
                      <th scope="col">R.A</th>
                      <th scope="col">Class</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students?.length ? students.map((student, index) => (
                      <tr key={index}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.ra}</td>
                        <td>{student.class.name}</td>
                      </tr>
                    )) : (
                      <tr className="table-light">
                        <td colSpan="6" className="text-center">Results not found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.props.closeDegree}>Close</button>

                <div className="d-flex">
                  <button className={'btn btn-' + (page <= 1 ? 'secondary disabled' : 'primary')} onClick={this.prevPage}>Prev</button>
                  <button className={'btn ms-2 btn-' + (nextPage ? 'primary' : 'secondary disabled')} onClick={this.nextPage}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-backdrop fade show"></div>
      </>
    )
  }
}

export default Degree;

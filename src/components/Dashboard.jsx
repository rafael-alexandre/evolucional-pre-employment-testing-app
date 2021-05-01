import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
        {/* <nav className="mb-3">
          <Link className={'btn btn-primary me-2'} to="/students">Students</Link>
          <Link className={'btn btn-primary'} to="/teachers">Teachers</Link>
        </nav> */}

        {this.props.children}
      </div>
    )
  }
}

export default Dashboard;

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="mb-3">
          <Link className={'btn me-2 btn-' + (this.props.location.pathname === '/students' ? 'success disabled' : 'primary')} to="/students">
            <span>Students</span>
          </Link>
          <Link className={'btn btn-' + (this.props.location.pathname === '/teachers' ? 'success disabled' : 'primary')} to="/teachers">
            <span>Teachers</span>
          </Link>
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default withRouter(Dashboard);

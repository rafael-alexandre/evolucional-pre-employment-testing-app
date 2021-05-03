import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <div className="container">
        <nav className="mb-3">
          <Link className={'btn me-2 btn-' + (pathname === '/students' || pathname === '/' ? 'success disabled' : 'primary')} to="/students">
            <span>Students</span>
          </Link>
          <Link className={'btn btn-' + (pathname === '/teachers' ? 'success disabled' : 'primary')} to="/teachers">
            <span>Teachers</span>
          </Link>
        </nav>

        {this.props.children}
      </div>
    )
  }
}

export default withRouter(Dashboard);

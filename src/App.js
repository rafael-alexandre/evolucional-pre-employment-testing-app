import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Students from './screens/Students';
import StudentsRegister from './screens/Students.register';
import Teachers from './screens/Teachers';

function App() {
  return (
    <Router>
      <div style={styles.mainContainer}>
        <div className="container">
          <Switch>
            <Route path="/" exact={true}>
              <Students />
            </Route>
            <Route path="/students" exact={true}>
              <Students />
            </Route>
            <Route path="/students/register" exact={true}>
              <StudentsRegister />
            </Route>
            <Route path="/teachers" exact={true}>
              <Teachers />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

const styles = {
  mainContainer: {
    minHeight: '100vh',
    paddingTop: '4vh',
    paddingBottom: '4vh',
    backgroundColor: '#eee',
  },
}

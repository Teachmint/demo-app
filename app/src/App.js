import './App.css';
// import CreateMeeting from './pages/addMeeting';
// import JoinMeeting from './pages/joinMeeting';
import CreateSession from './pages/createSession';
import JoinSession from './pages/joinSession';
import { Switch, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/navbar';


function App() {
    return (
        <div className="app">
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <CreateSession />
                </Route>
                <Route exact path="/n/:meetingId">
                    <JoinSession />
                </Route>
            </Switch>
        </div>
    );
}

export default App;

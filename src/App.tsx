import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/profile">
          <ProfilePage user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

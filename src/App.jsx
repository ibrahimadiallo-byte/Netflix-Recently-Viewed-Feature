import { useState } from 'react';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <HomePage onSignOut={() => setIsLoggedIn(false)} />
  ) : (
    <LandingPage onSignIn={() => setIsLoggedIn(true)} />
  );
}

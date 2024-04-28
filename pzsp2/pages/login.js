// pages/login.js
import { useState } from 'react';
import Router from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Tutaj zaimplementuj logikę logowania
    // Na przykład wysyłając zapytanie do API
    Router.push('/');
  };

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Nazwa użytkownika:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}

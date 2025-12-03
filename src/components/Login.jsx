import { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Credenciales incorrectas');
    } else {
      setError('');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form className="card login" onSubmit={handleSubmit}>
      <div className="section-header compact">
        <p className="eyebrow">Modo edición</p>
        <h3>Login rápido</h3>
      </div>
      <label htmlFor="username">Usuario</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="carlos"
      />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="1234"
      />
      {error && <p className="error">{error}</p>}
      <button className="btn primary" type="submit">
        Entrar
      </button>
    </form>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;

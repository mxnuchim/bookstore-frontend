import { useState } from 'react';

interface AuthFormProps {
  onClose: () => void;
  type: 'login' | 'signup';
  onLogin?: () => void;
  onSignup?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onClose,
  type,
  onLogin,
  onSignup,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login:', email, password);
    if (!email || !password) return;

    if (onLogin) {
      onLogin();
    }
    onClose();
  };

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signup:', name, email, password);
    if (!name || !email || !password) return;
    if (onSignup) {
      onSignup();
    }
    onClose();
  };

  const isLogin = type === 'login';
  const isSignup = type === 'signup';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login or Signup</h2>

        {isLogin ? (
          <>
            {/* Login Form */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="login-email"
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                className="mt-1 p-2 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : null}

        {isSignup ? (
          <>
            {/* Signup Form */}
            <div className="mt-6">
              <label
                htmlFor="signup-name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="signup-name"
                className="mt-1 p-2 w-full border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                className="mt-1 p-2 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : null}
        <div className="w-full flex flex-row items-center justify-between py-2">
          <button
            className="bg-accent text-white py-2 px-4 rounded-md"
            onClick={isLogin ? handleLogin : handleSignup}
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>

          <div className="cursor-pointer" onClick={onClose}>
            <p className="text-base">Close</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

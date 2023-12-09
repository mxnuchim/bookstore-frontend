import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../data';
import AnimationView from './AnimationView';

interface AuthFormProps {
  onClose: () => void;
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose, type }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      console.log('missing values');
      alert('please enter the required values');
      return;
    }
    // console.log(
    //   `calling login at ${BASE_URL + '/user/login'} with data --> `,
    //   email,
    //   password
    // );
    setLoading(true);

    const { data } = await axios.post(
      BASE_URL + '/user/login',
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response --> ', data);
    if (data.status === 200) {
      alert("You've logged in!");
      sessionStorage.setItem('user', JSON.stringify(data.data));
    }
    setLoading(false);
    onClose();

    onClose();
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      console.log('missing values');
      alert('please enter the required values');
      return;
    }
    // console.log(
    //   `calling signup at ${BASE_URL + '/user/signup'} with data --> `,
    //   name,
    //   email,
    //   password
    // );

    setLoading(true);

    const { data } = await axios.post(
      BASE_URL + '/user/signup',
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response --> ', data);
    if (data.status === 200) {
      alert("You've signed up!");
      sessionStorage.setItem('user', JSON.stringify(data.data));
    }
    setLoading(false);
    onClose();
  };

  const isLogin = type === 'login';
  const isSignup = type === 'signup';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      {loading ? (
        <AnimationView animationType="loading" message="Signing up..." />
      ) : (
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
      )}
    </div>
  );
};

export default AuthForm;

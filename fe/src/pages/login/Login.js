import React, { useEffect, useState } from 'react'
import { AuthNavbar, Feild } from '../../common/components';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../common/apis/users';

const Login = () => {
  const [user, setUserInLocal] = useState({ key: '', password: '' });
  const dispatch = useDispatch();
  const inputChangeHandler = (e) => {
    let { name, value } = e.target;
    if (name === 'email') {
      value = value.toLowerCase();
    }
    setUserInLocal({ ...user, [name]: value });
  }
  const navigate = useNavigate();
  const submitHandler = async () => {
    const { key, password } = user;
    if (key === '' || password === '') {
      // toast('Please fill all the fields', { type: 'error' });
      message.error('Please fill all the fields');
      return;
    }
    dispatch(setLoading(true))
    try {
      const data = await loginUser({ key, password });
      if (data.success) {
        setUserInLocal({ key: '', password: '' });
        // toast('Logged in successfully', { type: 'success' });
        message.success(data.message || 'Logged in successfully');
        // save the token and user in the local storage
        localStorage.setItem('token', data.data);
        if (data.data.role === 'admin' && data.data?.verify?.emailVerified) {
          dispatch(setLoading(false))
          return navigate('/admin');
        }
        dispatch(setLoading(false))
        return navigate('/');
      }
      else {
        dispatch(setLoading(false))
        message.error(data.message);
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error);
      message.error(error.response.data.message || 'Some error occured');
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      return navigate('/');
    }
  }, [navigate]);

  return (
    <AuthNavbar>
      <div className="flex flex-col justify-center items-center pt-12 bg-white lg:px-0 md:px-0 px-4">
        <div className="flex flex-col justify-center items-center border-[1px] border-gray-400 lg:w-[45%] md:w-1/2 w-full gap-2 shadow bg-white p-6 rounded-md">
          <h1 className="text-4xl font-bold p-2">Login</h1>
          <Feild
            name={'key'}
            label={'Email Id or Username'}
            placeHolder='Email or Username'
            value={user.key}
            onKeyUp={(e) => e.key === 'Enter' && submitHandler()}
            onChange={inputChangeHandler} />
          <Feild
            name={'password'}
            label={'Password'}
            type='password'
            placeHolder='Password'
            value={user.password}
            onChange={inputChangeHandler}
            onKeyUp={(e) => e.key === 'Enter' && submitHandler()}
          />
          <div className="flex w-full justify-end">
            <Link to={'/'} className='text-purple-500 font-semibold'>Forgot your password ?</Link>
          </div>
          <button className="bg-purple-500 w-full text-white p-2 rounded focus:border-none focus:outline-none focus:ring-0"
            onClick={() => submitHandler()}
          >
            Login
          </button>
          <p className='font-medium'>Not registered yet ? Start your learning journey by <Link to={'/signup'} className='text-purple-500 font-semibold'>signing up</Link></p>
        </div>
      </div>
    </AuthNavbar>
  )
}

export default Login

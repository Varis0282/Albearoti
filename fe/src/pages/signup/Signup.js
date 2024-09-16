import React, { useEffect, useState } from 'react'
import { AuthNavbar, Feild } from '../../common/components';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loaderReducer';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../common/apis/users';

const SignUp = () => {
  const [user, setUser] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    let { name, value } = e.target;
    if (name === 'email') value = value.toLowerCase();
    setUser({ ...user, [name]: value });
  }

  const submitHandler = async () => {
    if (user.password === '' || user.confirmPassword === '' || user.email === '' || user.firstName === '' || user.lastName === '') {
      message.error('Please fill all the Feilds');
      return;
    }
    if (!passwordMatch) {
      message.error('Password does not match');
      return;
    }
    delete user.confirmPassword;
    dispatch(setLoading(true))
    try {
      const data = await addUser(user);
      if (data.success) {
        setUser({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '', phone: '' });
        // toast('Registered successfully', { type: 'success' });
        message.success('Registered successfully');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      // toast(error?.response?.data?.message || 'Some error occured', { type: 'error' });
      message.error(error?.response?.data?.message || 'Some error occured');
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    if (user.password !== user.confirmPassword) {
      setPasswordMatch(false);
    }
    if (user.password === user.confirmPassword) {
      setPasswordMatch(true);
    }
    if (user.password === '' || user.confirmPassword === '') {
      setPasswordMatch(true);
    }
  }, [user.confirmPassword, user.password]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      return navigate('/');
    }
  }, [navigate]);

  return (
    <AuthNavbar>
      <div className="flex flex-col justify-center items-center pt-12 bg-white lg:px-0 md:px-0 px-4">
        <div className="flex flex-col justify-center items-center border-[1px] border-gray-400 lg:w-[45%] md:w-1/2 w-full gap-2 shadow bg-white p-6 rounded-md">
          <h1 className="text-4xl font-bold p-2">Signup</h1>
          <Feild
            name={'name'}
            label={'Name'}
            type='text'
            placeHolder='Full Name'
            value={user.name}
            onChange={inputChangeHandler}
          />
          <Feild
            name={'userName'}
            label={'User name'}
            type='text'
            placeHolder='username1234'
            value={user.userName}
            onChange={inputChangeHandler}
          />
          <Feild
            name={'email'}
            label={'Email Id'}
            placeHolder='someemail@email.com'
            value={user.email}
            onChange={inputChangeHandler}
          />
          <Feild
            name={'password'}
            label={'Password'}
            type='password'
            placeHolder='*********'
            value={user.password}
            onChange={inputChangeHandler}
          />
          <Feild
            name={'confirmPassword'}
            label={'Confirm Password'}
            type='password'
            placeHolder='*********'
            value={user.confirmPassword}
            onChange={inputChangeHandler}
          />

          {!passwordMatch &&
            <p className='text-red-500 text-[10px] flex items-center gap-2 justify-end w-full font-medium'>
              <i className="fa-solid fa-circle-info"></i>
              Password does not match
            </p>}

          <button className="bg-purple-500 w-full text-white p-2 rounded focus:border-none focus:outline-none focus:ring-0"
            onClick={() => submitHandler()}
          >
            Sign up
          </button>
          <p className='font-medium'>Already registered with us ? Continue your learning journey by <Link to={'/login'} className='text-purple-500 font-semibold'>Loging in</Link></p>
        </div>
      </div>
    </AuthNavbar >
  )
}

export default SignUp

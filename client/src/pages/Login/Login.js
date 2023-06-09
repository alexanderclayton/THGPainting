import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import authServiceInstance from '../../utils/auth';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email address required'),
    password: yup.string().required('Password required'),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [login, { loading, error }] = useMutation(LOGIN_USER);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    const onSubmit = async (values) => {
        console.log(values)
        try {
            const { data } = await login({ 
                variables: { ...values }, 
            });

            authServiceInstance.login(data.login.token);
            // window.location.replace('/userpage');
        } catch (error) {
            console.error('Error logging in:', error)
        }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


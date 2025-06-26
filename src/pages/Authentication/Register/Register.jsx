import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log('User created successfully:', result.user);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h2 className="text-center text-2xl font-bold">Create Account!</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form-control">
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password" {...register("password", { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <span className="error text-red-500">Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="error text-red-500">Password must be at least 6 characters long</span>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p><small>Already Have an Account? <Link to="/login" className="link link-hover">Login</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;
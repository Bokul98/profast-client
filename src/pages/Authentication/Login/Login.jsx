import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-center text-3xl font-bold">Login Here</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" {...register("email")} className="input" placeholder="Email" />

                            <label className="label">Password</label>
                            <input type="password" {...register("password", { required: true, minLength: 6 })} className="input" placeholder="Password" />
                            {errors.password?.type === 'required' && <span className="error text-red-500">Password must be at least 6 characters long</span>}
                            {errors.password?.type === 'minLength' && <span className="error text-red-500">Password is required</span>}

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <div>
                                <button className="w-full btn btn-primary text-black mt-4">Login</button>
                            </div>
                        </fieldset>
                        <p className='mt-4'><small>Don't Have an Account? <a href="/register" className="link link-hover">Register</a></small></p>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
//import React, { Component } from 'react';
import React, { useState } from 'react';

import './App.css';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';

function Login(props) {
	const [ signup, setsignup ] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	});
	const [ signin, setsignin ] = useState({
		email: '',
		password: ''
	});
	const [ isUserExist, setisUserExist ] = useState(false);

	const signUp = (event) => {
		event.preventDefault();
		fetch(`http://localhost:3000/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `first_name=${signup.first_name}&last_name=${signup.last_name}&email=${signup.email}&password=${signup.password}`
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('user logué', data);
				data.isUserExist ? setisUserExist(true) : setisUserExist(false);
			})
			.catch((err) => {
				console.log('erroroooor signup', err);
			});
	};

	const login = (event) => {
		event.preventDefault();
		fetch(`http://localhost:3000/signin?email=${signin.email}&password=${signin.password}`)
			.then((response) => response.json())
			.then((data) => {
				console.log('user logué ?', data);
				data.isUserExist ? setisUserExist(true) : setisUserExist(false);
			})
			.catch((err) => {
				console.log('erroor login');
			});
	};

	if (isUserExist) {
		return <Redirect to="/homePage" />;
	} else {
		return (
			<div className="Login-page">
				{/* SIGN-UP */}
				<div className="Sign">
					<Input
						className="Login-input"
						name="singup.first_name"
						placeholder="arthur"
						onChange={(e) => setsignup({ ...signup, first_name: e.target.value })}
						value={signup.first_name}
					/>
					<Input
						className="Login-input"
						name="signUp_last_name"
						placeholder="Lacapsule"
						onChange={(e) => setsignup({ ...signup, last_name: e.target.value })}
						value={signup.last_name}
					/>
					<Input
						className="Login-input"
						name="signUp_email"
						placeholder="arthur@lacapsule.com"
						onChange={(e) => setsignup({ ...signup, email: e.target.value })}
						value={signup.email}
					/>
					<Input.Password
						className="Login-input"
						name="signUp_password"
						placeholder="password"
						onChange={(e) => setsignup({ ...signup, password: e.target.value })}
						value={signup.password}
					/>
					<Button href="" style={{ width: '80px' }} type="primary" onClick={(e) => signUp(e)}>
						Sign-up
					</Button>
				</div>

				{/* SIGN-IN */}
				<div className="Sign">
					<Input
						className="Login-input"
						name="login_email"
						placeholder="arthur@lacapsule.com"
						onChange={(e) => setsignin({ ...signin, email: e.target.value })}
						value={signin.email}
					/>
					<Input.Password
						className="Login-input"
						name="login_password"
						placeholder="password"
						onChange={(e) => setsignin({ ...signin, password: e.target.value })}
						value={signin.password}
					/>
					<Button href="" style={{ width: '80px' }} type="primary" onClick={(e) => login(e)}>
						Sign-in
					</Button>
				</div>
			</div>
		);
	}
}

export default Login;

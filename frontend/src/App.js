import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// API KEY newsAPI 04a7c7327e6a4bb78b484f0454597596

import './App.css';
import Login from './Login';
import HomePage from './HomePage';
import ThemeArticles from './ThemeArticles';
import MyArticles from './MyArticles';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/HomePage" component={HomePage} />
				<Route path="/ThemeArticles/:id" component={ThemeArticles} />
				<Route path="/ThemeArticles/" component={HomePage} />
				<Route path="/MyArticles" component={MyArticles} />
			</Switch>
		</Router>
	);
}

export default App;

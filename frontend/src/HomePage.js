import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';

import Nav from './Nav';

function HomePage() {
	const [ themesList, setThemesList ] = useState([]);
	useEffect(() => {
		console.log('Dans mon component did mount');
		// Here You need to fetch the data from the news Api
		fetch('https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=04a7c7327e6a4bb78b484f0454597596')
			.then((response) => response.json())
			.then((data) => setThemesList(data.sources));
	}, []);

	return (
		<div>
			<Nav />
			<div className="Banner" />
			<div className="HomeThemes">
				<List
					itemLayout="horizontal"
					dataSource={themesList}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={`/images/${item.category}.png`} />}
								title={
									<Link to={`/ThemeArticles/${item.id}`} key={item.i}>
										{item.name}
									</Link>
								}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
}

export default HomePage;

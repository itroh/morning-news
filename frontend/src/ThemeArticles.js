import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav';
import { connect } from 'react-redux';

const { Meta } = Card;

function ThemesArticles(props) {
	const [ themeArticles, setThemeArticles ] = useState([]);
	const [ modal, setModal ] = useState({
		visible: false,
		title: '',
		content: ''
	});

	const showModal = (title, content) => {
		setModal({
			visible: true,
			title: title,
			content: content
		});
	};

	const handleOk = (e) => {
		console.log(e);
		setModal({ visible: false });
	};

	const handleCancel = (e) => {
		console.log(e);
		setModal({ visible: false });
	};

	useEffect(
		() => {
			console.log(props);
			var source = props.match.params.id;
			fetch(
				`https://newsapi.org/v2/top-headlines?language=fr&sources=${source}&apiKey=04a7c7327e6a4bb78b484f0454597596`
			)
				.then((response) => response.json())
				.then((data) => setThemeArticles(data.articles));
		},
		[ props ]
	);

	var articlesList = themeArticles.map((article, index) => {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }} key={index}>
				<Card
					style={{
						width: 300,
						margin: '15px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between'
					}}
					cover={<img alt="example" src={article.urlToImage} />}
					actions={[
						<Icon
							type="read"
							key="ellipsis2"
							onClick={() => showModal(article.title, article.description)}
						/>,
						<Icon type="like" key="ellipsis" onClick={() => props.saveArticle(article)} />
					]}
				>
					<Meta title={article.title} description={article.description} />
				</Card>
			</div>
		);
	});
	return (
		<div>
			<Nav />
			<div className="Banner" />
			<div className="Card">{articlesList}</div>
			<Modal title={modal.title} visible={modal.visible} onOk={handleOk} onCancel={handleCancel}>
				<p>{modal.content}</p>
			</Modal>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		saveArticle: function(article) {
			dispatch({ type: 'SAVE', articleLiked: article });
		}
	};
}

export default connect(null, mapDispatchToProps)(ThemesArticles);

import React, { useState } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav';
import { connect } from 'react-redux';

const { Meta } = Card;

function MyArticles(props) {
	//const [ themeArticles, setThemeArticles ] = useState([]);
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

	console.log('toto', props.articlesList);

	let myArticlesList = props.articlesList.map((article, index) => {
		return (
			<div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
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
						<Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)} />,
						<Icon type="delete" key="ellipsis" onClick={() => props.deleteArticle(index)} />
					]}
				>
					<Meta title={article.title} description={article.description} />
				</Card>

				<Modal title={modal.title} visible={modal.visible} onOk={handleOk} onCancel={handleCancel}>
					<p>{modal.content}</p>
				</Modal>
			</div>
		);
	});

	return (
		<div>
			<Nav />
			<div className="Banner" />
			<div className="Card">{props.articlesList.length < 1 ? 'No article' : myArticlesList}</div>
		</div>
	);
}

function mapStateToProps(state) {
	return { articlesList: state.articlesList };
}
function mapDispatchToProps(dispatch) {
	return {
		deleteArticle: function(num) {
			dispatch({ type: 'DELETE', index: num });
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);

import React from 'react';

export default function(articlesList = [], action) {
	console.log('action redux : ', action);

	if (action.type == 'SAVE') {
		var copyList = [ ...articlesList ];
		copyList.push(action.articleLiked);
		return copyList;
	} else if (action.type == 'DELETE') {
		var copyList = [ ...articlesList ];
		copyList.splice(action.index, 1);
		return copyList;
	} else {
		return articlesList;
	}
}

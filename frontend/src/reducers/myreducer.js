export default function(articlesList = [], action) {
	console.log('action redux : ', action);
	var copyList = [ ...articlesList ];
	if (action.type === 'SAVE') {
		copyList.push(action.articleLiked);
		return copyList;
	} else if (action.type === 'DELETE') {
		copyList.splice(action.index, 1);
		return copyList;
	} else {
		return articlesList;
	}
}

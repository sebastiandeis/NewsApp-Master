import { firestoreDB } from './firebase';
import { get_today_string } from '../utility/utils';
import { news_type } from '../config/newstype';


const PAGE_SIZE	= 20;

function getNewsTypeName(newsType) {
    let newstype = news_type.find(item => item.value === newsType);
    if (newstype) {
        return newstype.name;
    }
    return null;
}

export const GetNewsArticles = (source) => {
	return new Promise((resolve, reject) => {
		let crawl_date = get_today_string();
		let newsType = getNewsTypeName(source.type);
		let newsRef = firestoreDB.collection('News');
		newsRef
			.where('source', '==', source.label)
			.where('crawl_date', '==', crawl_date)
			.where('type', '==', newsType)
			.orderBy('published', 'desc')
			.orderBy('nid')
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					resolve(null);
				}  
			
				let result = [];
				snapshot.forEach(doc => {
					result.push(doc.data())
				});
				resolve(result);
			})
			.catch(err => {
				reject(`Error: ${err}`);
			});
	});
}

export const GetNewsArticle = (nid) => {
	return new Promise((resolve, reject) => {
		let docRef = firestoreDB.collection('News').doc(nid);
		docRef.get()
			.then(doc => {
				resolve(doc.data());
			})	
			.catch(err => {
				reject(`Error: ${err}`);
			});
	});
}

export const GetNewsFirstPage = () => {
	return new Promise((resolve, reject) => {
		let crawl_date = get_today_string();
		let first = firestoreDB.collection('News')
							.where('crawl_date', '==', crawl_date)
							.orderBy('nid')
							.limit(PAGE_SIZE);
	  
		first.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					resolve(null);
				}  
			
				let result = [];
				snapshot.forEach(doc => {
					result.push(doc.data())
				});

				// Get the last document
				let last = snapshot.docs[snapshot.docs.length - 1];
				let last_id = last.data().nid;
				resolve({
					articles: result,
					last: last_id
				});			
			})
			.catch(err => {
				reject(`Error: ${err}`);
			});			
		});
}

export const GetNewsNextPage = (lastid) => {
	return new Promise((resolve, reject) => {
		let crawl_date = get_today_string();
		let next = firestoreDB.collection('News')
							.where('crawl_date', '==', crawl_date)
							.orderBy('nid')
							.startAfter(lastid)
							.limit(PAGE_SIZE);							
	  
		next.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					resolve(null);
				}  
			
				let result = [];
				snapshot.forEach(doc => {
					result.push(doc.data())
				});

				// Get the last document
				let last = snapshot.docs[snapshot.docs.length - 1];
				let last_id = last.data().nid;
				resolve({
					articles: result,
					last: last_id
				});			
			})
			.catch(err => {
				reject(`Error: ${err}`);
			});			
		});
}

export const GetRedditPosts = (source) => {
	return new Promise((resolve, reject) => {
		let crawl_date = get_today_string();
		let redditRef = firestoreDB.collection('Reddit');
		redditRef
			.where('source', '==', source.label)
			.where('crawl_date', '==', crawl_date)
			.orderBy('created', 'desc')
			.orderBy('rid')
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					resolve(null);
				}  
			
				let result = [];
				snapshot.forEach(doc => {
					result.push(doc.data())
				});
				resolve(result);
			})
			.catch(err => {
				reject(`Error: ${err}`);
			});
	});
}

export const GetRedditPost = (rid) => {
	return new Promise((resolve, reject) => {
		let docRef = firestoreDB.collection('Reddit').doc(rid);
		docRef.get()
			.then(doc => {
				resolve(doc.data());
			})	
			.catch(err => {
				reject(`Error: ${err}`);
			});
	});
}

export const GetRedditFirstPage = () => {
	return new Promise((resolve, reject) => {
		let crawl_date = get_today_string();
		let first = firestoreDB.collection('Reddit')
							.where('crawl_date', '==', crawl_date)
							.orderBy('rid')
							.limit(PAGE_SIZE);
	  
		first.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					resolve(null);
				}  
			
				let result = [];
				snapshot.forEach(doc => {
					result.push(doc.data())
				});

				// Get the last document
				let last = snapshot.docs[snapshot.docs.length - 1];
				let last_id = last.data().rid;
				resolve({
					articles: result,
					last: last_id
				});			
			})
			.catch(err => {
				reject(`Error: ${err}`);
			});			
		});
}

export const GetRedditNextPage = (lastid) => {
	return new Promise((resolve, reject) => {
		let crawl_date = get_today_string();
		let next = firestoreDB.collection('Reddit')
							.where('crawl_date', '==', crawl_date)
							.orderBy('rid')
							.startAfter(lastid)
							.limit(PAGE_SIZE);							
	  
		next.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					resolve(null);
				}  
			
				let result = [];
				snapshot.forEach(doc => {
					result.push(doc.data())
				});

				// Get the last document
				let last = snapshot.docs[snapshot.docs.length - 1];
				let last_id = last.data().rid;
				resolve({
					articles: result,
					last: last_id
				});			
			})
			.catch(err => {
				reject(`Error: ${err}`);
			});			
		});
}
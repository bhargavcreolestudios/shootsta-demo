import axios from 'axios'

const url = process.env.REACT_APP_TARGET_URL

// get videos list from server
export function getVideos(){
	const promise = new Promise((res, rej) => {
		axios.get(url).then((data) => {
			res(data)
		}).catch((error) => {
			rej(error)
		}); 
	})
	return promise;
}

// upload video to the server
export function uploadVideo(video){
	//  converting it to form data
	let formdata = new FormData()
	formdata.set('video', video);
	const promise = new Promise((res, rej) => {
		var options = { headers: {  "content-type": "multipart/form-data"}};
		axios.post(`${url}/upload`, formdata, options).then((data) => {
			res(data)
		}).catch((error) => {
			console.log(error);
			rej(error)
		}); 
	})
	return promise;
}
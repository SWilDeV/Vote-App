import axios from "axios";

const url = "http://localhost:3000/api/votes/";
const url2 = "http://localhost:3000/api/count/";

/* eslint-disable no-async-promise-executor */

class APIService {
	// get votes
	static getVotes() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url2);
				const data = res.data;
				resolve(
					data.map((post) => ({
						...post,
					}))
				);
			} catch (err) {
				reject(err);
			}
		});
	}
	//Create Vote
	static insertVote(text) {
		return axios.post(url, {
			text,
		});
	}
}

export default APIService;

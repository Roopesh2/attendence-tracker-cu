import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import FirebaseApp from "./firebase";
import { USER_DIR } from "./consts";

const db = getFirestore(FirebaseApp);
const user = "user_id";



export async function getSubjects(callback) {
	const docRef = doc(db, USER_DIR, user);
	try {
		let docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			callback(JSON.parse(data.subject_list));
		} else {
			console.error("subject list not exists");
		}
	} catch (err) {
		console.error("cannot fetch subject list");
	}
}

export async function getAttendenceData(callback) {
	const querySnap = await getDocs(collection(db, USER_DIR, user, "absents"));
	const obj = {};
	try {
		querySnap.forEach((doc) => {
			obj[doc.id] = {
				subject: doc.id,
				data: doc.data()
			};
		});
		callback(obj)
	} catch (error) {
	}
}

let absents = [
	{
		date: new Date("2024-01-02"),
		i: 5
	},
	{
		date: new Date("2024-01-15"),
		i: 0
	},
	{
		date: new Date("2024-02-23"),
		i: 2
	},
	{
		date: new Date("2024-03-15"),
		i: 1
	},
	{
		date: new Date("2024-04-30"),
		i: 0
	},
	{
		date: new Date("2024-04-30"),
		i: 1
	},
]

/**
 * @typedef {Object} Inst
 * @property {Date} date
 * @property {number} i
 */

/**
 * 
 * @param {Array<Inst>} insts 
 */
export function compressAttendenceData(insts) {
	let stream = "";
	for (let inst of insts) {
		let [yy, mm, dd] = inst.date.toISOString().split("-");
		dd = dd.substring(0, 2);
		yy = yy.substring(2, 4);
		stream += parseInt(yy + mm + dd + inst.i) + " "
	}
	return stream.trimEnd();
}

/**
 * @param {string} strData 
 * @returns {Array<Inst>}
 */
export function extractAttendenceData(strData) {
	let insts = strData.split(" ");
	let converted = [];
	for (let inst of insts) {
		let date = inst.substring(0, 6);
		let index = inst.substring(6);

		let yyyy = "20" + date.substring(0, 2),
			mm = date.substring(2, 4),
			dd = date.substring(4, 6);
		converted.push({
			date: new Date(yyyy + '-' + mm + '-' + dd),
			i: index,
		});
	}
	return converted;
}

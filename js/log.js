// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyBE_mJcItNWOnwomCBs_TdaCYY0OpOlFrQ",
	authDomain: "diablo73-github.firebaseapp.com",
	databaseURL: "https://diablo73-github.firebaseio.com",
	projectId: "diablo73-github",
	storageBucket: "diablo73-github.appspot.com",
	messagingSenderId: "1021897007435",
	appId: "1:1021897007435:web:4b9e2de825564398e108ce",
	measurementId: "G-VSN2YNE31J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const settings = {};
db.settings(settings);

function loginreg() {
	pnum = document.getElementById("pnum").value;
	pass = document.getElementById("pass").value;
	nick = document.getElementById("nick").value;
	
	if (pnum.length < 10) {
		console.log("Enter your phone number 10 digits long you idiot.......");
		alert("Enter your phone number 10 digits long!!!");
	}
	else if (pass.length < 8) {
		console.log("Enter your password 8 characters long you idiot.......");
		alert("Enter your password 8 characters long!!!");
	}
	else if (confirm("Login with -\t" + pnum + "\t?")) {
		selfdocRef = db.collection("messages").doc(pnum);
		
		selfdocRef.get().then(function(doc) {
			if (doc.exists) {
				var r = doc.data();
				if (pass === r["pass"]) {
					console.log("Password Match... You may go...");
					afterlog();
					listfrn();
				}
				else {
					console.log("Wrong password you idiot.......");
					alert("Wrong password!!!");
				}
			}
			else {
				if (nick && confirm("Register with -\t" + pnum + "\t" + nick + "\t?")) {
					db.collection("messages").doc(pnum).set({
						pass: pass,
						nic: nick
					});
					console.log("Registered.......");
					afterlog();
					listfrn();
				}
				else {
					alert("What do you want you idiot.......");
				}
			}
		}).catch(function(error) {
		console.log("Error getting document:", error);
		});
	}
}

function addfrnfun() {
	addpnum = document.getElementById("addpnum").value;
	addnick = document.getElementById("addnick").value;
	
	if (addpnum.length < 10) {
		console.log("Enter a phone number 10 digits long to add you idiot.......");
		alert("Enter your phone number 10 digits long!!!");
	}
	else if (!addnick) {
		console.log("Enter nickname to add you idiot.......");
		alert("Enter your password!!!");
	}
	else {
		document.getElementById("addpnum").value = "";
		document.getElementById("addnick").value = "";
		
		selfdocRef.get().then(function(doc) {
			var r = doc.data()[addpnum];
			if (r) {
				r[1] = addnick;
				selfdocRef.update({
					[addpnum]: r
				});
				console.log("Friend nick updated.......");
			}
			else {
				selfdocRef.update({
					[addpnum]: [0, addnick]
				});
				console.log("Friend added.......");
			}
		});
	}
	setTimeout(listfrn, 3000);
}
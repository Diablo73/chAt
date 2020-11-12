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
	pnum = "+91" + document.getElementById("pnum").value;
	pass = document.getElementById("pass").value;
	otp6 = document.getElementById("otp6").value;
	
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
				window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptchadiv");
				recaptchaVerifier.render();
				document.getElementById("otpdiv").style.display = "block";
			}
		}).catch(function(error) {
		console.log("Error getting document:", error);
		});
	}
}

function addfrnfun() {
	addpnum = "+91" + document.getElementById("addpnum").value;
	addnick = document.getElementById("addnick").value;
	
	if (addpnum.length < 10) {
		console.log("Enter a phone number 10 digits long to add you idiot.......");
		alert("Enter your phone number 10 digits long!!!");
	}
	else if (!addnick) {
		console.log("Enter nickname to add you idiot.......");
		alert("Enter a nickname!!!");
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

function sendotp() {
	firebase.auth().signInWithPhoneNumber(pnum, recaptchaVerifier).then(function (confirmationResult) {
		// SMS sent. Prompt user to type the code from the message, then sign the
		// user in with confirmationResult.confirm(code).
		window.confirmationResult = confirmationResult;
		coderesult = confirmationResult;
		console.log("OTP sent!!!!!!!");
	}).catch(function (error) {
		// Error; SMS not sent
		console.log("SMS not sent : " + error);
	});
}

function checkotp() {
	otp6 = document.getElementById("otp6").value;
	console.log(otp);

	coderesult.confirm(otp).then(function(result) {
		console.log("Registered.......");
		console.log(result);
		registerreg();
	}).catch(function(error) {
		document.getElementById("otp6").value = "";
		document.getElementById("otp6").placeholder = "Invalid code! Try Again.......";
		console.log(error);
	});
}

function registerreg() {
	db.collection("messages").doc(pnum).set({
		pass: pass,
	});
	console.log("Registered.......");
	afterlog();
	listfrn();
}
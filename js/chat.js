function sendmes() {
	var smes = document.getElementById("chatbox").value;
	document.getElementById("chatbox").value = "";
	if (smes) {
		htmlsmes = '<div style="color: #0ee088; font-family: calibri; font-size: 16px; float: right; display: inline-block; padding: 3px 20px; border-style: solid; border-width: 3px; border-color: #0ee088; border-radius: 10px; word-wrap: break-word;">' + smes + '</div><br><br>';
		chatpage = document.getElementById('friendchat');
		pages[frn] += htmlsmes;
		chatpage.srcdoc = pages[frn];
		selfdocRef.get().then(function(doc) {
			r = doc.data()[frn];
			r[0] += 1;
			r.push(smes);
			selfdocRef.update({
				[frn]: r
			});
		}).catch(function(error) {
		console.log("Error getting document:", error);
		});
	}
	setTimeout(scrolldown, 50);
}

function recmes() {
	frndocRef.get().then(function(doc) {
		if (doc.exists) {
			s = doc.data()[pnum];
			for (var i = 2; i <= s[0] + 1; i++) {
				htmlrmes = '<div style="color: #33ccbb; font-family: calibri; font-size: 16px; float: left; display: inline-block; padding: 3px 20px; border-style: solid; border-width: 3px; border-color: #33ccbb; border-radius: 10px; word-wrap: break-word;">' + s[i] + '</div><br><br>';
				chatpage = document.getElementById("friendchat");
				pages[frn] += htmlrmes;
				chatpage.srcdoc = pages[frn];
				setTimeout(scrolldown, 100);
			}
			frndocRef.update({
				[pnum]: [0, s[1]]
			});
		}
	}).catch(function(error) {
	console.log("Error getting document:", error);
	});
}

function scrolldown() {
	var innerFrame = document.getElementById("friendchat").contentWindow;
	innerFrame.scroll(0, 9999999);
}

function listfrn() {
	document.getElementById("friendlist").innerHTML = "";
	selfdocRef.get().then(function(docs) {
		if (docs.exists) {
			r = docs.data();
			for (var key in r) {
				if (key === "pass" || key === "nic") {
					continue;
				}
				htmlfrns = '<button id="button' + key + '" class="button" onclick="selfrn(this.value)" value="' + key + '">' + r[key][1] + ' - ' + key + '</button><br><br>';
				document.getElementById("friendlist").innerHTML += htmlfrns;
				pages[key] = "";
				console.log("Friend = " + key);
			}
		}
	});
}

function selfrn(f) {
	clearInterval(inter);
	if (firstfrn) {
		document.getElementById("button" + firstfrn).style.transform = "translateX(0px)";
	}
	document.getElementById("button" + f).style.transform = "translateX(50px)";
	firstfrn = f;
	
	console.log("Selected friend = " + f);
	document.getElementById("chatbox").disabled = false;
	document.getElementById("chatbox").placeholder = "Your chAt is ON.......";
	frndocRef = db.collection("messages").doc(f);
	frn = f;
	chatpage = document.getElementById("friendchat");
	chatpage.srcdoc = pages[frn];
	//console.log(pages);
	
	inter = setInterval(recmes, 5000);
}

chatpage = document.getElementById("friendchat");
pages = {};
firstfrn = "";
inter = "";
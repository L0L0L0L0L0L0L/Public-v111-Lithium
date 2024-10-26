/*
	名字:	密碼認證
	地圖:	閒人勿入
	描述:	261020401
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.sendNext("Hurry hurry. If you aren't ready to memorize it, at least bring out a pen and a paper!");
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Oh, you're here! Good thing, because l, Parwen, have found the master key that will allow you to enter the Secret Passage! Isn't it great? Tell me Parwen is great!");
		break;
	case 1:
		qm.sendAcceptDecline("Now, the passcode is very long and complex, so I suggest you write it down somewhere. I'm only going to tell you this once, okay? Are you ready?");
		break;
	case 2:
		pass = generateString();
		Packages.server.quest.MapleQuest.getInstance(3360).forceStart(qm.getPlayer(), qm.getNpc(), pass);
		qm.sendOk("The passcode is #b" +pass + "#k. You didn't forget it, did you? Enter this passcode at the entrance of Secret Passage, and you will have unlimited access to it.");
		break;
	case 3:
		qm.dispose();
}
}

function generateString() {
	var thestring = "";
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var rnum;
	for (var i = 0; i < 10; i++) {
	rnum = Math.floor(Math.random() * chars.length);
	thestring += chars.substring(rnum, rnum+1);
	}
	return thestring;
}
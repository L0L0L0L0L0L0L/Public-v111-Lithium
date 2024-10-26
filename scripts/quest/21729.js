/*
	名字:	第四個情報收集完成
	地圖:	奇幻村
	描述:	105000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendAcceptDecline("Come to think of it, I remember seeing that kid scribbling something on the wall. I was about to yell at the kid, but Chrishrama beat me to it. I tried to see what the kid was writing, but I couldn't see it. Do you think it was the #bpassword#k...?");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(21729).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("That just about does it for eliminating #o2230101#s. I'm sure there are other violent monsters out there, but I'm inspired by your courage. Please give my thanks to #p1002104# as well.", 9);
		break;
	case 2:
		qm.sendPrevS("#b(You think there's the password in #p1061006# that leads to the Puppeteer's Cave. Should you attack the puppeteer as soon as you find out the password? No, you'll find out what it is and inform #p1002104# first.)", 2);
		break;
	case 3:
		qm.dispose();
}
}
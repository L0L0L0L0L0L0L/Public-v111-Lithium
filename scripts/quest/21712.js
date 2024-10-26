/*
	名字:	完成首次情報收集
	地圖:	弓箭手村
	描述:	100000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 1) {
		qm.sendNext("You still don't understand what's going on? I'll explain it to you again if you talk to me one more time.");
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
		qm.sendNext("#t4032315#... #rThis puppet is making a strange noise#k. You can't hear it with your ears, of course, since it can only be heard by the #o1210102#s. I believe it's this noise that changed the personality of the #o1210102#s.");
		break;
	case 1:
		qm.sendAcceptDecline("The #o1210102#s that have been affected by the noise have turned cynical. They've started fighting the non-affected #o1210102#s, which has made all #o1210102#s prepare for combat. #bThe reason for all these changes in the #o1210102#s is this puppet#k! Do you understand?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21712).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("I wonder what triggered this in the first place. There is no way this puppet was naturally created, which means someone planned this. I should keep an eye on the #o1210102#s.", 9);
		break;
	case 3:
		qm.sendPrevS("#b(You were able to find out what caused the changes in the #o1210102#s. You should report to #p1002104# and deliver the information you've gathered.)", 2);
		break;
	case 4:
		qm.dispose();
}
}
/*
	名字:	第二個情報收集結束
	地圖:	魔法森林
	描述:	101000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("What? I don't think there are any suspects besides that kid. Please think again.");
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
		qm.sendNextS("What did #p1032112# say?", 8);
		break;
	case 1:
		qm.sendNextPrevS("#b(You tell her what #p1032112# observed.)");
		break;
	case 2:
		qm.sendAcceptDecline("A kid with a puppet? That seems very suspicious. I am sure that kid is the reason the Green Mushrooms have suddenly turned violent.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(21716).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("How dare this kid wreak havoc in the South Forest. Who knows how long it will take to restore the forest... I'll have to devote most of my time cleaning up the mess.", 9);
		break;
	case 4:
		qm.sendPrevS("#b(You were able to find out what caused the changes in the Green Mushrooms. You should report to #p1002104# and deliver the information you've collected.)", 2);
		break;
	case 5:
		qm.dispose();
}
}
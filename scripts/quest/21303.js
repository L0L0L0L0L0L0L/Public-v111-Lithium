/*
	名字:	與雪吉拉的友情
	地圖:	像刀刃的絕壁
	描述:	914022100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("No... #p1203001# is going to cry... going to cry loudly... going to cry until you agree to find gem!");
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
		qm.sendNextS("*Sob sob* #p1203001# is sad. #p1203001# is mad. #p1203001# cries. *Sob sob*", 8);
		break;
	case 1:
		qm.sendNextPrevS("Wh...What's wrong?", 2);
		break;
	case 2:
		qm.sendNextPrevS("#p1203001# made gem. #bGem as red as apple#k. But #rthief#k stole gem. #p1203001# no longer has gem. #p1203001# is sad...", 8);
		break;
	case 3:
		qm.sendNextPrevS("A thief stole your red gem?", 2);
		break;
	case 4:
		qm.sendAcceptDecline("Yes, #p1203001# wants gem back. #p1203001# reward you if you find gem. Catch thief and you get reward.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(21303).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("The thief went that way! Which way? Hold on...eat with right hand, not left hand... #bLeft#k! He went left! Go left and you find thief.");
		break;
	case 6:
		qm.dispose();
}
}
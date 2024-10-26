/*
	名字:	瓦蕾莉的危險忠心2
	地圖:	鯨魚號碼頭
	描述:	120000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
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
		qm.sendNext("What? He wasn't afraid of those nasty, wriggly Cool Jellyfish Bodies? Bleh!\r\nOkay, I'll guess you'll have to try harder. How about you get some #r#t4033014#s#k to show to the Prince?");
		break;
	case 1:
		qm.sendAcceptDecline("If you accept, I'll send you to face the worst of the Ghost Stumps. We'll show Prince Sharyl... He won't be able to sleep for WEEKS when we're done with him!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(2928).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(912040400), qm.getMap(912040400).getPortal(1));
		qm.dispose();
}
}
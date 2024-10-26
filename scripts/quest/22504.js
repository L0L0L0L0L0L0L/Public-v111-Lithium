/*
	名字:	好吃的牛奶1
	地圖:	農場中心地
	描述:	100030300
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("No use trying to find an answer to this on my own. I'd better look for #bsomeone older and wiser than master#k!");
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
		qm.sendNext("Ugh. This isn't going to work. I need something else. No plants. No meat. What, you have no idea? But you're the master, and you're older than me, too. You must know what'd be good for me!");
		break;
	case 1:
		qm.sendNextPrevS("#bBut I don't. It's not like age has anything to do with this...", 2);
		break;
	case 2:
		qm.sendAcceptDecline("Since you're older, you must be more experienced in the world, too. Makes sense that you'd know more than me. Oh, fine. I'll ask someone who's even older than you, master!");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(22504).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOkS("#b(You already asked Dad once, but you don't have any better ideas. Time to ask him again!)", 2);
		break;
	case 4:
		qm.dispose();
}
}
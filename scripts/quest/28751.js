/*
	名字:	加滿油
	地圖:	外星人基地走廊
	描述:	610040010
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
		qm.sendYesNo("This must be the Roborider! It looks oddly familiar. I wonder if some OTHER aliens left it here! We have really got to stop getting invaded by aliens. Aww, it's out of gas! But... #b#p9201050##k said the aliens were mining for fuel here. Maybe I can find something around this place that would do the trick!");
		break;
	case 1:
		qm.sendNextS("(Maybe these. They're all over the place.", 3);
		break;
	case 2:
		qm.sendNextPrevS("(Alien scouts! My attacks won't do a thing to them! I have to be sneaky!", 3);
		break;
	case 3:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28751)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28751)), true);
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Avoid the Alien Scouts and gather 5 pieces of ore from around the map to use as fuel."));
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNextS("All fueled up! How in the world do you turn this thing on?", 3);
		break;
	case 1:
		qm.sendNextPrevS("Why doesn't the switch-- aww, man! I need a key!", 3);
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(28751).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(4033193, -5);
		qm.dispose();
}
}
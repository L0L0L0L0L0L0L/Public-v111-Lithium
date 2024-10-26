/*
	名字:	黑暗魔女洞穴
	地圖:	黑暗魔女的洞穴
	描述:	924010000
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
		qm.sendAcceptDecline("#b(A crystal ball is placed at the center of the cave. It's so dark inside that it's barely visible. Let's get up close and see what it looks like.)");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20405).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20405));
		qm.sendOk("#b(As soon as I touch the crystal, a rough, raspy voice entered.) This is Dunamis. I was unable to spot the origin of the curse, but I did find the device used for it, so I'm sending it straight to Ereve. I'm leaving this message in case a Knight is sent here to search for items. You may now return to Ereve.");
		break;
	case 2:
		qm.dispose();
}
}
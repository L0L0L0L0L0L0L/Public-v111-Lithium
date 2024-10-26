

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendOk("I may be sending you into danger. He will most likely attack anyone who comes near the Audience Room. I'm sorry...");
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
		qm.sendNext("For hundreds of years, I have watched this castle crumble, stone by stone. Once, it was a place of beauty and glory. The sight of it would always warm my heart...");
		break;
	case 1:
		qm.sendNextPrev("And I would say much the same of our king, Leon. He was a master swordsman, strong of arm and warm of heart. His words were few, but his works of kindness spoke for him, #bsang#k for him. How could he have changed so much?");
		break;
	case 2:
		qm.sendYesNo("What has the #rBlack Mage#k done to him?! H-Has he forgotten about me? Please, speak to Leon for me.");
		break;
	case 3:
		qm.sendNext("He has not answered my calls, but I am certain that he sulks in the #bAudience Room#k. Please find out if #bLeon#k remembers me, or if he chooses to ignore me. I will send you to the #m211070200#k.");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(3173).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(211070200), qm.getMap(211070200).getPortal(3));
		qm.dispose();
}
}
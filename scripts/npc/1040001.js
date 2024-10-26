/*
	名字:	麥克
	地圖:	奇幻村
	描述:	105000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2048)).getStatus() != 1) {
			cm.sendOk("This is a dangerous place. Do be careful...");
			cm.dispose();
			return;
			}
			cm.sendNext("Hmmm... so you want to know how to get #bPiece of Ice#k, #bAncient Scroll#k, and #bFlaming Feather#k? What do you plan on doing with those precious materials? I've heard about those, since I studied the island a bit before doing my work now as a guard...");
			break;
	case 1:
		cm.sendNextPrev("#bPiece of Ice#k, #bAncient Scroll#k, and #bFlaming Feather#k... those items should be available around the island. If you're looking for an Ancient Scroll, I was told that the ancient magicians used them to create the Golems. Perhaps they'd have it...");
		break;
	case 2:
		cm.sendNextPrev("A #bPiece of Ice#k that never melts... The fairies had them... I hear Ice Drakes have them too...");
		break;
	case 3:
		cm.sendNextPrev("#bFlaming Feather#k ... I've heard of that, a feather-resembling flame ... it has something to do with a flame-blowing dragon or something ... anyway it's unbelievably vicious, so it'll be difficult for you to take Flaming Feather away from it. Good luck.");
		break;
	case 4:
		cm.sendPrev("This is a dangerous place. Do be careful...");
		break;
	case 5:
		cm.dispose();
}
}
/*
	名字:	被破壞的弓箭手村
	地圖:	被破壞的弓箭手村
	描述:	271010000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		ms.dispose();
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31102)).getStatus() != 2 || ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31103)).getStatus() > 0) {
			ms.dispose();
			return;
			}
			ms.sendNextS("Who are you? I've never seen you before. Where did you come from?", 5, 2142003);
			break;
	case 1:
		ms.sendNextPrevS("Aren't you...Big Headward? The hair stylist?!\r\n(The size of his head certainly hasn't changed...) I-I'm no one suspicious...", 17);
		break;
	case 2:
		ms.sendNextPrevS("How'd you know I used to be a hair stylist? In any case,\r\nlet's go see Chief Alex.", 5, 2142003);
		break;
	case 3:
		ms.sendNextPrevS("Chief Alex?\r\n(It couldn't be that kid, could it?)", 17);
		break;
	case 4:
		ms.sendNextPrevS("Hurry up! Move!!", 5, 2142003);
		break;
	case 5:
		ms.dispose();
		Packages.server.quest.MapleQuest.getInstance(31103).forceStart(ms.getPlayer(), 0, null);
		ms.getPlayer().changeMap(ms.getMap(271010000), ms.getMap(271010000).getPortal(2));
}
}
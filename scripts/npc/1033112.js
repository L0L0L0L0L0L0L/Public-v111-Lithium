/*
	名字:	神秘的傳送點
	地圖:	櫻花處
	描述:	101050000
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
		if (type == 2) {
		cm.sendNext("(You still have unfinished business here...)");
		cm.dispose();
		return;
		}
		if (status < 1) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24058)).getStatus() == 1 ? 1 : cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24067)).getStatus() == 1 ? 2 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("(If you don't have any business in Elluel, you can take this Meso-powered Mysterious Portal to other towns for 2000 Mesos a trip. Where to?) \r\n#b#L101000000#Ellinia#l\r\n#L100000000#Henesys#l\r\n#L102000000#Perion#l\r\n#L103000000#Kerning City#l");
		break;
	case 1:
		if (cm.getPlayer().getMeso() < 2000) {
			cm.sendNext("(You don't have enough Mesos...)");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(selection), cm.getMap(selection).getPortal(0));
			cm.gainMeso(-2000);
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("(If you're done in Elluel, you can reach other towns through the Mysterious Portal. Perhaps you should head to the Rugged Rocky Zone, where Winston is.)");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(102020400), cm.getMap(102020400).getPortal(1));
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("(If you don't have any business in Elluel, you can take this Mysterious Portal to other towns. Where to?) \r\n#b#L101000000#Ellinia#l\r\n#L100000000#Henesys#l\r\n#L102000000#Perion#l\r\n#L103000000#Kerning City#l");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(selection), cm.getMap(selection).getPortal(0));
		cm.dispose();
}
}
/*
	名字:	雷德拓
	地圖:	埃德爾斯坦臨時機場
	描述:	310000010
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
		return;
	case 0:
		if (status < 3) {
		cm.dispose();
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
		cm.sendSimple("Would you like to leave Edelstein and travel to a different continent? I can take you to Victoria Island and the Orbis area of Ossyria. The cost is 800 Mesos. It takes about 30 seconds to arrive. Where would you like to go? \r\n#L0##bVictoria Island#l\r\n#L1#Orbis#l");
		break;
	case 1:
		if (cm.getPlayer().getSkillLevel(80001027) != 1 && cm.getPlayer().getSkillLevel(80001028) != 1) {
		if (cm.getPlayer().getMeso() < 800) {
			cm.sendNext("Hey, you don't have enough money. It's not even that expensive! Go kill some monsters and get some money.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(selection < 1 ? 200090710 : 200090610), cm.getMap(selection < 1 ? 200090710 : 200090610).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(cm.getPlayer().getMap().getId() == 200090710 ? 104020130 : 200000170));
			cm.gainMeso(-800);
			cm.dispose();
			return;
			}
			select = selection;
			cm.sendSimple("Do you have an airplane? Airplanes can take you to other continents, without needing to wait for a ship. Of course, it costs 5,000 Mesos, but you're paying for convenience! \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#l\r\n#L1##bBoard a ship.#l");
			break;
	case 2:
		if (selection == 1) {
		if (cm.getPlayer().getMeso() < 800) {
			cm.sendNext("Hey, you don't have enough money. It's not even that expensive! Go kill some monsters and get some money.");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(select < 1 ? 200090710 : 200090610), cm.getMap(select < 1 ? 200090710 : 200090610).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(cm.getPlayer().getMap().getId() == 200090710 ? 104020130 : 200000170));
			cm.gainMeso(-800);
			cm.dispose();
			return;
			}
			cm.sendSimple("Which airplane would you like to take? #b" + (cm.getPlayer().getSkillLevel(80001027) == 1 ? "\r\n#L0#Wooden Airplane#l" : "") + "" + (cm.getPlayer().getSkillLevel(80001028) == 1 ? "\r\n#L1#Red Airplane#l" : "") + "");
			break;
	case 3:
		if (cm.getPlayer().getMeso() < 5000) {
			cm.sendOk("You don't have enough money for the Station fee.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-5000);
			cm.giveBuff(selection < 1 ? 80001027 : 80001028, 1);
			cm.getPlayer().changeMap(cm.getMap(select < 1 ? 200110071 : 200110050), cm.getMap(select < 1 ? 200110071 : 200110050).getPortal(0));
			cm.dispose();
}
}
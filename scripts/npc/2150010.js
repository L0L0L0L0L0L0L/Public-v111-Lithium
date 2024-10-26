/*
	名字:	雷德拓
	地圖:	前往埃德爾斯坦站台
	描述:	104020130
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
		if (type < 3) {
		cm.sendNext("Not the traveling type, huh?");
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	if (cm.getPlayer().getSkillLevel(80001027) != 1 && cm.getPlayer().getSkillLevel(80001028) != 1) {
	switch (status) {
	case 0:
		cm.sendYesNo("Do you want to go to Edelstein? The fee is 800 Mesos. Hop on if you want to go. It will take about 30 seconds.");
		break;
	case 1:
		if (cm.getPlayer().getMeso() > 800) {
			cm.getPlayer().changeMap(cm.getMap(200090600), cm.getMap(200090600).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(310000010));
			cm.gainMeso(-800);
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm. Are you sure you have #b800#k Mesos? Check your inventory and come back once you have enough.");
			cm.dispose();
			return;
			}
			}
	switch (status) {
	case 0:
		cm.sendSimple("Do you have an airplane? Airplanes can take you to other continents, without needing to wait for a ship. Of course, it costs 5,000 Mesos, but you're paying for convenience! \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#l\r\n#L1##bBoard a ship.#l");
		break;
	case 1:
		if (selection == 0) {
			cm.sendSimple("Which airplane would you like to take? #b" + (cm.getPlayer().getSkillLevel(80001027) == 1 ? "\r\n#L0#Wooden Airplane#l" : "") + "" + (cm.getPlayer().getSkillLevel(80001028) == 1 ? "\r\n#L1#Red Airplane#l" : "") + "");
			}
		if (selection == 1) {
			cm.sendYesNo("Do you want to go to Edelstein? The fee is 800 Mesos. Hop on if you want to go. It will take about 30 seconds.");
			}
			select = selection;
			break;
	case 2:
		if (select == 1) {
		if (cm.getPlayer().getMeso() > 800) {
			cm.getPlayer().changeMap(cm.getMap(200090700), cm.getMap(200090700).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(310000010));
			cm.gainMeso(-800);
			cm.dispose();
			return;
			}
			cm.sendNext("Hmm. Are you sure you have #b800#k Mesos? Check your inventory and come back once you have enough.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMeso() > 5000) {
			cm.gainMeso(-5000);
			cm.giveBuff(selection < 1 ? 80001027 : 80001028, 1);
			cm.getPlayer().changeMap(cm.getMap(200110070), cm.getMap(200110070).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have enough money for the Station fee.");
			cm.dispose();
}
}
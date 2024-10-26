/*
	名字:	奇盧
	地圖:	天空渡口
	描述:	130000210
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
		if (type < 3) {
		cm.sendNext("What? You still have business in Ereve? Then take care of everything before you come aboard.");
		cm.dispose();
		return;
		}
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
		reactor = 'action' + (cm.getPlayer().getSkillLevel(80001027) == 1 || cm.getPlayer().getSkillLevel(80001028) == 1 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Hmm... Fine wind today. Are you thinking of leaving #m130000000# for a different region? This ship goes to Orbis in Ossyria.");
		break;
	case 1:
		cm.sendYesNo("It will take about #b30 seconds#k to get to #b#m200000000##k in Ossyria. The fee is #b1000#k Mesos. Are you ready to board?");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 1000) {
			cm.sendNext("You don't have the money... Again, the fee is #b1000#k Mesos.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-1000);
			cm.getPlayer().changeMap(cm.getMap(200090021), cm.getMap(200090021).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(200000161));
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("Do you like airplanes? Airplanes can take you to other continents, without needing to wait for a ship. Not for free, of course -- it's 5,000 Mesos a ticket. \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#l\r\n#L1##bBoard a ship.#l");
		break;
	case 1:
		if (selection == 0) {
			cm.sendSimple("Which airplane would you like to take? #b" + (cm.getPlayer().getSkillLevel(80001027) == 1 ? "\r\n#L0#Wooden Airplane#l" : "") + "" + (cm.getPlayer().getSkillLevel(80001028) == 1 ? "\r\n#L1#Red Airplane#l" : "") + "");
			}
		if (selection == 1) {
			cm.sendNext("Hmm... Fine wind today. Are you thinking of leaving #m130000000# for a different region? This ship goes to Orbis in Ossyria.");
			}
			select = selection;
			break;
	case 2:
		if (select == 0) {
			if (cm.getPlayer().getMeso() > 5000) {
			cm.gainMeso(-5000);
			cm.giveBuff(selection < 1 ? 80001027 : 80001028, 1);
			cm.getPlayer().changeMap(cm.getMap(200110060), cm.getMap(200110060).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have enough money for the Station fee.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("It will take about #b30 seconds#k to get to #b#m200000000##k in Ossyria. The fee is #b1000#k Mesos. Are you ready to board?");
			break;
	case 3:
		if (cm.getPlayer().getMeso() < 1000) {
			cm.sendNext("You don't have the money... Again, the fee is #b1000#k Mesos.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainMeso(-1000);
			cm.getPlayer().changeMap(cm.getMap(200090021), cm.getMap(200090021).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(200000161));
}
}
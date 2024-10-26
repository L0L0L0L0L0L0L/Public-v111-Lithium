/*
	名字:	售票員
	地圖:	碼頭&amp;lt;前往維多利亞&gt;
	描述:	200000111
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
		cm.sendNext("Do you have some business you need to take care of here?");
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
		reactor = 'action' + (cm.getPlayer().getSkillLevel(80001027) == 1 || cm.getPlayer().getSkillLevel(80001028) == 1 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendYesNo("Would you like to board the ship for #bVictoria Island#k now? It'll take about 30 seconds to get there.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(200090000), cm.getMap(200090000).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(104020110));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("If you have an airplane, you can fly to stations all over the world. Would you rather take an airplane than wait for a ship? It'll cost you 5000 mesos. \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#l\r\n#L1##bBoard a ship.#l");
		break;
	case 1:
		if (selection == 0) {
			cm.sendSimple("Which airplane would you like to use? #b" + (cm.getPlayer().getSkillLevel(80001027) == 1 ? "\r\n#L0#Wooden Airplane#l" : "") + "" + (cm.getPlayer().getSkillLevel(80001028) == 1 ? "\r\n#L1#Red Airplane#l" : "") + "");
			}
		if (selection == 1) {
			cm.sendYesNo("Would you like to board the ship for #bVictoria Island#k now? It'll take about 30 seconds to get there.");
			}
			select = selection;
			break;
	case 2:
		if (select == 1) {
			cm.getPlayer().changeMap(cm.getMap(200090000), cm.getMap(200090000).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(104020110));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMeso() > 5000) {
			cm.gainMeso(-5000);
			cm.giveBuff(selection < 1 ? 80001027 : 80001028, 1);
			cm.getPlayer().changeMap(cm.getMap(200110001), cm.getMap(200110001).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have enough money for the Station fee.");
			cm.dispose();
}
}
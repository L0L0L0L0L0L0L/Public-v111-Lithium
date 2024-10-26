/*
	名字:	杰拉斯
	地圖:	碼頭&amp;lt;前往納希綠洲城&gt;
	描述:	200000151
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
		cm.sendNext("It appears you still have things to tend to here.");
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
		cm.sendYesNo("Would you like to head to #bAriant#k now? It'll take about one minute.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(200090400), cm.getMap(200090400).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(60, cm.getMap(260000100));
		cm.dispose();
		return;
		}
		}
	switch (status) {
	case 0:
		cm.sendSimple("If you have an airplane, you can fly to stations all over the world. Would you rather take an airplane than wait for a ship? It'll cost you 5,000 mesos to use the station. \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#k#l\r\n#L1##bBoard a ship.#l");
		break;
	case 1:
		if (selection == 0) {
			cm.sendSimple("Which airplane would you like to take? #b" + (cm.getPlayer().getSkillLevel(80001027) == 1 ? "\r\n#L0#Wooden Airplane#l" : "") + "" + (cm.getPlayer().getSkillLevel(80001028) == 1 ? "\r\n#L1#Red Airplane#l" : "") + "");
			}
		if (selection == 1) {
			cm.sendYesNo("Would you like to head to #bAriant#k now? It'll take about one minute.");
			}
			select = selection;
			break;
	case 2:
		if (select == 1) {
			cm.getPlayer().changeMap(cm.getMap(200090400), cm.getMap(200090400).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(60, cm.getMap(260000100));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMeso() > 5000) {
			cm.gainMeso(-5000);
			cm.giveBuff(selection < 1 ? 80001027 : 80001028, 1);
			cm.getPlayer().changeMap(cm.getMap(200110031), cm.getMap(200110031).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have enough money for the Station fee.");
			cm.dispose();
}
}
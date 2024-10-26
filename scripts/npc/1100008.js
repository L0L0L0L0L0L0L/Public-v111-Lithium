/*
	名字:	奇鲁
	地圖:	碼頭&amp;lt;前往耶雷弗&gt;
	描述:	200000161
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
		if (status < 1) {
		cm.sendNext("It's your choice.");
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
	switch (status) {
	case 0:
		cm.sendYesNo("Are you trying to leave Orbis for a different region? This boat is leaving for #b#m130000000##k. There, you will see bright sunlight shining through the leaves and feel a gentle breeze on your skin. It's also where Shinsoo and Empress Cygnus are. It's a great place to visit if you're interested in knights. Do you want to go to #m130000000#? It takes about 30 seconds to get there. It will cost you #b1000#k Mesos.");
		break;
	default:
		reactor = 'action' + (cm.getPlayer().getSkillLevel(80001027) == 1 || cm.getPlayer().getSkillLevel(80001028) == 1 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		if (cm.getPlayer().getMeso() < 1000) {
			cm.sendNext("You don't have the money... You need #b1000#k Mesos to make this trip.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-1000);
			cm.getPlayer().changeMap(cm.getMap(200090020), cm.getMap(200090020).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(130000210));
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("Do you like airplanes? Airplanes can take you to other continents, without needing to wait for a ship. Not for free, of course -- it's 5,000 Mesos a ticket. \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#l\r\n#L1##bBoard a ship.#l");
		break;
	case 2:
		if (selection == 1) {
		if (cm.getPlayer().getMeso() < 1000) {
			cm.sendNext("You don't have the money... You need #b1000#k Mesos to make this trip.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-1000);
			cm.getPlayer().changeMap(cm.getMap(200090020), cm.getMap(200090020).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(130000210));
			cm.dispose();
			return;
			}
			cm.sendSimple("Which airplane would you like to take? #b" + (cm.getPlayer().getSkillLevel(80001027) == 1 ? "\r\n#L0#Wooden Airplane#l" : "") + "" + (cm.getPlayer().getSkillLevel(80001028) == 1 ? "\r\n#L1#Red Airplane#l" : "") + "");
			break;
	case 3:
		if (cm.getPlayer().getMeso() > 5000) {
			cm.gainMeso(-5000);
			cm.giveBuff(selection < 1 ? 80001027 : 80001028, 1);
			cm.getPlayer().changeMap(cm.getMap(200110061), cm.getMap(200110061).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have enough money for the Station fee.");
			cm.dispose();
}
}
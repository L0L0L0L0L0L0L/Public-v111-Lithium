/*
	名字:	移動小幫手
	地圖:	碼頭&amp;lt;前往桃花仙境&gt;
	描述:	200000141
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
		if (status < 1 && type < 3) {
		cm.sendNext("Let me know if you change your mind.");
		cm.dispose();
		return;
		}
		if (status < 2 && type < 3) {
		cm.sendNext("OK. If you ever change your mind, please let me know.");
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
		if (cm.getPlayer().getMap().getId() == 200000141) {
			cm.sendSimple("Hello there. How's the traveling so far? I've been transporting other travelers like you to other regions in 30 seconds. and... are you interested? If so, then select the town you'd like to head to. \r\n#L0##bMu Lung(1500 mesos)#l");
			}
		if (cm.getPlayer().getMap().getId() == 250000100) {
			cm.sendSimple("Heya! You having fun with your travels? It must suck to not have wings, but I'm here to help. Where do you wanna go? Keep in mind that it takes about 30 seconds to get to Orbis. \r\n#L0##bOrbis(1500 mesos)#l\r\n#L1#Herb Town(500 mesos)#l");
			}
		if (cm.getPlayer().getMap().getId() == 251000000) {
			cm.sendYesNo("How goes it, Explorer? Enjoying your travels? I've made a habit of taking wingless folk over to #bMu Lung#k recently, so do you need a lift? It's perfectly safe, as long as you sit perfectly still and hang on perfectly tight. And more importantly, it's way faster! I'll give you a ride for #b500 mesos.");
			}
			break;
	case 1:
		if (cm.getPlayer().getMap().getId() == 251000000) {
		if (cm.getPlayer().getMeso() > 500) {
			cm.gainMeso(-500);
			cm.getPlayer().changeMap(cm.getMap(250000100), cm.getMap(250000100).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendNext("Hey, are you sure you have enough Mesos with you?");
			cm.dispose();
			return;
			}
		if (selection == 0) {
			if (cm.getPlayer().getSkillLevel(80001027) != 1 && cm.getPlayer().getSkillLevel(80001028) != 1) {
			if (cm.getPlayer().getMeso() > 1500) {
			cm.gainMeso(-1500);
			cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().getMap().getId() ==  250000100 ? 200090310 : 200090300), cm.getMap(cm.getPlayer().getMap().getId() ==  250000100 ? 200090310 : 200090300).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(cm.getPlayer().getMap().getId() == 200090310 ? 200000141 : 250000100));
			cm.dispose();
			return;
			}
			cm.sendNext("Hey, are you sure you have enough Mesos with you?");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMap().getId() == 200000141) {
			cm.sendSimple("It seems like you have an airplane that can fly through the Sky Road. l think you should be able to use your airplane to Mu Lung. But, you need 5000 meso to use the Sky Road. How would you like to do? \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#l\r\n#L1##bBoard a ship.#l");
			}
		if (cm.getPlayer().getMap().getId() == 250000100) {
			cm.sendSimple("Looks like you have an airplane that can fly through the Sky Road That means you can take it to Orbis. But you need 5000 mesos to use the Sky Road. What would you like to do? \r\n\r\n#b#L0#Use the airplane. #r(5000 mesos)#l\r\n#L1##bBoard a ship.#l");
			}
			}
		if (selection == 1) {
			cm.sendYesNo("Do you wish to fly to #b#m251000000##k right now? As long as you don't act silly while in the air, you should reach your destination in no time. It'll only cost you #b500 mesos.");
			}
			select = selection;
			break;
	case 2:
		if (select == 1) {
		if (cm.getPlayer().getMeso() > 500) {
			cm.gainMeso(-500);
			cm.getPlayer().changeMap(cm.getMap(251000000), cm.getMap(251000000).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendNext("Check and see if you have enough mesos.");
			cm.dispose();
			return;
			}
		if (selection == 1) {
		if (cm.getPlayer().getMeso() > 1500) {
			cm.gainMeso(-1500);
			cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().getMap().getId() ==  250000100 ? 200090310 : 200090300), cm.getMap(cm.getPlayer().getMap().getId() ==  250000100 ? 200090310 : 200090300).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(cm.getPlayer().getMap().getId() == 200090310 ? 200000141 : 250000100));
			cm.dispose();
			return;
			}
			cm.sendNext("Hey, are you sure you have enough Mesos with you?");
			cm.dispose();
			return;
			}
			cm.sendSimple("Which airplane would you like to use? #b" + (cm.getPlayer().getSkillLevel(80001027) == 1 ? "\r\n#L0#Wooden Airplane#l" : "") + "" + (cm.getPlayer().getSkillLevel(80001028) == 1 ? "\r\n#L1#Red Airplane#l" : "") + "");
			break;
	case 3:
		if (cm.getPlayer().getMeso() > 5000) {
			cm.gainMeso(-5000);
			cm.giveBuff(selection < 1 ? 80001027 : 80001028, 1);
			cm.getPlayer().changeMap(cm.getMap(cm.getPlayer().getMap().getId() == 250000100 ? 200110040 : 200110041), cm.getMap(cm.getPlayer().getMap().getId() == 250000100 ? 200110040 : 200110041).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have enough money for the Station fee.");
			cm.dispose();
}
}
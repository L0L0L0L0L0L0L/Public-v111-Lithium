/*
	名字:	麥吉
	地圖:	勇士之村
	描述:	102000000
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
		cm.sendNext("Ah, you're aware of how precious life is, don't you? Stop wasting my time and leave.");
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
		cm.sendYesNo("What? You want a shot at sealing Balrog? A weakling like you might not make it back in one piece! Well, I suppose it isn't my business. Alright, you need to pay a fee of #b10,000 Mesos#k. Do you have enough Mesos on you?");
		break;
	case 1:
		if (cm.getPlayer().getLevel() < 45) {
			cm.sendOk("Rookies like yourself under LV. 45 don't have any right to go there at all. Now shoo!");
			cm.dispose();
			return;
			}
			cm.sendNext("Alright, don't disappoint me now. You'll be able to participate in the Expedition Team if you visit my apprentice #b#p1061014##k, upon your arrival.");
			break;
	case 2:
		if (cm.getPlayer().getMeso() < 10000) {
			cm.sendOk("You don't have enough Mesos. How dare you even dream of participating without the right amount of Mesos?! Scram!");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainMeso(-10000);
			cm.getPlayer().updateInfoQuest(1022002, 1);
			cm.getPlayer().changeMap(cm.getMap(105100100), cm.getMap(105100100).getPortal(0));
}
}
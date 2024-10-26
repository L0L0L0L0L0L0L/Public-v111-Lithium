/*
	名字:	蕾妮
	地圖:	長老公館
	描述:	211000001
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getLevel() < 50) {
			cm.sendOk("You're nowhere near ready to fight Zakum. I wouldn't suggest going in there until you're at least level 50.");
			cm.dispose();
			return;
			}
		if (Math.floor(cm.getPlayer().getJob() / 100 % 10) != 3) {
			cm.sendNext("You're no bowman. I am not qualified to judge you. If you want to explore Zakum, you will need to find a master of your job class to be your guide.");
			cm.dispose();
			return;
			}
			cm.sendNext("You should be able to stand against Zakum. Find #b#p2030008##k deep within the Dead Mine.");
			break;
	case 1:
		cm.sendNextPrev("Then I will send you to #bThe Door to Zakum#k, where #b#p2030008##k is.");
		break;
	case 2:
		cm.getPlayer().changeMap(cm.getMap(211042300), cm.getMap(211042300).getPortal(0));
		cm.dispose();
}
}
/*
	Name:	Zhisu
	Map:	Castle Corridor
	Description:	800040211
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
	switch (status) {
		case 0:
			cm.sendSimple("Who are you, and how did you get here? I don't want to consider you an enemy, so you better leave now.\r\n#L0##bI don't want to leave#l");
			break;
		case 1:
			cm.sendSimple("What, you still want to proceed further? Look, there's a dangerous path ahead. Do you think you can defeat them?\r\n#L0##bI want to try#l");
			break;
		case 2:
			cm.sendPrev("...You fearless fool, since you want to go in, I'll let you pass!");
			break;
		case 3:
			cm.getPlayer().changeMap(cm.getMap(800040300), cm.getMap(800040300).getPortal(1));
			cm.dispose();
	}
}

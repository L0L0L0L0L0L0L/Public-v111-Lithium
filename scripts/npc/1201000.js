/*
	名字:	莉琳
	地圖:	瑞恩村
	描述:	140000000
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
		cm.sendSimple("What is it? \r\n\r\n#L0##bI want to talk to you.#l");
		break;
	case 1:
		if (cm.getPlayer().getJob() < 2000 || cm.getPlayer().getJob() > 2112) {
			cm.sendNext("Why are you bothering me? I don't concern myself with people of your caliber.");
			cm.dispose();
			return;
			}
			cm.sendSimple("What do you want to talk about? \r\n\r\n#L0##bHow's life been treating you lately?#l");
			break;
	case 2:
		cm.sendNext("Aran, you seem to have a lot of free time lately, what with all your slacking off. Can you do me a favor? I want the flower from the top of Zakum's head. If you get me that, then we can have a nice cup of tea and chit chat.");
		break;
	case 3:
		cm.dispose();
}
}
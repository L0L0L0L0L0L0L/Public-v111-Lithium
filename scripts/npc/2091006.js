/*
    Name: Wu Gong's Challenge
    Map: Peach Blossom Temple
    Description: 250000100
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
				cm.dispose();
				return;
			}
			if (status < 2) {
				cm.sendOk("When I remove my hand from the notice board, the mysterious energy covering it will disappear.");
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
			cm.sendSimple("#e< WARNING >#n\r\n\r\nIf anyone has the courage to challenge the Wulin Dojo, come forth.\r\n#L0##bChallenge the Wulin Dojo#l\r\n#L1#View Warning#l");
			break;
		case 1:
			if (selection < 1) {
				cm.sendYesNo("As I place my hand on the notice board, a mysterious energy begins to envelop me. Do you wish to go to the Wulin Dojo?");
			}
			if (selection > 0) {
				cm.sendNext("I am Wu Gong, the creator of the Wulin Tower. I have been training in Wulin for a long time, and now my skills have reached their peak. From today, I will accept any challenge, and the Wulin Dojo will reward the strongest opponents.");
			}
			select = selection;
			break;
		case 2:
			if (select < 1) {
				cm.getPlayer().changeMap(cm.getMap(925020000), cm.getMap(925020000).getPortal(4));
			}
			if (select > 0) {
				cm.sendPrev("If anyone wishes to spar with me, feel free to challenge me anytime. I will show you your weaknesses. You can challenge me alone, but if you lack the courage, you may also bring friends to challenge me.");
			}
			cm.dispose();
	}
}

/*
	名字:	噗洛
	地圖:	前往瑞恩
	描述:	200090060
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendSimple("Ahhhh, this is so boring... The whale is controlling the ship so I'm left with nothing to do but look up and stare at the clouds. Hey, I'm trying to pass time. Would you like me to tell you about Rien or something? Are you interested? \r\n\r\n#b#L0#Sure#l\r\n#L1#NO, I'm not interested#l");
		break;
	case 1:
		if (selection > 0) {
			cm.sendNext("Pshaw, it's not like you have anything better to do...");
			cm.dispose();
			return;
			}
			cm.sendNext("Rien is a tiny island located right next to the biggest island in all of Maple World, Victoria Island. It's about a minute west of Lith Harbor if you ride the whale.");
			break;
	case 2:
		cm.sendNextPrev("Although Rien is quite far from the northern regions, it's frozen at all times because the temperature is unusually low there. You can say that Rien consists of ice and little else. I hear that this anomaly isn't a natural phenomenon but a man-made condition.");
		break;
	case 3:
		cm.sendNextPrev("Plants are rare since the entire island is covered in ice and hardly any of those plants bear fruit. It's the perfect place for penguins but not for humans. That's probably why every human but one girl has left the town.");
		break;
	case 4:
		cm.sendNextPrev("But Rien is still a very active town since the hard-working penguins diligently dig through the ice, hoping to discover something new and amazing.");
		break;
	case 5:
		cm.sendPrev("#b(Puro went on and on and on and on. He must have been extremely bored.)");
		break;
	case 6:
		cm.dispose();
}
}
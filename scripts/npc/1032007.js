/*
	名字:	售票員
	地圖:	前往天空之城站台
	描述:	104020110
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
		cm.sendNext("Pleased to meet you. I'm Joel, the station attendant. Want to leave Victoria Island and go to another area? At our station, we have a #b1-seater ship#k bound for #bOrbis Station#k, on the continent of Ossyria, always standing by for you to use.");
		break;
	case 1:
		cm.sendNextPrev("If you are thinking of going to Orbis, please go talk to #bCherry#k on the right.");
		break;
	case 2:
		cm.sendNextPrev("Well, the truth is, we charged for these flights until very recently, but the alchemists of Magatia made a crucial discovery on the fuel that dramatically cuts down the amount of Mana used for the flight, so these flights are now free. Don't worry, we still get paid. Now we just get paid through the government.");
		break;
	default:
		cm.dispose();
}
}
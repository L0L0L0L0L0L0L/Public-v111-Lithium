/*
	名字:	車掌
	地圖:	玩具城售票處
	描述:	220000100
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
		cm.sendNext("Pleased to meet you. I'm Mel, the station attendant. Are you ready to leave Ludibrium and go to another area? At our station, we have an #bairship#k bound for #bOrbis Station#k, on the continent of Ossyria, always standing by for you to use.");
		break;
	case 1:
		cm.sendNextPrev("If you are planning on heading to Orbis, please use the portal on the right and head to the station, then talk to #bTian#k.");
		break;
	case 2:
		cm.sendNextPrev("Sigh... Free flights to everywhere... I don't understand what got the alchemists of Magatia to come up with something like this. This is making our job that much harder, because there are so many more passengers now. Sigh...");
		break;
	case 3:
		cm.dispose();
}
}
/*
	名字:	紐曼
	地圖:	神木村售票處
	描述:	240000100
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("Pleased to meet you. I'm Mu, the station attendant. Would you like to leave Leafre and go to another area? At our station, we have a #b1-seater ship#k bound for #bOrbis Station#k on the continent of Ossyria always standing by for you to use.");
		break;
	case 1:
		cm.sendNextPrev("If you are going to Orbis, use the portal on the right and head to the station, then talk to #bTommie#k. Ah, don't be surprised when you see him. We keep being mistaken for being twins, but Tommie's actually my third oldest brother.");
		break;
	case 2:
		cm.sendNextPrev("Oh, and this is just between you and me... at the highest point of the station, you'll find a strange old man named Corba. Apparently, he possesses the mystic power to transform people into flying dragons. It has been said that once transformed into a flying dragon, you can fly to the mysterious floating island. Surely adventurers of level 100 and up will be intrigued...");
		break;
	default:
		cm.dispose();
}
}
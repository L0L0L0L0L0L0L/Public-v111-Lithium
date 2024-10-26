/*
	名字:	西拉斯
	地圖:	納希站台
	描述:	260000100
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
		cm.sendNext("Hey. I'm the station attendant, Ciras. You wanna leave Ariant and go to another area? Here at our station we always have a #b1-seater ship#k standing by that's headed to #bOrbis Station#k, on the continent of Ossyria.");
		break;
	case 1:
		cm.sendNextPrev("If you're going to Orbis, talk to that old man on the right, #bAsesson#k. He has a hard time hearing, so you may want to yell at him to get his attention.");
		break;
	case 2:
		cm.sendNextPrev("Oh, and in case you're not aware of this, somewhere in the desert, a mysterious-looking man called Karcasa sends people to Victoria Island for a fee. l hope you understand that it's against the law to fly these innocent people to other towns without permit!!");
		break;
	case 3:
		cm.sendPrev("The Camel Cab, however, is permitted by the king so you can use that. Well, that cab will only take you up to Magatia, but it's still legal.");
		break;
	default:
		cm.dispose();
}
}
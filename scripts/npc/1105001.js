/*
	名字:	赫麗娜
	地圖:	聯盟會議場
	描述:	913050010
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
		cm.sendNext("The continental conference was a complete success! The #bMaple Alliance#k has been formed and the heroes across all of Maple World will join in the fight.");
		break;
	case 1:
		cm.sendNextPrev("All explorers will remain free to adventure as they have. The Alliance will maintain no control over the freedom of our citizens.");
		break;
	case 2:
		cm.sendPrev("The Alliance, instead, will urge its members to put their duties first. It is my hope that they will choose to fight on the side of right.");
		break;
	case 3:
		cm.dispose();
}
}
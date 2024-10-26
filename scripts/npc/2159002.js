/*
	名字:	班
	地圖:	人煙稀少的石山
	描述:	931000000
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
		cm.sendNext("If Jun's too chicken, let's leave him here. But why's it have to be Hide-and-Seek? Let's play something cool...");
		break;
	case 1:
		cm.sendPrev("That's not what I said...");
		break;
	case 2:
		cm.dispose();
}
}
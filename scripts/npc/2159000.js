/*
	名字:	約翰
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
		cm.sendNext("I'm glad you made it. Safety in numbers, right? I feel like we're being watched... Shouldn't we think about heading back? The grown-ups in town say the mines aren't safe...");
		break;
	case 1:
		cm.sendPrevS("Sheesh, why are you such a scaredy cat? We've come all this way! We should at least do something before we go back.", 4, 2159002);
		break;
	case 2:
		cm.dispose();
}
}
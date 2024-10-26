/*
	名字:	寶貝龍
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
		cm.sendNext("This is soooo coooool!! We're a part of history! I'm so excited! The great and powerful Onyx Dragon will show these guys how dignified we can be!");
		break;
	case 1:
		cm.sendPrev("Can we get our picture taken with Mercedes? She is so awesome!");
		break;
	case 2:
		cm.dispose();
}
}
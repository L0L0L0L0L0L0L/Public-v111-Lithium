/*
	名字:	那因哈特
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
		cm.sendNext("This is a historical moment, isn't it?");
		break;
	case 1:
		cm.sendPrev("I feel so proud about this change in my ways. I remember when I left my town for the first time...oh! Listen to me prattling on!");
		break;
	case 2:
		cm.dispose();
}
}
/*
	名字:	士林
	地圖:	中央走廊
	描述:	120000200
*/

function start() {
	cm.sendYesNo("I'll be on repair duty for a while. Do you have something to you need fixed?");
}

function action(mode, type, selection) {
	switch(mode) {
	case 0:
		cm.sendNext("Good items break easily. \r\nYou should repair them once in a while.");
		break;
	case 1:
		cm.sendRepairWindow();
		}
		cm.dispose();
}
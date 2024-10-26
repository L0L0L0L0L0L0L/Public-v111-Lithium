/*
	名字:	地下神殿入口
	地圖:	岩石山丘
	描述:	260010401
*/

function start() {
	cm.sendGetText("一个可疑的声音穿过寂静：請說出#b暗号#k。");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getText() == "芝麻开门" || cm.getText() == "") {
		cm.getPlayer().changeMap(cm.getMap(260010402), cm.getMap(260010402).getPortal(1));
		cm.dispose();
		return;
		}
		cm.sendOk("输入的暗號#b錯誤#k。");
		}
		cm.dispose();
}
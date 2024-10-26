/*
	名字:	艾伯
	地圖:	玩具城整形外科
	描述:	220000003
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
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		var chat = "歡迎光臨玩具城整形外科，我是艾伯，只需要持有本店的會員卡，就可以享受我們專業的服務。#b";
		chat += "\r\n#L1##v5152057##t5152057#";
		cm.sendSimple(chat);
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029];
		else
			face = [21020, 21021, 21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029];

			cm.sendStyle("使用專用的機器，可以提前看到整容後的自己，選一個你喜歡的模样。", face);
			break;
	case 2:
		if (cm.getPlayer().itemQuantity(5152057)) {
			cm.gainItem(5152057, -1);
			cm.setFace(face[selection]);
			cm.sendOk("您的新面容已經改进好了，喜歡嗎？");
			cm.dispose();
			return;
			}
			cm.sendOk("很抱歉，沒有我們指定的會員卡，恐怕我不能為您服務。");
			cm.dispose();
}
}
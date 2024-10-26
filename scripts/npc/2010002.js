/*
	名字:	院長佛蘭斯
	地圖:	天空之城整形手術
	描述:	200000201
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
		var chat = "歡迎光臨天空之城整形手術，我是院長佛蘭斯，只需要持有本店的會員卡，就可以享受我們專業的服務。#b";
		chat += "\r\n#L1##v5152057##t5152057#";
		cm.sendSimple(chat);
		break;
	case 1:
		if (cm.getPlayer().getGender() < 1)
			face = [20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019];
		else
			face = [21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019];

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
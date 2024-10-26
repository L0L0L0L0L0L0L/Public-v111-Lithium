/*
	名字:	助手 莉茲
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
		var chat = "歡迎光臨天空之城整形手術，我是助手莉茲，只需要持有本店的會員卡，我會隨機為你做個改變！#b";
		chat += "\r\n#L1##v5152056##t5152056#";
		cm.sendSimple(chat);
		break;
	case 1:
		cm.sendYesNo("你想使用#v5152056#嗎？你的原貌可能會變成一個隨機的新形象。");
		break;
	case 2:
		if (cm.getPlayer().getGender() < 1)
			face = [20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019];
		else
			face = [21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019];

		if (cm.getPlayer().itemQuantity(5152056)) {
			cm.gainItem(5152056, -1);
			cm.setFace(face[Math.floor(Math.random() * face.length)]);
			cm.sendOk("您的新面容已經改进好了，满意嗎？");
			cm.dispose();
			return;
			}
			cm.sendOk("很抱歉，沒有我們指定的會員卡，恐怕我不能為您服務。");
			cm.dispose();
}
}
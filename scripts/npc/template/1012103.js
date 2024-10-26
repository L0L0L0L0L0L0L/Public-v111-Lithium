/*
	名字:	美髮師娜塔麗
	地圖:	弓箭手村美髮店
	描述:	100000104
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
		var chat = "I'm the head of this hair salon. allow me to take care of your hairdo. Please choose the one you want.#b";
		chat += "\r\n#L0##v5150053##t5150053#";
		chat += "\r\n#L1##v5151036##t5151036#";
		cm.sendSimple(chat);
		break;
	case 1:
		if (selection < 1) {
		if (cm.getPlayer().getGender() < 1)
			hair = [30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090];
		else
			hair = [31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); //讀取當前發色
			cm.sendStyle("I can totally change up your hairstyle and make it look so good. Why don't you change it up a bit?", hair);
			}
		if (selection > 0) {
			var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
			hair = [];

			for (var i = 0; i < 8; i++)
			hair[i] = color + i;
			cm.sendStyle("I can totally change your haircolor and make it look so good. Why don't you change it up a bit? ", hair);
			}
			select = selection;
			break;
	case 2:
		if (select < 1 && cm.getPlayer().itemQuantity(5150053) || select > 0 && cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
			cm.setHair(hair[selection]);
			cm.sendOk("Enjoy your new and improved hairstyle!");
			cm.dispose();
			return;
			}
			cm.sendOk("Hmmm...it looks like you don't have our designated coupon...I'm afraid I can't give you a haircut without it. I'm sorry...");
			cm.dispose();
}
}
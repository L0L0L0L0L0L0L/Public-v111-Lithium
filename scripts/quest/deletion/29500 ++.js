/*
	名字:	新楓之谷超級偶像
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Come back when I'm ready.");
		qm.dispose();
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
		qm.sendAcceptDecline("#v1142006# #e#b#t1142006##k\r\n\r\n-Limited time is 30 days\r\n-Only given to the player with the most popularity in New MapleStory#n\r\n\r \nDo you want to try and see if you are qualified to be the owner of this medal?");
		break;
	case 1:
		qm.sendPrev("If you feel you qualify, please feel free to come to me. Please remember that you will only be certified if you come to me for confirmation within the limited time. Also, if you have not completed or given up this challenge, you cannot challenge other titles.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(29500).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		if (qm.getPlayer().getFame() < 3000) {
			qm.sendNext("讓我看看，目前你的人氣" + qm.getPlayer().getFame() + "，看來想要成為超級偶像，還要繼續努力哦。");
			qm.dispose();
			return;
			}
			qm.sendNext("偶像！你成功了，你的人氣已經飆升到最高值，符合擁有#e#b新楓之谷超級偶像#k#n的稱號，祝賀你！");
			break;
	case 1:
		qm.sendPrev("我達利額代替名譽之神向世界宣佈，你是這個名譽的稱號的主人。倘若你想挑戰新的稱號，歡迎隨時回來找我。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142006# #t1142006# 1");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "裝備道具視窗的欄位不足"));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(29500).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142006, 1, 30);
			qm.dispose();
}
}
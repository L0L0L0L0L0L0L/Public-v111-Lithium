/*
	名字:	優秀社會人士
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29508)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(29508).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getMarriageId() < 1 || qm.getPlayer().getGuildId() < 1 || qm.getPlayer().getJunior1() < 1) {
			qm.sendNext("\n- Wedding " + (qm.getPlayer().getMarriageId() > 0 ? "#gyes#k" : "(Before Completion)") + "\r\n\n- Join a Guild" + (qm.getPlayer().getGuildId() > 0 ? "#gyes#k" : "(Before Completion)") + "\r\n\n-Get a Junior " + (qm.getPlayer().getJunior1() > 0 ? "#gyes#k" : "(Before Completion)") + " \r\nYou still lack some qualities that make up an #bOutstanding Citizen#k \r\nCome back when you're ready.");
			qm.dispose();
			return;
			}
			qm.sendNext("你成功的融入了楓之谷的大家庭。符合擁有#e#b優秀社會人士#k#n的稱號，祝賀你！");
			break;
	case 1:
		qm.sendPrev("我達利額代替名譽之神向世界宣佈，你是這個名譽的稱號的主人。倘若你想挑戰新的稱號，歡迎隨時回來找我。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142081# #t1142081# 1");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "裝備道具視窗的欄位不足"));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(29508).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142081, 1);
			qm.dispose();
}
}
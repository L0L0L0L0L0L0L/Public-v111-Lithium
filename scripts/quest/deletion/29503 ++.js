/*
	名字:	捐獻王
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
		qm.sendNext("Come back when you're ready.");
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
		qm.sendNextPrev("Which town's Donation King title would you like to attempt?");
		break;
	case 1:
		qm.sendAcceptDecline("#v1142229# #e#b#t1142229##k\r\n\r\n-限制時間1小時\r\n-為這個城鎮捐贈最多楓幣的玩家#n\r\n\r\n你想不想試試看有沒有資格可以當這個勳章的主人呢？");
		break;
	case 1:
		qm.sendNextPrev("捐献排名\r\n\r\n1：)#b???????????#k : ???,???,???mesos\r\n2：)#bKelviinXD#k : 68,000,000mesos\r\n3：)#bxBabyRence#k: 49,999,999mesos\r\n4：)#bXxTrIStaArxx#k : 29,999,999mesosn\r\n5：)#bxBabyRence#k : 14,000,000mesos\n\r\n\r\n請理解，按照規定不能透露現任捐贈之王捐贈的確切數字。\n\r還請記住，所有記錄將在每個月的第一天初始化…。");
		break;
	case 2:
		qm.sendPrev("如果你覺得自己有資格參加，請隨時來找我。請記住唯有在限制時間內來找我確認才算得到認證。還有若是還沒完成或放棄這個挑戰，不可以挑戰其他稱號。");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(29503).forceStart(qm.getPlayer(), qm.getNpc(), 0);
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29503)).getCustomData() < 68000000) {
			qm.sendNext("讓我看看，目前你的捐獻總金額為" + qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29503)).getCustomData() + "楓幣，看來你想要成為捐獻王，還需要更大的善心哦。");
			qm.dispose();
			return;
			}
			qm.sendNext("感謝你為楓之谷世界所作的貢獻，你的精神是寶貴的！符合擁有#e#b捐獻王#k#n的稱號，祝賀你！");
			break;
	case 1:
		qm.sendPrev("我達利額代替名譽之神向世界宣佈，你是這個名譽的稱號的主人。倘若你想挑戰新的稱號，歡迎隨時回來找我。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142229# #t1142229# 1");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "裝備道具視窗的欄位不足"));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(29503).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142229, 1, 30);
			qm.dispose();
}
}
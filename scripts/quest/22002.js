/*
	名字:	早餐是三明治
	地圖:	前院
	描述:	100030102
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.sendNext("Oh, what? Aren't you going to have breakfast? Breakfast is the most important meal of the day! Talk to me again if you change your mind. If you don't, I'm going to eat it myself.");
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
		qm.sendNext("Did you feed #p1013102#? You should have some breakfast now then, Evan. Today's breakfast is a Handmade Sandwich. I've brought it with me. Hee hee. I was going to eat it myself if you didn't agree to feed #p1013102#.");
		break;
	case 1:
		qm.sendAcceptDecline("Here, I'll give you this #bSandwich#k, so #bgo talk to mom when you finish eating#k. She says she has something to tell you.");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendNext("What's with all those items in your Use window? I can't give you this Sandwich.");
			qm.dispose();
			return;
			}
			qm.gainItem(2022620, qm.getPlayer().itemQuantity(2022620) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(22002).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.sendNextS("#b(Mom has something to say? Eat your HandmadeSandwich and head back inside the house.)", 3);
			break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/3/0"));
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
		qm.sendNext("Did you eat your breakfast, Evan? Then, will you do me a favor? \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1003028# 1 #t1003028# \r\n#v2022621# 5 #t2022621# \r\n#v2022622# 5 #t2022622# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 60 exp");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1 || qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 2) {
			qm.sendOk("Why do you have so many items? It must be so heavy... Can you empty your Equip window and your Use window for me, Evan?");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(22002).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/4/0"));
			qm.gainItem(1003028, 1);
			qm.gainItem(2022621, 5);
			qm.gainItem(2022622, 5);
			qm.gainExp(60);
			qm.dispose();
}
}
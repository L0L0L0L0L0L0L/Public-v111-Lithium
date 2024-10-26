/*
	名字:	信件的送達
	地圖:	農場中心地
	描述:	100030300
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		if (status < 2) {
		sm.sendNext("I guess all that action with the #o1210111#s has worn you out. Why don't you come back and see me after you get some rest.");
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
		qm.sendSimple("Hm? What is it, Evan? Are you here to help your old dad? Huh? What do you mean, you defeated the #o1210111#s?! Geez, are you hurt?! \r\n\r\n#L0##bI'm fine, Dad! It was easy.");
		break;
	case 1:
		qm.sendAcceptDecline("What a relief. You need to be careful, though. It could've been dangerous... By the way, I've got something for you to do. Can you run an errand for me?");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22510)).getStatus() < 1) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Huh? What are you are carrying around with you, Evan?Are you collecting leaves? I used to do that when I was a young lad just like you...but I need your help so empty out an item slot from the Other window of your Inventory.");
			qm.dispose();
			return;
			}
			qm.gainItem(4032455, qm.getPlayer().itemQuantity(4032455) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(22510).forceStart(qm.getPlayer(), qm.getNpc(), null);
			}
			qm.sendNextS("Could you tell #b#p1012003##k in #b#m100000000# that I'm not going to be able to deliver the Pork on time? The #o1210111#s have caused so many problems.", 1);
			break;
	case 3:
		qm.sendNextPrevS("I've written everything down in this letter, so all you have to do is take this to him. I'd go myself, but I have to deal with problems here.", 1);
		break;
	case 4:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/13/0"));
		qm.dispose();
}
}
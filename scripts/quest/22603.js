/*
	名字:	脫皮之後2
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("What's the matter, master? I have new scales already, so I thought you could use this one. Talk to me again and accept, okay?");
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
		qm.sendNext("Master, look. I think I'm really coming into my own with my strength.");
		break;
	case 1:
		qm.sendNextPrevS("#bYou're right. You look quite imposing. Is this the true strength of an Onyx Dragon?", 2);
		break;
	case 2:
		qm.sendNextPrev("It is the strength of an Onyx Dragon as well as the strength of its master. The Onyx Dragon can only grow when its master is growing stronger. That means your spirit has grown that much, too, master.");
		break;
	case 3:
		qm.sendNextPrevS("#bI see you've matured. You even sound different, #p1013000#.", 2);
		break;
	case 4:
		qm.sendAcceptDecline("Haha, of course. It would be embarrasing to talk like a child with this elegant bod! Anyway, master, I have another shiny scale that came off when I was shedding. It seems to be even more powerful than the last one I gave you. Here you go.");
		break;
	case 5:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("You have too many things on you, master. Why don't you make some room in your Etc window?");
			qm.dispose();
			return;
			}
			qm.gainItem(1142157, 1);
			Packages.server.quest.MapleQuest.getInstance(22603).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22603));
			qm.sendOk("Master, you should use this scale to make something useful that would reduce the damage you take when hit by a monster. You'll get stronger, which means that I'll get stronger. Sounds good to me!");
			break;
	case 6:
		qm.dispose();
}
}
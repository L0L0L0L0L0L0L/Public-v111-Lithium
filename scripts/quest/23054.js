/*
	名字:	超越我的你
	地圖:	秘密廣場
	描述:	310010000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
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
		qm.sendNext("Hey, it's #h0#. You're quite the hero now. Though we may have lost our peace and freedom, Edelstein is still the best place in the world.");
		break;
	case 1:
		qm.sendNextPrevS("Are you feeling better?", 2);
		break;
	case 2:
		qm.sendNextPrev("Yes, thanks to #p2151003#'s medicine, I'm just about back to my original self. Unfortunately, there is still one problem...");
		break;
	case 3:
		qm.sendNextPrevS("What?! Are the Black Wings planning something?", 2);
		break;
	case 4:
		qm.sendYesNo("No, nothing like that. The problem is... you! You've become stronger than me. It's kind of strange for a teacher to be weaker than their own student, right? That's why I want to give you an even more difficult mission.");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23054)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("I wanted to give you a gift to commemorate your new powers but I can't. Why do you carry so many things in your Inventory Equip tab?");
			qm.dispose();
			return;
			}
			qm.gainItem(1142245, 1);
			qm.getPlayer().changeJob(3512);
			Packages.server.quest.MapleQuest.getInstance(23054).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23054));
			}
			qm.sendNext("No use refusing. I've already advanced you. I've also given you some skills that I know of but haven't mastered yet. I have a hunch that you'll be able master them. After all, you are are the most skilled member of the Resistance now.");
			break;
	case 6:
		qm.sendNextPrev("With this, the end of my lessons has...neared. Though you are stronger than I am, there are a lot of things you can still learn from me. I will see you at our next lesson...whenever that may be...");
		break;
	case 7:
		qm.sendPrev("Until then, I look forward to seeing your accomplishments!");
		break;
	case 8:
		qm.dispose();
}
}
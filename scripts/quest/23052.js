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
		qm.sendNext("Hey, it's #h0#, the hero of Edelstein. Ah, isn't Edelstein great? Even if it IS under the control of the Black Wings...");
		break;
	case 1:
		qm.sendNextPrevS("Are you feeling better?", 2);
		break;
	case 2:
		qm.sendNextPrev("Yes. #p2151003#'s skills are second to none. I'm completely back to my old self. There is still one problem though...");
		break;
	case 3:
		qm.sendNextPrevS("What?! Are the Black Wings planning something?", 2);
		break;
	case 4:
		qm.sendYesNo("No, the problem is... you! You've become too strong. I'm supposed to be your teacher but you've accomplished something I couldn't do. So I want to give you a more difficult mission!");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23052)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("I was trying to give you a gift for making a job advancement, but I can't. Empty one of your Equip slots.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142245, 1);
			qm.getPlayer().changeJob(3212);
			Packages.server.quest.MapleQuest.getInstance(23052).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23052));
			}
			qm.sendNext("I've advanced you. I've also given you some skills that I know of but haven't mastered yet. I have a hunch that you'll be able master them. After all, you are are the most skilled member of the Resistance now.");
			break;
	case 6:
		qm.sendNextPrev("Could this be my last lesson with you? Nah, can't be. You may be stronger, but I'm still smarter. I'm sure there's plenty more you can learn from me. So I'll see you at your next lesson... whenever that is...");
		break;
	case 7:
		qm.sendPrev("Until then, I look forward to seeing what you accomplish.");
		break;
	case 8:
		qm.dispose();
}
}
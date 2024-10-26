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
		qm.sendNext("Well, if it isn't the town hero, #h0#! It's so wonderful to see you. Ah, even though it's under the control of the Black Wings, I do so love Edelstein.");
		break;
	case 1:
		qm.sendNextPrevS("Are you feeling better?", 2);
		break;
	case 2:
		qm.sendNextPrev("I still have a few aches and pains, but I'm fine. #p2151003# is the best healer around, after all. The only problem is...");
		break;
	case 3:
		qm.sendNextPrevS("What?! Are the Black Wings planning something?", 2);
		break;
	case 4:
		qm.sendYesNo("Haha, no, no. Rest easy. The problem is... you! You've become so strong that I don't have much to do. I used to be the best Wild Hunter in the Resistance, but now I'm not even good enough to teach you. That's why I want to give you an even more difficult mission!");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23053)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("I was trying to give you a gift for making a job advancement, but I can't. Empty one of your Equip slots.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142245, 1);
			qm.getPlayer().changeJob(3312);
			Packages.server.quest.MapleQuest.getInstance(23053).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23053));
			}
			qm.sendNext("I've advanced you. I've also given you some skills that I know of but haven't mastered yet. I have a hunch that you'll be able master them. After all, you are are the most skilled member of the Resistance now!");
			break;
	case 6:
		qm.sendNextPrev("And with that, my lessons have... NOT come to an end. I can still be pretty useful, you know. There's more I can teach you. Plus, we're friends, right? So I'll see you at your next lesson... Whenever that might be...");
		break;
	case 7:
		qm.sendPrev("Until then, I look forward to seeing what you accomplish.");
		break;
	case 8:
		qm.dispose();
}
}
/*
	名字:	空白的卷軸
	地圖:	桃花仙境
	描述:	250000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
		qm.sendNext("Hmmm, I was going to have you do the work instead of me, but you saw right through me, didn't you. You'll do just fine in this rough world.");
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
		if (qm.getPlayer().itemQuantity(4220151)) {
			qm.sendNext("Hmm... Has the scroll restoration not been completed yet? I'll take back the scroll you have for now, so try again.");
			qm.gainItem(4220151, -1);
			qm.dispose();
			return;
			}
			qm.sendNextS("Well, I'm not really busy or anything, but I don't feel like concocting medicine. Can you come back later? If you don't mind, move.", 8);
			break;
	case 1:
		qm.sendNextPrevS("I heard you met the Shadow Knight of the Black Wings...", 2);
		break;
	case 2:
		qm.sendNextPrevS("Ah, you mean that guy dressed in black with a menacing wrinkle in his forehead? Why, yes I did. I did meet him. I even got an item for him. He asked me to deliver it to that old man, #p2091007#.", 8);
		break;
	case 3:
		qm.sendNextPrevS("An item?", 2);
		break;
	case 4:
		qm.sendNextPrevS("Yes, a big #b#t4220151##k. He gave it to me without saying much. He just asked me to deliver it. He looked scary, as if he would chase me down if I didn't do as he said. Wheeeeeeeew, that was an experience.", 8);
		break;
	case 5:
		qm.sendNextPrevS("So did you deliver the #t4220151# to him?", 2);
		break;
	case 6:
		qm.sendAcceptDecline("Well, the thing is... There is a slight problem. Care to listen?");
		break;
	case 7:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21742)).getStatus() < 1) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Oh, if you want to listen to my story, you'll have to take care of this item for me. But don't seem to have the capacity for that right now. I'll begin my story if you empty out a slot in your ETC tab.");
			qm.dispose();
			return;
			}
			qm.gainItem(4220151, 1);
			Packages.server.quest.MapleQuest.getInstance(21742).forceStart(qm.getPlayer(), qm.getNpc(), null);
			Packages.server.quest.MapleQuest.getInstance(21763).forceStart(qm.getPlayer(), qm.getNpc(), 0);
			}
			qm.sendNext("So what happened was... I was making a new type of medicine, so I filled a pot with water and started boiled some herbs. That's when I made the mistake of...dropping the #t4220151# right into the pot. Oh gosh, I pulled it out as fast as I could, but the #t4220151# was already soaked and the writing on it had already disappeared.");
			break;
	case 8:
		qm.sendPrev("So then I thought, well what's the point of delivering it to #p2091007#? I must first restore the writing on #t4220151#. Thar's why I need you to do something for me. The guy down there writing on #t4220151# is #b#p2091008##k the greatest artist in all of #p2091007#. I'm sure he'd be able to restore the writing on Hanging Scroll.");
		break;
	case 9:
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
		qm.sendNext("Hey, how is the restoring process coming along? Hmm, let's see what it says.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21742)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21742).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4220151, -1);
			qm.gainExp(7400);
			}
			qm.sendPrev("Eeeeeek, what the heck is this?!");
			break;
	case 2:
		qm.dispose();
}
}
/*
	名字:	維多利亞島的封印石
	地圖:	特魯的情報商店
	描述:	104000004
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("Haha, maybe we should have made the puppeteer's life even more miserable. But for a youngster like him, this should be plenty.");
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
		qm.sendNextS("Seal Stone of Victoria Island? I got it already. Look! Hehehe. \r\n\r\n#v4032323#", 8);
		break;
	case 1:
		qm.sendNextPrevS("!! \r\nBut how...?!");
		break;
	case 2:
		qm.sendAcceptDecline("How? After getting attacked by the puppeteer, I used every ounce of my energy to search every corner of Victoria Island. That's how. I couldn't just sit and do nothing, you know? Taking away what they're looking for before they can even get ahold of it... Now, that's revenge.");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21735)).getStatus() < 1) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Hey, I was going to hand you the Seal Stone of Victoria Islandk, but you have too many items in your inventory. Empty one slot in your ETC tab for me.");
			qm.dispose();
			return;
			}
			qm.gainItem(4032323, qm.getPlayer().itemQuantity(4032323) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(21735).forceStart(qm.getPlayer(), qm.getNpc(), null);
			}
			qm.sendNext("But the Black Wings already know about me. Holding on to this is probably not the best idea. But it's not like you can hold on to it either, since you might lose it in battle. I think we should ask #b#p1201000##k to keep it safe.");
			break;
	case 4:
		qm.sendNextPrev("Only the #m140000000# clan has lived in #m140000000# Island as long as I can remember. The island is filled with spells that disable other humans from entering, so even if the Black Wings tried, they wouldn't be able to get to it easily. Please give this to #p1201000#.");
		break;
	case 5:
		qm.sendNextPrev("I think I'll stop giving you tasks that entail gathering information. I think you've already become familiar enough with Maple World to experience it on your own.");
		break;
	case 6:
		qm.sendPrev("I am planning to do all that I can to collect information on the Black Wings. I'll probably #bkeep Investigating the Seal Stone. I'll let you know if I find anything#k. See you later.");
		break;
	case 7:
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Do you have doubts? Don't worry, you're Aran!");
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
		qm.sendNext("I've been receiving updates about the Black Wings from Tru. I heard he even got attacked not too long ago. What about you? Are you alright? Mmm... ls this really the Seal Stone of Victoria Island? So Tru did end up finding the Seal Stone of Victoria Island before they could.");
		break;
	case 1:
		qm.sendYesNo("I don't know what this item even does, but I do know that it has something to do with the Black Mage. As long as they are looking for this, we'll have to protect it. No matter what it takes, you must become stronger.");
		break;
	case 2:
		qm.gainExp(100);
		qm.gainItem(4032323, -1);
		Packages.server.quest.MapleQuest.getInstance(21735).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendOk("The Black Wings... I'm sure their plot doesn't end here. Please ask Tru to continue collecting information on the Black Wings. And Aran, please continue training diligently.");
		break;
	case 3:
		qm.dispose();
}
}
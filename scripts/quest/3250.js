/*
	名字:	作戰3階段：可愛的小鳥
	地圖:	遺忘的時間之路&amp;lt;1&gt;
	描述:	220070000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("Hmmm...I guess you're not a huge fan of animals. But they're so cute!");
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
		if (qm.getPlayer().itemQuantity(4220046)) {
			qm.sendNext("Oh what...? You still have the Timer from long ago. You want another Timer when you can't even take care of the one you have? At least return the one you have before you take on a new one. Huh? You don't know how to return it? Use the #b'l want to give up on raising the Timer#k keyword to start a conversation.");
			qm.dispose();
			return;
			}
			qm.sendNext("Wow! I fed this one...did I feed this one? Hmmm...I don't think I've fed the third one yet! Here, have some food. Hehe, it fills my appetite to just see them eat... Oh, are you here?");
			break;
	case 1:
		qm.sendNextPrev("Sigh... I've been really busy, ever since that Timer changed due to the Papulatus's influence. Proper nurturing can rear natural birds. I cleared out the monsters... so, since I have the time to spare now, I decided to rear a bird myself.");
		break;
	case 2:
		qm.sendYesNo("But it's so much work to raise not just one, but ten birds at once. Not to mention how hard it is to find food to feed all of them. But they're very adorable. Would you like to raise one?");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3250)).getStatus() < 1) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("It seems like you don't have enough room for a baby bird...");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(3250).forceStart(qm.getPlayer(), qm.getNpc(), null);
			Packages.server.quest.MapleQuest.getInstance(7067).forceStart(qm.getPlayer(), qm.getNpc(), 0);
			qm.gainItem(4220046, 1);
			}
			qm.sendNext("Here, I'll give you one. Please take good care of it. You can feed them Spring Bugs that feed off of monsters at the Clocktower.");
			break;
	case 4:
		qm.sendPrev("Timers must be returned to their original habitat when full-fledged, so bring the Timer back to me when it's full-grown. I'll be counting on you.");
		break;
	case 5:
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
		qm.sendNext("So, how's it feel to be raising the Timer?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3250)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(3250).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4220046, -1);
			qm.getPlayer().addFame(11);
			qm.addPartyTrait("sense", 1);
			qm.gainExp(803116);
			}
			qm.sendNextPrev("What? The Timer's already fully grown? Woah... Seems like you've been feeding the Springy Worm a whole bunch... Well then, I'll need that Timer back now. It's time for us to return it to its world... \r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 803116 exp \r\n\r\n#fUI/UIWindow.img/QuestIcon/6/0# 11 \r\n\r\n#fUI/UIWindow2.img/QuestIcon/11/0# Empathy 10");
			break;
	case 2:
		qm.sendNextPrev("I hate to see them go, but they don't belong here...it's for their good.");
		break;
	case 3:
		qm.dispose();
}
}
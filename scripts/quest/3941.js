/*
	名字:	搶奪王妃的絲綢
	地圖:	流浪團的帳棚
	描述:	260010600
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 3) {
		qm.dispose();
		return;
		}
		if (status < 4) {
		qm.sendNext("No? You aren't #p2101004#? But you are #p2101004#. What are you talking about? You really must be sick. I will give you the silk when you get better. Come back to me when you feel better, okay? I'll hold on to this for you.");
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
		if (qm.getPlayer().getBuffSource(Packages.client.MapleBuffStat.MORPH) != 2210005) {
			qm.sendNext("Isn't it really hot right now? But this is why we live in the desert. Anyway... when's #p2101004# coming?");
			qm.dispose();
			return;
			}
			qm.sendSimple("...aren't you #p2101004#? Long time! Thankfully, I was able to secure the silk that the queen has been desperately looking for. As usual, the item is finest you can find in this world... but why are you sweating so much?\r\n#L0##b(altering voice) No, it's just the sun...#l");
			break;
	case 1:
		qm.sendSimple("Well, since when was Ariant NOT hot? It's always been like this, and I thought you never seemed to mind the heat, but... Why is your face rapidly turning red? Are you okay?\r\n#L0##b(altering voice) I, I am okay. Don't worry about me...#l");
		break;
	case 2:
		qm.sendSimple("Are you sure you are okay? #p2101004#, you look like you are not feeling too well. Do you need some medicine? I have some cold medicine from El Nath. I'll sell it to you for cheap.\r\n#L0##bl told you I am fine!#l");
		break;
	case 3:
		qm.sendAcceptDecline("Are you sure? But the weird thing is you sound much different from the norm. Are you sure you don't have the cold? I mean, you are not acting like yourself at all. Normally you'd always bargain hard for Lidium Ore, and... are you really #p2101004#?");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(3941).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("You don't act like you normally would. Normally, you'd be much more talkative than this... is there something gonig on? Wait... how come your face is turning redder and redder? You must be enraged at something. I'm sorry, I'll bring the silk right now. Please wait.");
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
		if (qm.getPlayer().getBuffSource(Packages.client.MapleBuffStat.MORPH) != 2210005) {
			qm.sendNext("Isn't it really hot right now? I am thirsty...");
			qm.dispose();
			return;
			}
			qm.sendNext("Okay, here it is. Please handle this with care. This silk is very, very hard to find. If it's damaged anywhere, you'll be in jail in no time. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4031571# 1 #t4031571#");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendOk("You are carrying a lot in your inventory, and I can't put this silk in yours. Please make some room for this very important item.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(3941).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4031571, 1);
			qm.dispose();
}
}
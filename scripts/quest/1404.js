/*
	名字:	如果想要變成盜賊的話，請前往墮落城市
	地圖:	墮落城市酒吧
	描述:	103000003
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
		if (status == 3) {
		qm.sendSimple("You don't wish to walk the path of a Thief? I won't force this path on someone who doesn't want it. Which job do you want? \r\n#b#L1#Warrior#l\r\n#b#L2#Magician#l\r\n#b#L3#Bowman#l\r\n#b#L5#Pirate#l");
		status = 4;
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
		qm.sendNext("So, you're the one Mai was talking about? #h0#... I guess you do have some potential. You want to become a Thief? Do you know what Thieves are all about?");
		break;
	case 1:
		qm.sendNextPrev("Most people think of us as petty thieves who steal things, but that's not true at all. Thieves in Maple World are those who fight with sharp daggers and throwing stars from the shadows. We don't always fight fair, but we always fight to win.");
		break;
	case 2:
		qm.sendNextPrev("As a job. Thieves attack enemies with swift. powerful skills. Though their HP is a bit low, they make it up with speed, so you had better learn to dodge. High luck allows them to land critical hits often, as well.");
		break;
	case 3:
		qm.sendAcceptDecline("Now, will you join us on the path of Thieves? If you decide to do so, I will bring you to the #bsecret Theives' Hideout in Kerning City#k using my power as the Job instructor... You should feel honored. #bBut if you prefer a different job, I will help you find the other paths#k.");
		break;
	case 4:
		qm.getPlayer().changeMap(qm.getMap(103000003), qm.getMap(103000003).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(1404).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
		break;
	case 5:
		if (selection == 1)
			qm.sendNext("Warrior? Well... I guess that works. Dances with Balrog will be contacting you shortly. Keep your eyes on the #bQuest Notifier on the left#k.");
		if (selection == 2)
			qm.sendNext("Magician? Well... I guess that works. Grendel the Really Old will be contacting you shortly. Keep your eyes on the #bQuest Notifier on the left#k.");
		if (selection == 3)
			qm.sendNext("Bowman? Well... I guess that works. Athena Pierce will be contacting you shortly. Keep your eyes on the #bQuest Notifier on the left#k.");
		if (selection == 5) {
			qm.sendNext("Pirate? Well... I guess that works. Kyrin will be contacting you shortly. Keep your eyes on the #bQuest Notifier on the left#k.");
			}
			Packages.server.quest.MapleQuest.getInstance(1406).forceStart(qm.getPlayer(), qm.getNpc(), selection);
			break;
	case 6:
		qm.dispose();
}
}


function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Your heart is still not ready? Hmph. I'm unimpressed.");
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
		qm.sendYesNo("Welcome to the Thieves' Hideout. Only those who are invited will ever find it. Try not to get lost on the way out. So, are you ready to become a Thief?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1404)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 3 || qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 3) {
			qm.sendOk("Empty #b3 slots in your Equip tab#k and #b3 slots in your Use tab#k. I wanted to give you a useful weapon now that you've become a Thief, but you're going to need some pocket space first.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1404).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(2899).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeJob(400);
			qm.resetStats(4, 25, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1142107, 1);
			qm.gainItem(1472061, 1);
			qm.gainItem(1332063, 1);
			qm.gainItem(2070015, 500);
			qm.gainItem(2070015, 500);
			qm.gainItem(2070015, 500);
			}
			qm.sendNext("With this, you have become a Thief. Since you can use Thief skills now, open your Skill window and have a look. As you level up, you will be able to learn more skills.");
			break;
	case 2:
		qm.sendNextPrev("But skills aren't enough, right? A true Thief must have the stats to match! A Thief uses LUK as the main stat and DEX as the secondary stat. If you don't know how to raise stats, just use #bAuto-Assign#k.");
		break;
	case 3:
		qm.sendNextPrev("Oh, I gave you a little gift, too. I expanded a few slots in your Equip and ETC item tabs. Bigger Inventory, better life, I always say.");
		break;
	case 4:
		qm.sendNextPrev("Now a word of warning. Everyone loses some of their earned EXP when they fall in battle. Be careful. You don't want to lost anything you worked to get, eh?");
		break;
	case 5:
		qm.sendNextPrev("Right, that's it. Take the equipment I gave you, and use it to train your skills as a Thief.");
		break;
	case 6:
		qm.dispose();
}
}
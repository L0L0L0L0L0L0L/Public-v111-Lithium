/*
	名字:	達克魯
	地圖:	墮落城市酒吧
	描述:	103000003
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status == 2) {
		cm.dispose();
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2351)).getStatus() != 1 || cm.getPlayer().getJob() == 400) {
			cm.sendOk("A secret conversation? Thieves may trade in secrets, but such things are reserved for their enemies.");
			cm.dispose();
			return;
			}
			cm.sendNext("Welcome to the Thieves' Hideout. Only those who are invited will ever find it. Try not to get lost on the way out.");
			break;
	case 1:
		cm.sendNextPrev("I'm sure you came here because you want to be a Thief, correct? I hope your heart is in this...many Beginners think they have what it takes, but run screaming the moment they see me. They must really be afraid of the challenges Thieves face...");
		break;
	case 2:
		cm.sendYesNo("All right, you ready to become a Thief?");
		break;
	case 3:
		if (cm.getPlayer().getLevel() < 10) {
			cm.sendOk("Train a bit more until you reach the base requirements and I can show you the way of the #rThief#k.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 3) {
			cm.sendOk("Empty #b3 slots in your Equip tab#k and #b3 slots in your Use tab#k. I wanted to give you a useful weapon now that you've become a Thief, but you're going to need some pocket space first.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7635)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(7635).forceStart(cm.getPlayer(), 0, 1);
			cm.getPlayer().changeJob(400);
			cm.resetStats(4, 25, 4, 4);
			cm.expandInventory(1, 4);
			cm.expandInventory(4, 4);
			cm.gainItem(1332063, 1);
			cm.gainItem(1142107, 1);
			}
			cm.sendNext("With this, you have become a Thief. Since you can use Thief skills now, open your Skill window and have a look. As you level up, you will be able to learn more skills.");
			break;
	case 4:
		cm.sendNextPrev("But skills aren't enough, right? A true Thief must have the stats to match! A Thief uses LUK as the main stat and DEX as the secondary stat. If you don't know how to raise stats, just use #bAuto-Assign#k.");
		break;
	case 5:
		cm.sendNextPrev("Oh, I gave you a little gift, too. I expanded a few slots in your Equip and ETC item tabs. Bigger Inventory, better life, I always say.");
		break;
	case 6:
		cm.sendNextPrev("Now a word of warning. Everyone loses some of their earned EXP when they fall in battle. Be careful. You don't want to lost anything you worked to get, eh?");
		break;
	case 7:
		cm.sendNextPrev("Right, that's it. Take the equipment I gave you, and use it to train your skills as a Thief.");
		break;
	case 8:
		cm.dispose();
}
}
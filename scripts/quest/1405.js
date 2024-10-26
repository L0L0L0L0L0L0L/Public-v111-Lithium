/*
	名字:	如果想要轉職為海盜請前往鯨魚號
	地圖:	航海室
	描述:	120000101
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
		qm.dispose();
		return;
		}
		if (status == 5) {
		qm.sendSimple("You wish to choose a different path? Hey, if that's what you want. Which job will you choose, then? \r\n#b#L1#Warrior#l\r\n#b#L2#Magician#l\r\n#b#L3#Bowman#l\r\n#b#L4#Thief#l");
		status = 6;
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
		qm.sendNext("#h0#...? Oh, right! Mai mentioned you. Yeah...you look pretty good to me. I'm Kyrin, the captain of the Nautilus and the Pirate Job Instructor. I heard you are interested in becoming a Pirate. Is that true?");
		break;
	case 1:
		qm.sendNextPrev("If that's the case, I should tell you a bit about myself first. I brought the pirates together to start working against the Black Mage, the great evil that threatens all of Maple World. Turns out the hero business is more profitable than looting and pillaging!");
		break;
	case 2:
		qm.sendNextPrev("If you become a Pirate, you can help investigate the Black Mage's plots, and assist in the defense of Maple World. Keep in mind that I won't make you do anything...I'm primarily a Job Instructor, and just guide the pirates in a general sense.");
		break;
	case 3:
		qm.sendNextPrev("But, I know you would help us fight the Black Mage. You have that gleam in your eye that all heroes do. Anyway, I've said my piece. That was just for your information. What's really important is coming up next.");
		break;
	case 4:
		qm.sendNextPrev("There are two paths you can take as a Pirate. You can fight with guns, or with your fists. Your weapons and skills will be quite different depending on what you pick, but both are still Pirates. And that means you're gonna look GOOD while you fight!");
		break;
	case 5:
		qm.sendAcceptDecline("Okay, I've said enough. So, Pirate. In, or out? If you want to become a Pirate, I'll bring you to the Nautilus right now using my power as a Job Instructor. #rAnd if you don't, I'll help you find the right job for you#k.");
		break;
	case 6:
		qm.getPlayer().changeMap(qm.getMap(120000101), qm.getMap(120000101).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(1405).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
		break;
	case 7:
		if (selection == 1)
			qm.sendNext("You choose the path of a Warrior? Alright, then. Dances with Balrog will be contacting you. Watch the #bQuest Notifier on the left#k.");
		if (selection == 2)
			qm.sendNext("You choose the path of a Magician? Alright, then. Grendel the Really Old will be contacting you. Watch the #bQuest Notifier on the left#k.");
		if (selection == 3)
			qm.sendNext("You choose the path of a Bowman? Alright, then. Bowman is a good job also. Athena Pierce in Henesys will guide you. Watch the #bQuest Notifier on the left#k.");
		if (selection == 4) {
			qm.sendNext("You choose the path of a Thief? Alright, then. Dark Lord will be contacting you. Watch the #bQuest Notifier on the left#k.");
			}
			Packages.server.quest.MapleQuest.getInstance(1406).forceStart(qm.getPlayer(), qm.getNpc(), selection);
			break;
	case 8:
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
		qm.sendNext("Your heart isn't in this? That's too bad.");
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
		qm.sendYesNo("Well, nice to finally talk to you, face-to-face. Are you surprised? Yeah, I get that a lot. I know I look young, but don't underestimate me. Right, so, let's make you a Pirate!");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1405)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 3 || qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 3) {
			qm.sendOk("Why do you have so much stuff in your inventory? Empty #b3 slots in your Equip tab#k and #b3 slots in Use tab#k. Unless you don't want your Pirate weapons?");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1405).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(2945).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeJob(500);
			qm.resetStats(4, 20, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1142107, 1);
			qm.gainItem(1482014, 1);
			qm.gainItem(1492014, 1);
			qm.gainItem(2330000, 600);
			qm.gainItem(2330000, 600);
			qm.gainItem(2330000, 600);
			}
			qm.sendNext("Well, you are truly one of us now. Open up your Skill window and check out your new Pirate abilities. I also gave you a few extra SP, so you can go ahead and boost some of your new Skills. You'll get more skills at higher levels, so I suggest you have a plan for your training.");
			break;
	case 2:
		qm.sendNextPrev("Skills alone do not make you a great pirate. You have to distribute your stats like a pirate, too! If you're hoping to become a Brawler, invest heavily in STR. If you're more the Gunslinger type, then go for DEX. And if you just have no idea, use the #bAuto-Assign#k option. Simple, and effective.");
		break;
	case 3:
		qm.sendNextPrev("Oh, I gave you a little gift, too. I expanded a few slots in your Equip and ETC item tabs, so you should have plenty of room for your spoils!");
		break;
	case 4:
		qm.sendNextPrev("Now, there is one last thing that you need to remember. More than anything else, you need to keep your HP up. If you fall in battle, you'll lose some of your EXP. And I'm SURE you don't want that, right?");
		break;
	case 5:
		qm.sendNextPrev("Well, that's it! I have taught you everything you need to know. I also gave you a few decent weapons, so make good use of them. Now, go forth, grow stronger, and kick around the Black Mage's minions, if you get the chance!");
		break;
	case 6:
		qm.dispose();
}
}
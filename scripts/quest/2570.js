/*
	名字:	轉職成重砲指揮官
	地圖:	航海室
	描述:	120000101
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 5) {
		qm.sendOk("Oh. So... you want to be something else? I understand... but Cutter might not...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2570)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2570).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 4 && qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2570)).getStatus() < 2) {
			qm.sendOk("Why do you have so much stuff in your inventory? Empty #b4 slots#k in your #bEquip tab#k so I can give you some starter gear.");
			qm.dispose();
			return;
			}
			qm.sendNext("Good to see you, #h0#. So...you're the one that helped Cutter return. I saw you were hurt when you first arrived...are you okay now? You must be made of stern stuff. No wonder Cutter regards you so highly. My name is Kyrin. I'm captain of the Nautilus, as well as the Job Instructor for Pirates.");
			break;
	case 1:
		qm.sendNextPrev("Cutter told you that he wants you to become a #bCannoneer#k, right? I agree with him, but I'm worried that your heart might not be in it. Maybe if you knew more about the pirates, you would be more interested. Let me tell you a little about us.");
		break;
	case 2:
		qm.sendNextPrev("I brought the pirates together to start working against the Black Mage, the great evil that threatens all of Maple World. Turns out the hero business is more profitable than looting and pillaging!");
		break;
	case 3:
		qm.sendNextPrev("If you become a Pirate, you can help investigate the Black Mage's plots, and assist in the defense of Maple World. Keep in mind that I won't make you do anything...I'm primarily a Job Instructor, and just guide the pirates in a general sense.");
		break;
	case 4:
		qm.sendNextPrev("But, I know you would help us fight the Black Mage. You have that gleam in your eye that all heroes do. Anyway, I've said my piece.");
		break;
	case 5:
		qm.sendYesNo("Now, it's all up to you. Do you wish to join the pirates? I would be quite pleased if you became a Cannon Shooter.");
		break;
	case 6:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2570)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2570).forceComplete(qm.getPlayer(), qm.getNpc());
			Packages.server.quest.MapleQuest.getInstance(2945).forceStart(qm.getPlayer(), qm.getNpc(), 1);
			qm.getPlayer().changeJob(501);
			qm.resetStats(35, 4, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1142107, 1);
			qm.gainItem(1002610, 1);
			qm.gainItem(1052095, 1);
			qm.gainItem(1532000, 1);
			}
			qm.sendNext("Well, you are truly one of us now. Open up your Skill window and check out your new Pirate abilities. I also gave you a few extra SP, so you can go ahead and boost some of your new skills. You'll get more skills at higher levels, so I suggest you have a plan for your training.");
			break;
	case 7:
		qm.sendNextPrev("Skills alone do not make you a great pirate. You have to distribute your stats like a pirate, too! If you're hoping to become a Cannoneer, invest heavily in STR so you can hold that heavy cannon of yours. And if you just have no idea, use the #bauto-distribute#k option. Simple, and effective.");
		break;
	case 8:
		qm.sendNextPrev("Oh, I gave you a little gift, too. I expanded a few slots in your Equip and ETC Item tabs, so you should have plenty of room for your spoils!");
		break;
	case 9:
		qm.sendNextPrev("Now, there is one last thing that you need to remember. More than anything else, you need to keep your HP up. If you fall in battle, you'll lose some of your EXP. And I'm SURE you don't want that. right?");
		break;
	case 10:
		qm.sendNextPrev("Well, that's it! I have taught you everything you need to know. I also gave you a few decent weapons, so make good use of them. Now, go forth, grow stronger, and kick around the Black Mage's minions, if you get the chance!");
		break;
	case 11:
		qm.dispose();
}
}
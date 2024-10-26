/*
	名字:	狂劍士之路
	地圖:	勇士聖殿
	描述:	102000003
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
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
		qm.sendNext("You wish to learn the way of the Fighter? Fighters are Warriors at their most essential, using #bswords#k and #baxes#k to cut their enemies down.");
		break;
	case 1:
		qm.sendNextPrev("Like a true Warrior, The Fighter has many self-enhancing skills. #bWeapon Mastery#k allows them to use their weapons more skillfully, #bFinal Attack#k deals devastating damage, #bWeapon Booster#k makes them attack with lighting speed, and #bPhysical Training#k gives them the endurance of a brick wall.");
		break;
	case 2:
		qm.sendNextPrev("Of course, that's just the tip of the iceberg. #bBrandish#k lets you strike with a sword or an axes twice in a row. If you master this skill, hunting will be a piece of cake!");
		break;
	case 3:
		qm.sendNextPrev("Using #bCombo Attack#k lets you build your Combo Count and unlock more powerful combo skills.");
		break;
	case 4:
		qm.sendNextPrev("When faced with a tough enemies, Fighters can use #bPower Reflection#k to send a portion of the damage they take right back at their foe. By controlling the flow of battle, Fighters dominate any monster they face.");
		break;
	case 5:
		qm.sendNextPrev("ls this the path you want to follow? If so, bring me #r30 Dark Marbles#k, and you will become a true Fighter.");
		break;
	case 6:
		qm.sendAcceptDecline("If you don't want to do this, reject the quest right now. It's not a bad idea to hear about the other paths you can take. Well? Do you want to begin the test to become a Fighter?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(1411).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910230000), qm.getMap(910230000).getPortal(1));
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
		qm.sendYesNo("These are the Dark Marbles? Magnificent! Yes, you have just what it takes. I'll ask you one more time: Do you wish to become a Fighter?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1411)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1411).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(110);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("All right! From now on, you are a #bFighter#k! Pursue power and never stop fighting!");
			break;
	case 2:
		qm.sendPrev("Your strength will continue to grow. You must use it to protect the weak...that is the responsibility I give to you.");
		break;
	case 3:
		qm.dispose();
}
}
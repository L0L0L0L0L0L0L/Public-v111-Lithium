/*
	名字:	見習騎士之路
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
		qm.sendNext("You wish to follow the path of the Page? Pages have ironclad discipline, impenetrable defenses, and the power to protect others. Their main weapons are #bsword#k and #bblunt weapon#k.");
		break;
	case 1:
		qm.sendNextPrev("Like a true Warrior, the Page has many self-enhancing skills. #bWeapon Mastery#k allows you to become more proficient with your weapons, #bFinal Attack#k allows you to deal tremendous damage, #bWeapon Booster#k increases your attack speed, and #bPhysical Training#k toughens your body.");
		break;
	case 2://And that's not all. Pages have a skill called #bThreaten#k that intimidates and weakens multiple enemies. I wouldn't want to be on the other side of that move.
		qm.sendNextPrev("Pages can also #bThreaten#k enemies to make them weaker for a while.");
		break;
	case 3://Of course, they have even more in store. #bFlame Charge and Blizzard Charge#k infuse your weapon with flames or frost. Imagine the power!
		qm.sendNextPrev("When under attack, a Page can rely on #bPower Guard#k to reflect part of the damage back to the enemy.");
		break;
	case 4://Use #bElemental Charge#k to stack multiple elements that enhance your strength. It's very useful, so don't forget about it when you become a Page.
		qm.sendNextPrev("Of course, that's just the beginning. With #bGround Smash#k, Pages can send enemies flying.");
		break;
	case 5:
		qm.sendNextPrev("Is this the path you want to follow? If so, bring me #r30 Dark Marbles#k, and you will become a true Page.");
		break;
	case 6:
		qm.sendAcceptDecline("The test will begin as soon as you accept the quest. If you're not absolutely sure about this, stop now, it's not a bed idea to hold off and hear about the other paths available to you. So...do you want to begin the test to become a Page?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(1412).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendYesNo("When it comes to the Dark Marble, you don't disappoint. Excellent. Your courage and composure prove to me that you are ready to become a Page. Do you accept this Path?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1412)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1412).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(120);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("All right! From now on, you are a #bPage#k! Put your lite on the line to protect those you love!");
			break;
	case 2:
		qm.sendPrev("Your strength will continue to grow. You must use it to protect the weak...that is the responsibility I give to you.");
		break;
	case 3:
		qm.dispose();
}
}
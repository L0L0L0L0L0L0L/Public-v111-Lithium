/*
	名字:	槍騎兵之路
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
		qm.sendNext("You wish to follow the path of the Spearman? Spearmen are masters of polearms who keep their enemies at bay with their long reach and flashy attacks.");
		break;
	case 1:
		qm.sendNextPrev("Like a true Warrior, the Spearman has many self-enhancing skills. #bWeapon Mastery#k allows them to use their weapons more skillfully, #bFinal Attack#k deals devastating damage, #bWeapon Booster#k makes them attack with lightning speed, and #bPhysical Training#k gives them the endurance of a brick wall.");
		break;
	case 2:
		qm.sendNextPrev("Of course, they have even more powerful attack skills as well. #bPiercing Drive#k has a higher critical rate for nearby enemies and greater total damage for enemies further away.");
		break;
	case 3:
		qm.sendNextPrev("The most famous Spearman skill is of course #bHyper Body#k. This skill increases the Max HP and MP of your entire party, and even at high levels it's extremely effective.");
		break;
	case 4:
		qm.sendNextPrev("Of course, we can't forget about #bIron Will#k. It increases the party's weapon defense and magic defense. If you've got the potions, it's a handy ability to use.");
		break;
	case 5:
		qm.sendNextPrev("Is this the path you want to follow? If so, bring me #r30 Dark Marbles#k, and you will become a true Spearman.");
		break;
	case 6:
		qm.sendAcceptDecline("The test will begin as soon as you accept the quest. If you're not absolutely sure about this, stop now it's not a bed idea to hold off and hear about the other paths available to you. So...do you want to begin the test to become a Spearman?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(1413).forceStart(qm.getPlayer(), qm.getNpc(), null);
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
		qm.sendYesNo("You did well with my Dark Marble challenge. I could see the Spearman potential in you from the moment we met. Are you prepared to become a Spearman?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1413)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1413).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(130);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("All right! From now on, you are a #bSpearman#k! Pummel your enemies with style and finesse!");
			break;
	case 2:
		qm.sendOk("Your strength will continue to grow. You must use it to protect the weak...that is the responsibility I give to you.");
		break;
	case 3:
		qm.dispose();
}
}
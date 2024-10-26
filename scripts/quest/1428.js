/*
	名字:	重砲兵之路2
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
		if (status > 4) {
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
		qm.sendNext("I'm sure you're getting used to the massive power of your Hand Cannon. Of course, you can access even more power once you advance to a full Cannoneer. Shall I show you how to do some real damage?");
		break;
	case 1:
		qm.sendNextPrev("You'll always want to start with the basics, of course. #bCannon Mastery#k, #bCannon Booster#k, and #bCritical Fire#k are all necessary for you to fire your cannon quickly and accurately.");
		break;
	case 2:
		qm.sendNextPrev("Of course, the real fun comes from attack skills. #bScatter Shot#k fires multiple small bombs at multiple enemies in front of you.");
		break;
	case 3:
		qm.sendNextPrev("There are also skills that utilize your friend, Monkey. #bBarrel Bomb#k rolls a barrel full of bombs at your enemies, knocking them back. #bMonkey Magic#k gives you buffs using the magic of Monkey. He's a really handy guy!");
		break;
	case 4:
		qm.sendNextPrev("Shall we begin the test to become a Cannon Trooper? The test itself is simple. Just is enter the prepared test site, eliminate all the monsters, and bring the #ritem that they drop#k. Since they have high defense, however, it won't be easy to defeat them. Remember this.");
		break;
	case 5:
		qm.sendAcceptDecline("If you run out of potions in the middle of the test, you have to #bforfeit the quest and restart#k, so make sure you prepare plenty of potions. Let's start the test right away. When you accept, I'll send you to the test site.");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(1428).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(912040000), qm.getMap(912040000).getPortal(1));
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
		qm.sendYesNo("I see you brought the Dark Marble. Excellent work! I think you might be better at this than even Cutter expected. Right, I'll make you a Cannoneer now.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1428)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(1428).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(530);
			qm.removeAll(4031013);
			qm.gainItem(1142108, 1);
			}
			qm.sendNext("From now on, you are a full #bCannoneer#k. As a Cannoneer, you will blow your enemies away at long range, and look awesome doing it. I expect you to devote yourself fully to your training, and push your destructive limits!");
			break;
	case 2:
		qm.sendNextPrev("To carry such heavy cannons, you'll need more space, right? I raised your Master of Organization skill even more. Check out your spacious Inventory!");
		break;
	case 3:
		qm.sendPrev("A Cannoneer must be strong, but it's not right to use that strength on the weak. Using your power for good... That's even more difficult than becoming stronger.");
		break;
	case 4:
		qm.dispose();
}
}
/*
    Name:    Flashman
    Map:     Challenge Entrance
    Description:    670010200
*/

var item = [4031594, 4031595, 4031596, 4031597];

function start() {
	switch(cm.getPlayer().getMap().getId()) {
		case 670010200:
			var eim = cm.getPlayer().getEventInstance();
			if (eim.getProperty("stage0") == 2) {
				cm.sendOk("The quest is completed. You can now pass through the shattered magic mirror and return to Amias. Good luck.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().itemQuantity(4031595)) {
				cm.sendOk("You have successfully broken the magician's magic mirror! Now you can pass through the shattered mirror and return to Amias. Good luck.");
				eim.setProperty("stage0", 2);
				cm.gainItem(4031595, -1);
				cm.dispose();
				return;
			}
			if (eim.getProperty("stage0") == 1) {
				cm.sendOk("Defeat the #o9400518# that appears in the map and obtain a #b#z4031596##k. Use #z4031596# to break the magician's mirror. After completing the task, bring me a piece of #b#z4031595##k.");
				cm.dispose();
				return;
			}
			if (eim.getProperty("stage0") == 0 && cm.getPlayer().getMap().getAllMonstersThreadsafe().size() != 0) {
				cm.sendOk("Your task is to break the magician's mirror. To do this, first eliminate all monsters in the map, then return to me for further instructions. Please choose the portal corresponding to your gender and defeat all monsters there.\r\n#bLadies go left, gentlemen go right.");
				cm.dispose();
				return;
			}
			if (eim.getProperty("stage0") == 0 && cm.getPlayer().getMap().getAllMonstersThreadsafe().size() == 0) {
				cm.sendOk("#o9400518# has appeared in the map. Defeat her and obtain a #b#z4031596##k. Use #z4031596# to break the magician's mirror. After completing the task, #bbring me a piece of #z4031595#.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Flashman: The magic butterfly has appeared in the map. Defeat her and obtain the flying hammer."));
				cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400518), new java.awt.Point(-245, 810));
				eim.setProperty("stage0", 1);
			}
			cm.dispose();
			break;
		case 670011000:
			cm.sendYesNo("Are you ready to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
	}
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < item.length; i++)
			cm.removeAll(item[i]);
		cm.getPlayer().changeMap(cm.getMap(670010000), cm.getMap(670010000).getPortal(1));
	}
	cm.dispose();
}

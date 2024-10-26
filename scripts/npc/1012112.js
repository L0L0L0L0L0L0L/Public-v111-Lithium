/*
	Name: Dali
	Map: Cupid Park
	Description: 100000200
*/

var item = new Array(1472010, 1402010, 1382001, 1452000, 1302026, 1472023, 1472019, 1472022, 1102011, 1472033, 1402017, 1442009, 1472013, 1472021, 1472075, 2000004, 1382005, 1332030, 1432001, 2044901, 2044902, 1422025, 1442015, 1432017, 1442025, 1312004, 1322015, 1462005, 1312012, 1302003, 1442004, 1302028, 1402006, 1322000, 2022195, 1412001, 1372002, 1472009, 1422001, 1462000, 1412004, 1452008, 1432016, 1302021, 4000176, 1442000, 2000005, 2022113, 1432013, 1322024, 1322012, 1302012, 1102028, 1452006, 1302013, 1462007, 1332016, 2043102, 2043112, 2044101, 2044002, 2044001, 2041011, 2041010, 2044602, 2044601, 2043305, 2044401, 2044314, 2043702, 2043701, 1432004, 1472054, 1462006, 1472012, 1442010, 1472008, 1472005, 1382006, 1422007, 1332000, 1402000, 1452007, 1402009, 1102029, 1402001, 1372005, 1442021, 2040915, 2040919, 2040920, 2040914, 2041301, 2041304, 2041307, 2041310, 2044803, 2044804);

function start() {
	if (cm.getPlayer().getMap().getId() == 910010500)
		cm.sendSimple("#e<Team Quest: Protect Moon Bunny>#n \r\n\r\nIt is said that the mysterious Moon Bunny only appears on the Moon Hill during a full moon. To meet the Moon Bunny, you need to plant a Moon Plant seed in the designated spot to summon a full moon and lure the Moon Bunny out. If you want to collect the rice cakes made by the Moon Bunny, you must protect it from vicious animals.\r\n\r\n Number of players: 2~6 \r\n Level range: 20~69 \r\n Time limit: 10 minutes\r\n#L0##bEnter the quest map#l\r\n#L1#Exchange for #z1002798##l");
	else
		cm.sendSimple(cm.getPlayer().getMap().getId() == 100000200 ? "Hey! Have you heard of the 'Protect Moon Bunny' event? If you can find some rice cakes made by Moon Bunny, you can exchange them for gifts here.\r\n#L2##bEnter #m910010500##l" : "Thank you, are you ready to leave? I have prepared a small mystery gift for you, I hope you'll like it.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/5/0# \r\n#L2##bLeave here#l");
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("I'm sorry, the monsters inside are dangerous, I can't let you go alone.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("If you want to proceed with this task, please have your party leader talk to me.");
				cm.dispose();
				return;
			}
			var chat = "Sorry, some party members don't meet the entry requirements or are not in the right map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 20~69 \r\n\r\n";
			var disqualified = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++) {
				if (party.get(i).getLevel() < 20 || party.get(i).getLevel() > 69 || party.get(i).getMapid() != 910010500 || party.size() < 2) {
					chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
					disqualified++;
				}
			}
			if (disqualified != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("HenesysPQ");
			var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.dispose();
				return;
			}
			cm.sendOk("The 'Protect Moon Bunny' mission is in progress, please try another channel.");
			break;
		case 1:
			if (cm.getPlayer().itemQuantity(4001101) < 10) {
				cm.sendOk("You need 10 #v4001101##b#t4001101##k.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in your equipment inventory."));
				cm.dispose();
				return;
			}
			cm.gainItem(4001101, -10);
			cm.gainItem(1002798, 1);
			break;
		case 2:
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1 && cm.getPlayer().getMap().getId() != 100000200) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in your equipment inventory."));
				cm.dispose();
				return;
			}
			cm.gainItem(item[Math.floor(Math.random() * item.length)], cm.getPlayer().getMap().getId() != 100000200 ? 1 : 0);
			var map = cm.getPlayer().getMap().getId() == 100000200 ? 910010500 : 100000200;
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(1));
	}
	cm.dispose();
}

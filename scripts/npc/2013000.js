/*
	名字:	溫莉
	地圖:	疑問之塔
	描述:	200080101
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 920010000) {
		cm.sendOk("我們必須先救出幫傭易克，它非常瞭解女神塔里的情況，請收集#b20個#z4001063##k丟去發光的球球哪裡，就可以解開封印。");
		cm.dispose();
		return;
		}
		var chat = "#e<組隊任務:女神塔>#n\r\n\r\n自從雅典娜女神失蹤後，我們的庇護所已經被強大的精靈力量佔領，它們的領袖，爸爸精靈，目前掌握著王位，可能知道她的下落，所以我們強烈要求找到一隻勇敢的英雄小組，沖進我們的避難所，消滅裡面的惡靈，並把我們的女神解救出來，你願意幫助我們嗎？\r\n\r\n Number of players: 2~6 \r\n Level range: 70~119 \r\n Time limit: 20minutes #b";
		item = ["進入任務地圖", "兌換#z1082232#", "兌換#z1082322#", "兌換#z1072455#", "兌換#z1072534#"];
		for (var i = 0; i < item.length; i++)
		chat += "\r\n#L" + i + "#" + item[i] + "#l";
		cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0 && selection < 1) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("很抱歉，裡面的怪物很危險，我不能讓你單獨去冒險。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("如果妳想執行這項任務，請告訴妳的組長與我談話。");
			cm.dispose();
			return;
			}
			var chat = "很抱歉，因為你的小组规模不在入场要求範圍大小內，一些组員沒有資格嘗試此任務，或者他們不在此地圖中。\r\n\r\n Number of players: 2~6 \r\n Level range: 70~119 \r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 70 || party.get(i).getLevel() > 119 || party.get(i).getMapid() != 200080101 || party.size() < 2) {
			chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
			chenhui++;
			}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("OrbisPQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendOk("女神塔任務正在執行中，請嘗試其它頻道。");
			}
	if (mode > 0 && selection < 5) {
		item = [1082232, 1082322, 1072455, 1072534];
		qty = [10, 20, 10, 20];

		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "裝備道具視窗的欄位不足"));
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4001158) < qty[selection -1]) {
			cm.sendOk("兌換#b#z" + item[selection -1] + "##k需要#r" + qty[selection -1] + "#k個 #v4001158##b#t4001158##k。");
			cm.dispose();
			return;
			}
			cm.gainItem(item[selection -1], 1);
			cm.gainItem(4001158, -qty[selection -1]);
			cm.sendOk("謝謝你對女神之塔的幫助，請拿好你的物品。");
			}
			cm.dispose();
}
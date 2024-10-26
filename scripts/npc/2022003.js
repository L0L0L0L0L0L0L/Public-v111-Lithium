/*
	名字:	邪摩斯
	地圖:	邪摩斯的單人房
	描述:	211000002
*/

function start() {
	var chat = "#e<組隊任務：儒怪皇帝的復活>#n\r\n\r\n侏儒怪皇帝雷克斯馬上就要復活了，用來鎮壓它的封印石力量越來越弱，看來只能到它的封印地去封锁它復活了……需要的話，我可以把你帶到那裡，但是你必須保證我的安全。\r\n\r\n Number of players: 2~6 \r\n Level range: 120+ \r\n Time limit: 20minutes#b";
	item = ["給我一個萬年冰河水用空瓶並送我去冰風谷入口", "進入任務地圖", "兌換#z1032102#", "兌換#z1032103#", "兌換#z1032104#"];
	for (var i = 0; i < item.length; i++)
	chat += "\r\n#L" + i + "#" + item[i] + "#l";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		if (cm.getPlayer().itemQuantity(2022698)) {
			cm.sendOk("你已經有萬年冰河水，不能在多給了。");
			cm.dispose();
			return;
			}
			cm.gainItem(4032649, cm.getPlayer().itemQuantity(4032649) ? 0 : 1);
			cm.getPlayer().changeMap(cm.getMap(921120000), cm.getMap(921120000).getPortal(1));
			cm.sendOk("請拿好瓶子，通過右上角的通道可以找到取水點，祝你好運。");
			break;
	case 1:
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
			var chat = "很抱歉，因為你的小组规模不在入场要求範圍大小內，一些组員沒有資格嘗試此任務，或者他們不在此地圖中。\r\n\r\n Number of players: 2~6 \r\n Level range: 120+ \r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 120 || party.get(i).getMapid() != 211000002 || party.size() < 2) {
			chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
			chenhui++;
			}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Rex");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendOk("儒怪皇帝的復活任務正在執行中，請嘗試其它頻道。");
			break;
	default:
		if (mode > 0) {
		if (!cm.getPlayer().itemQuantity(1032075 + selection) && cm.getPlayer().itemQuantity(4001530) < 20) {
			cm.sendOk("兌換#b#z" + (1032100 + selection) + "##k需要1個#b#z" + (1032075 + selection) + "##k+#r20個 #v4001530##b#t4001530##k。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "裝備道具視窗的欄位不足"));
			cm.dispose();
			return;
			}
			cm.gainItem(4001530, -20);
			cm.gainItem(1032075 + selection, -1);
			cm.gainItem(1032100 + selection, 1);
			cm.sendOk("謝謝，請拿好你的物品。");
			}
			}
			cm.dispose();
}
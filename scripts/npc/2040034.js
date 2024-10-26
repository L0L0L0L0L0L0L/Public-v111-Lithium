/*
	名字:	標示牌
	地圖:	愛奧斯塔101樓
	描述:	221023300
*/

function start() {
	cm.sendSimple("#e<組隊任務：次元裂縫>#n \r\n\r\n時間裂縫已經出現在玩具城地區，我們需要勇敢的冒險家來打敗入侵的怪物。拜託了，請你找幾個可靠的朋友幫我們拯救玩具城，你們需要進去挑戰怪物，解開謎團，並最終挑戰強大的#o9300012#。\r\n\r\n Number of players: 2~6 \r\n Level range: 20~69 \r\n Time limit: 20minutes\r\n#L0##b進入任務地圖#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
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
			var chat = "很抱歉，因為你的小组规模不在入场要求範圍大小內，一些组員沒有資格嘗試此任務，或者他們不在此地圖中。\r\n\r\nNumber of players: 2~6 \r\nLevel range: 20~69 \r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 20 || party.get(i).getLevel() > 69 || party.get(i).getMapid() != 221023300 || party.size() < 2) {
			chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
			chenhui++;
			}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("LudiPQ");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendOk("次元裂縫任務正在執行中，請嘗試其它頻道。");
			}
			cm.dispose();
}
/*
	名字:	隱藏地圖
	地圖:	隱藏之塔入口&amp;lt;準備室&gt;
	描述:	921160000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Prison");

	eim.setInstanceMap(921160100).resetFully();
	eim.setInstanceMap(921160200).resetFully();
	eim.setInstanceMap(921160300).resetFully();
	eim.setInstanceMap(921160310).resetFully();
	eim.setInstanceMap(921160320).resetFully();
	eim.setInstanceMap(921160330).resetFully();
	eim.setInstanceMap(921160340).resetFully();
	eim.setInstanceMap(921160350).resetFully();
	eim.setInstanceMap(921160400).resetFully();
	eim.setInstanceMap(921160500).resetFully();
	eim.setInstanceMap(921160600).resetFully();
	eim.setInstanceMap(921160700).resetFully();

	eim.setInstanceMap(921160700).spawnNpc(9020006, new java.awt.Point(-761, -186));
	eim.setInstanceMap(921160700).spawnMonsterOnGroundBelow(em.getMonster(9300454), new java.awt.Point(-961, -186));

	eim.startEventTimer(20 * 60 * 1000); //20 mins

	eim.setProperty("entryTimestamp", "" + java.lang.System.currentTimeMillis());//標記時間

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(921160100);
	player.changeMap(map, map.getPortal(4));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if ((mobId == 9300450 || mobId == 9300451) && eim.getMapInstance(921160200).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage2") == null) {
		eim.getMapInstance(921160200).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(921160200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921160200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage2", 1);
		}
	if ((mobId == 9300450 || mobId == 9300452) && eim.getMapInstance(921160400).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage4") == null) {
		eim.getMapInstance(921160400).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(921160400).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921160400).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage4", 1);
		}
	if (mobId == 9300461) {
		eim.getMapInstance(921160700).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921160700).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	if (eim.getProperty("kentaSaving") != null && eim.getProperty("kentaSaving") != 0) {
		var timeLeft = parseInt(eim.getProperty("kentaSaving"));
		eim.setProperty("kentaSaving", 0);
		eim.getMapInstance(921160600).setSpawns(false);
		eim.getMapInstance(921160600).killAllMonsters(true);
		eim.restartEventTimer(timeLeft);
		eim.getMapInstance(921160600).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(921160600).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921160600).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		return;
		}
		eim.disposeIfPlayerBelow(100, 921160000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid == 921160600) {
		if (eim.getProperty("kentaSaving") == null) {
		var timeLeft = 1200000 - (java.lang.System.currentTimeMillis() - parseInt(eim.getProperty("entryTimestamp")));
		eim.setProperty("kentaSaving", "" + timeLeft);//記錄時間
		eim.restartEventTimer(3 * 60 * 1000);
		}
		}
	if (mapid < 921160100 || mapid > 921160700) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(921160000);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 921160000);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
/*
	名字:	隱藏地圖
	地圖:	危險之海岔道&amp;lt;準備室&gt;
	描述:	923040000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Kenta");

	eim.setProperty("stage", 0);

	eim.setInstanceMap(923040100).resetFully();
	eim.setInstanceMap(923040200).resetFully();

	eim.setInstanceMap(923040300).resetFully(false);
	eim.setInstanceMap(923040300).setSpawns(false);
	eim.setInstanceMap(923040300).spawnMonsterOnGroundBelow(em.getMonster(9300460), new java.awt.Point(68, 598));

	eim.setInstanceMap(923040400).resetFully();
	eim.setInstanceMap(923040400).spawnNpc(9020004, new java.awt.Point(-161, 123));
	eim.setInstanceMap(923040400).spawnMonsterOnGroundBelow(em.getMonster(9300461), new java.awt.Point(400, 123));
	eim.setInstanceMap(923040400).spawnMonsterOnGroundBelow(em.getMonster(9300468), new java.awt.Point(-1000, 123));

	eim.startEventTimer(20 * 60 * 1000); //20 mins

	eim.setProperty("entryTimestamp", "" + java.lang.System.currentTimeMillis());//標記時間

	eim.setProperty("whog_hp", 0);//給予HP條件
	respawnStages(eim);//加載血量監控

	return eim;
}

function respawnStages(eim) {//監控地圖時間
	checkHogHealth(eim);//監控血量
	eim.schedule("respawnStages", 10 * 1000);
}

function checkHogHealth(eim) {//監控地图血量
	var watchHog = eim.getMapInstance(923040300).getMonsterById(9300460);//讀取當前地圖
	if (watchHog != null) {
		var hp = watchHog.getHp();
		var oldHp = eim.getProperty("whog_hp");

	if (oldHp - hp > 700) {
		eim.getMapInstance(923040300).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please protect Kenta from harm."));
		}
		eim.setProperty("whog_hp", hp);
}
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(923040100);
	player.changeMap(map, map.getPortal(3));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if ((mobId == 9300444 || mobId == 9300445) && eim.getMapInstance(923040100).getAllMonstersThreadsafe().size() == 0 && eim.getProperty("limit") == null) {
		eim.getMapInstance(923040100).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(923040100).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(923040100).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("limit", 1);
		}
	if (mobId == 9300460) {
		eim.getMapInstance(923040300).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Saving Kenta failed."));
		eim.restartEventTimer(10 * 1000);
		eim.setProperty("out", 1);
		}
	if (mobId == 9300461 || mobId == 9300468) {
		var stage = parseInt(eim.getProperty("stage")) + 1;
		eim.setProperty("stage", stage);
		}
	if (eim.getProperty("stage") == 2) {
		eim.startEventTimer(3 * 60000);//60000 = 1分鐘
		eim.getMapInstance(923040400).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(923040400).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	if (eim.getProperty("kentaSaving") != null && eim.getProperty("kentaSaving") != 0 && eim.getProperty("out") == null) {
		var timeLeft = parseInt(eim.getProperty("kentaSaving"));
		eim.setProperty("kentaSaving", 0);
		eim.getMapInstance(923040300).setSpawns(false);
		eim.getMapInstance(923040300).killAllMonsters(true);
		eim.restartEventTimer(timeLeft);
		eim.getMapInstance(923040300).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(923040300).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setInstanceMap(923040300).spawnNpc(9020004, new java.awt.Point(68, 598));
		return;
		}
		eim.disposeIfPlayerBelow(100, 923040000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid == 923040300) {
		if (eim.getProperty("kentaSaving") == null) {
		var timeLeft = 1200000 - (java.lang.System.currentTimeMillis() - parseInt(eim.getProperty("entryTimestamp")));
		eim.setProperty("kentaSaving", "" + timeLeft);//記錄時間
		eim.restartEventTimer(3 * 60 * 1000);
		eim.getMapInstance(923040300).setSpawns(true);
		}
		}
	if (mapid < 923040100 || mapid > 923040400) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(923040000);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 923040000);
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
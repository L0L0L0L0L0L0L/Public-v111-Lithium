/*
	名字:	隱藏地圖
	地圖:	蒙特鳩祕密之室
	描述:	261000011
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Romeo");

	eim.setInstanceMap(926100000).resetFully();
	eim.setInstanceMap(926100001).resetFully();
	eim.setInstanceMap(926100100).resetFully();
	eim.setInstanceMap(926100200).resetFully();
	eim.setInstanceMap(926100201).resetFully();
	eim.setInstanceMap(926100202).resetFully();
	eim.setInstanceMap(926100203).resetFully();
	eim.setInstanceMap(926100300).resetFully();
	eim.setInstanceMap(926100301).resetFully();
	eim.setInstanceMap(926100302).resetFully();
	eim.setInstanceMap(926100303).resetFully();
	eim.setInstanceMap(926100304).resetFully();
	eim.setInstanceMap(926100400).resetFully();
	eim.setInstanceMap(926100401).resetFully();
	eim.setInstanceMap(926100500).resetFully();
	eim.setInstanceMap(926100600).resetFully();

	eim.setInstanceMap(926100203).spawnNpc(2112000, new java.awt.Point(200, 188));
	eim.setInstanceMap(926100401).spawnNpc(2112000, new java.awt.Point(200, 100));
	eim.setInstanceMap(926100500).spawnNpc(2112001, new java.awt.Point(200, 100));
	eim.setInstanceMap(926100600).spawnNpc(2112002, new java.awt.Point(400, 100));
	eim.setInstanceMap(926100600).spawnNpc(2112018, new java.awt.Point(200, 100));

	eim.setProperty("whog_hp", 0);//給予HP條件
	respawnStages(eim);//加載血量監控

	eim.startEventTimer(20 * 60 * 1000); //30 mins
	return eim;
}

function respawnStages(eim) {//監控地圖時間
	checkHogHealth(eim);//監控血量
	eim.schedule("respawnStages", 10 * 1000);
}

function checkHogHealth(eim) {//監控地图血量
	var watchHog = eim.getMapInstance(926100401).getMonsterById(9300137);//讀取當前地圖
	if (watchHog != null) {
		var hp = watchHog.getHp();
		var oldHp = eim.getProperty("whog_hp");

	if (oldHp - hp > 700) {    // or 400, if using mobHP / eventTime
		eim.getMapInstance(926100401).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please protect Juliet from harm."));
		}
		eim.setProperty("whog_hp", hp);
}
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(926100000);
	player.changeMap(map, map.getPortal(0));
	player.tryPartyQuest(1205);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if ((mobId == 9300145 || mobId == 9300146) && eim.getMapInstance(926100001).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(926100001).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(926100001).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926100001).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
	if ((mobId == 9300143 || mobId == 9300144) && eim.getMapInstance(926100203).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(926100203).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(926100203).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926100203).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(926100203).getReactorByName("rnj6_out").forceHitReactor(1);
		}
	if (mobId == 9300139 || mobId == 9300140) {
		eim.startEventTimer(3 * 60000);
		eim.setProperty("stage7", 2);
		eim.getMapInstance(926100401).killMonster(9300150);
		eim.getMapInstance(926100401).killMonster(9300150);
		eim.getMapInstance(926100401).setSpawns(false);//限制刷怪
		eim.getMapInstance(926100401).spawnNpc(2112006, new java.awt.Point(50, 100));
		eim.getMapInstance(926100401).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926100401).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
	if (mobId == 9300137) {
		eim.broadcastPlayerMsg(5, "Saving Juliet failed.");
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 926100700);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 926100000 || mapid > 926100600) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(926100700);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 926100700);
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
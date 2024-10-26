/*
	名字:	隱藏地圖
	地圖:	卡帕萊特祕密之室
	描述:	261000021
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Juliet");

	eim.setInstanceMap(926110000).resetFully();
	eim.setInstanceMap(926110001).resetFully();
	eim.setInstanceMap(926110100).resetFully();
	eim.setInstanceMap(926110200).resetFully();
	eim.setInstanceMap(926110201).resetFully();
	eim.setInstanceMap(926110202).resetFully();
	eim.setInstanceMap(926110203).resetFully();
	eim.setInstanceMap(926110300).resetFully();
	eim.setInstanceMap(926110301).resetFully();
	eim.setInstanceMap(926110302).resetFully();
	eim.setInstanceMap(926110303).resetFully();
	eim.setInstanceMap(926110304).resetFully();
	eim.setInstanceMap(926110400).resetFully();
	eim.setInstanceMap(926110401).resetFully();
	eim.setInstanceMap(926110500).resetFully();
	eim.setInstanceMap(926110600).resetFully();

	eim.setInstanceMap(926110203).spawnNpc(2112010, new java.awt.Point(200, 188));
	eim.setInstanceMap(926110401).spawnNpc(2112010, new java.awt.Point(200, 100));
	eim.setInstanceMap(926110500).spawnNpc(2112011, new java.awt.Point(200, 100));
	eim.setInstanceMap(926110600).spawnNpc(2112012, new java.awt.Point(400, 100));
	eim.setInstanceMap(926110600).spawnNpc(2112018, new java.awt.Point(200, 100));

	eim.setProperty("whog_hp", 0);//給予HP條件
	respawnStages(eim);//加載血量監控

	eim.startEventTimer(20 * 60 * 1000); //20 mins
	return eim;
}

function respawnStages(eim) {//監控地圖時間
	checkHogHealth(eim);//監控血量
	eim.schedule("respawnStages", 10 * 1000);
}

function checkHogHealth(eim) {//監控地图血量
	var watchHog = eim.getMapInstance(926110401).getMonsterById(9300138);//讀取當前地圖
	if (watchHog != null) {
		var hp = watchHog.getHp();
		var oldHp = eim.getProperty("whog_hp");

	if (oldHp - hp > 700) {    // or 400, if using mobHP / eventTime
		eim.getMapInstance(926110401).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please protect Romeo from harm."));
		}
		eim.setProperty("whog_hp", hp);
}
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(926110000);
	player.changeMap(map, map.getPortal(0));
	player.tryPartyQuest(1205);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if ((mobId == 9300145 || mobId == 9300146) && eim.getMapInstance(926110001).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(926110001).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(926110001).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926110001).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
	if ((mobId == 9300143 || mobId == 9300144) && eim.getMapInstance(926110203).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(926110203).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(926110203).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926110203).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(926110203).getReactorByName("jnr6_out").forceHitReactor(1);
		}
	if (mobId == 9300151 || mobId == 9300152) {
		eim.setProperty("stage7", 2);
		eim.startEventTimer(3 * 60000);
		eim.setInstanceMap(926110401).killMonster(9300150);
		eim.setInstanceMap(926110401).killMonster(9300150);
		eim.setInstanceMap(926110401).setSpawns(false);//限制刷怪
		eim.setInstanceMap(926110401).spawnNpc(2112005, new java.awt.Point(50, 100));
		eim.getMapInstance(926110401).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(926110401).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
	if (mobId == 9300138) {
		eim.getMapInstance(926110401).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Saving Romeo failed."));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 926110700);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 926110000 || mapid > 926110600) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(926110700);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 926110700);
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
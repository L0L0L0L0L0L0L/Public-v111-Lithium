/*
	名字:	冰原雪域
	地圖:	邪摩斯的單人房
	描述:	211000002
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Rex");

	eim.setInstanceMap(921120005).resetFully();
	eim.setInstanceMap(921120100).resetFully();
	eim.setInstanceMap(921120200).resetFully();
	eim.setInstanceMap(921120300).resetFully();
	eim.setInstanceMap(921120400).resetFully();

	eim.startEventTimer(20 * 60000); //20 mins

	respawnStages(eim);//加載迴圈事件

	return eim;
}

function respawnStages(eim) {//監控地圖時間
	if (eim.getMapInstance(921120100).getMonsterById(9300275) != null) {
	if (eim.getMapInstance(921120100).getMonsterById(9300275).getPosition().x > 3200 && eim.getProperty("stage1") == null) {
		eim.getMapInstance(921120100).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The channel leading to the next area has been opened."));
		eim.getMapInstance(921120100).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921120100).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage1", 1);
		}
		}
	if (eim.getMapInstance(921120200).getMonsterById(9300275) != null) {
	if (eim.getMapInstance(921120200).getMonsterById(9300275).getPosition().x < 800 && eim.getMapInstance(921120200).getMonsterById(9300275).getPosition().y < -900 && eim.getProperty("stage2") == null) {
		eim.getMapInstance(921120200).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The channel leading to the next area has been opened."));
		eim.getMapInstance(921120200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921120200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage2", 1);
		}
		}
	if (eim.getMapInstance(921120300).getMonsterById(9300275) != null) {
	if (eim.getMapInstance(921120300).getMonsterById(9300275).getPosition().x > 250) {
		eim.getMapInstance(921120300).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Idiot! You were deceived."));
		//eim.getMapInstance(921120300).startMapEffect("Idiot! You were deceived.", 5120035);
		eim.getMapInstance(921120300).killMonster(9300275);
		eim.getMapInstance(921120300).getReactorByName("bossLex").forceTrigger();
		eim.getMapInstance(921120300).getReactorByName("bossLex").forceHitReactor(1);
		eim.getMapInstance(921120300).spawnMonsterOnGroundBelow(em.getMonster(9300281), new java.awt.Point(350, 168));
		}
		}
		eim.schedule("respawnStages", 1 * 1000);
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(921120005);
	player.changeMap(map, map.getPortal(0));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if ((mobId == 9300276 || mobId == 9300277 || mobId == 9300278 || mobId == 9300279 || mobId == 9300280) && eim.getMapInstance(921120005).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage0") == null) {
		eim.getMapInstance(921120005).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The channel leading to the next area has been opened."));
		eim.getMapInstance(921120005).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921120005).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage0", 1);
		}
	if (mobId == 9300281) {
		eim.startEventTimer(3 * 60000);
		eim.getMapInstance(921120300).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(921120300).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 921120001);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 921120005 || mapid > 921120600) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(921120001);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 921120001);
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
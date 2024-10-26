/*
	名字:	坎特
	地圖:	動物園
	描述:	230000003
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("ProtectPig");

	var map = eim.setInstanceMap(923010000);

	map.resetFully();

	eim.setProperty("whog_hp", 0);//給予HP條件
	respawnStages(eim);//加載迴圈事件

	eim.startEventTimer(5 * 60000); //60000 = 1分钟

	return eim;
}

function respawnStages(eim) {//監控地圖時間
	checkHogHealth(eim);//監控血量
	eim.schedule("respawnStages", 10 * 1000);
}

function checkHogHealth(eim) {//監控地图血量
	var watchHog = eim.getMapInstance(923010000).getMonsterById(9300102);//讀取當前地圖
	if (watchHog != null) {
		var hp = watchHog.getHp();
		var oldHp = eim.getProperty("whog_hp");

	if (oldHp - hp > 600) {
		eim.getMapInstance(923010000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The little pig feels uncomfortable, please protect it."));
		}
		eim.setProperty("whog_hp", hp);
}
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(923010000);
	player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {//規定時間結束
	if (eim.getProperty("stage") == null) {
		eim.getMapInstance(923010000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You successfully protected the little pig."));
		eim.getMapInstance(923010000).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(923010000).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage", 1);
		eim.startEventTimer(30 * 1000);
		return;
		}
		eim.disposeIfPlayerBelow(100, 923010100);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9300102) {
		eim.getMapInstance(923010000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "What a pity, the little pig you protected was eaten."));
		eim.startEventTimer(10 * 1000);
		eim.setProperty("stage", 1);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 923010000) {
		playerExit(eim, chr);
}
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function leftParty(eim, player) {}//離開小組觸發

function disbandParty(eim) {}//小組退出時觸發

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
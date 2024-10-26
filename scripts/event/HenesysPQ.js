/*
	名字:	隱藏地圖
	地圖:	月妙的年糕&amp;lt;離開地圖&gt;
	描述:	910010500
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("HenesysPQ");

	eim.setInstanceMap(910010000).resetFully(false);
	eim.setInstanceMap(910010000).setSpawns(false);//限制刷怪

	eim.setProperty("whog_hp", 0);//給予HP條件
	respawnStages(eim);//加載迴圈事件

	eim.startEventTimer(10 * 60 * 1000); //10 mins
	return eim;
}

function respawnStages(eim) {//監控地圖時間
	checkHogHealth(eim);//監控血量
	eim.schedule("respawnStages", 10 * 1000);
}

function checkHogHealth(eim) {//監控地图血量
	var watchHog = eim.getMapInstance(910010000).getMonsterById(9300061);//讀取當前地圖
	if (watchHog != null) {
		var hp = watchHog.getHp();
		var oldHp = eim.getProperty("whog_hp");

	if (oldHp - hp > 300) {    // or 400, if using mobHP / eventTime
		eim.getMapInstance(910010000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Moon Bunny is feeling sick. Please protect it so it can make delicious rice cakes."));
		}
		eim.setProperty("whog_hp", hp);
}
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(910010000);
	player.changeMap(map, map.getPortal(0));
	player.tryPartyQuest(1200);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9300061) {
		eim.getMapInstance(910010000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "your failure to protect the Moon Bunny."));
		eim.startEventTimer(10 * 1000);
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, eim.getProperty("stage0") == 1 ? 910010100 : 910010300);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid != 910010000) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(910010300);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 910010300);
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
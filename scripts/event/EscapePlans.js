/*
	名字:	可疑的入口
	地圖:	危險的狸貓巢穴
	描述:	310050520
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("EscapePlans");

	eim.setInstanceMap(931020030).resetFully();
	eim.setInstanceMap(931020031).resetFully();

	for (var i = 0; i < 10; i++) {
	eim.setInstanceMap(931020030).spawnMonsterOnGroundBelow(em.getMonster(8105001), new java.awt.Point(0 + (Math.random() * 800), -124));
	eim.setInstanceMap(931020031).spawnMonsterOnGroundBelow(em.getMonster(8105001), new java.awt.Point(-500 + (Math.random() * 700), -73));
	}
	eim.startEventTimer(10 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(931020030);
	player.changeMap(map, map.getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 310050520);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 931020030 && mapid != 931020031) {
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
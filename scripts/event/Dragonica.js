/*
	名字:	神木村
	地圖:	天空的渡口
	描述:	240080000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Dragonica");

	eim.setInstanceMap(240080600).resetFully();
	eim.setInstanceMap(240080700).resetFully();
	eim.setInstanceMap(240080800).resetFully();

	eim.setInstanceMap(240080800).spawnMonsterOnGroundBelow(em.getMonster(8300007), new java.awt.Point(400, -10));

	eim.startEventTimer(20 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(240080600);
	player.changeMap(map, map.getPortal(2));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 8300006) {
		}
	if (mobId == 8300007) {
		eim.startEventTimer(3 * 60000);
		eim.getMapInstance(240080800).spawnNpc(2085003, new java.awt.Point(400, -10));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 240080050);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid != 240080600 && mapid != 240080700 && mapid != 240080800) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(240080050);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 240080050);
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
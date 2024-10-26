/*
	名字:	次元的縫隙
	地圖:	阿卡伊農的祭壇前
	描述:	272020110
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("ArkariumBattle");

	var map = eim.setInstanceMap(272020200);
	map.resetFully();
	var mob = em.getMonster(8860000);
	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0, -181));

	eim.startEventTimer(60 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(272020200);
	player.changeMap(map, map.getPortal(2));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 272020110);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 8860000) {
		eim.startEventTimer(3 * 60000);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 272020200 && mapid != 272020300 && mapid != 272020400) {
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
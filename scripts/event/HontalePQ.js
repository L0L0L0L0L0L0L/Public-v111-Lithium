/*
	名字:	闇黑龍王的里程碑
	地圖:	洞穴入口
	描述:	240050000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("HontalePQ");

	eim.setInstanceMap(240050100).resetFully();
	eim.setInstanceMap(240050101).resetFully();
	eim.setInstanceMap(240050102).resetFully();
	eim.setInstanceMap(240050103).resetFully();
	eim.setInstanceMap(240050104).resetFully();
	eim.setInstanceMap(240050105).resetFully();
	eim.setInstanceMap(240050200).resetFully();
	eim.setInstanceMap(240050300).resetFully();
	eim.setInstanceMap(240050310).resetFully();

	eim.startEventTimer(20 * 60 * 1000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(240050100);
	player.changeMap(map, map.getPortal(0));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 240050000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 240050100 || mapid > 240050310) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(240050000);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 240050000);
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
/*
	名字:	冰原雪域
	地圖:	通往殘暴炎魔之門
	描述:	211042300
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("ZakumPQ");

	eim.setInstanceMap(280010000).resetFully();
	eim.setInstanceMap(280010010).resetFully();
	eim.setInstanceMap(280010011).resetFully();
	eim.setInstanceMap(280010020).resetFully();
	eim.setInstanceMap(280010030).resetFully();
	eim.setInstanceMap(280010031).resetFully();
	eim.setInstanceMap(280010040).resetFully();
	eim.setInstanceMap(280010041).resetFully();
	eim.setInstanceMap(280010050).resetFully();
	eim.setInstanceMap(280010060).resetFully();
	eim.setInstanceMap(280010070).resetFully();
	eim.setInstanceMap(280010071).resetFully();
	eim.setInstanceMap(280010080).resetFully();
	eim.setInstanceMap(280010081).resetFully();
	eim.setInstanceMap(280010090).resetFully();
	eim.setInstanceMap(280010091).resetFully();
	eim.setInstanceMap(280010100).resetFully();
	eim.setInstanceMap(280010101).resetFully();
	eim.setInstanceMap(280010110).resetFully();
	eim.setInstanceMap(280010120).resetFully();
	eim.setInstanceMap(280010130).resetFully();
	eim.setInstanceMap(280010140).resetFully();
	eim.setInstanceMap(280010150).resetFully();
	eim.setInstanceMap(280011000).resetFully();
	eim.setInstanceMap(280011001).resetFully();
	eim.setInstanceMap(280011002).resetFully();
	eim.setInstanceMap(280011003).resetFully();
	eim.setInstanceMap(280011004).resetFully();
	eim.setInstanceMap(280011005).resetFully();
	eim.setInstanceMap(280011006).resetFully();

	eim.startEventTimer(30 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(280010000);
	player.changeMap(map, map.getPortal(1));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 280090000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 280010000 || mapid > 280011006) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(280090000);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 930000800);
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
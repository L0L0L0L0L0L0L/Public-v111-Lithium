/*
	名字:	怪物公園
	地圖:	怪物公園
	描述:	951000000
*/

function setup(mapid) {//開始事件，時間
	var eim = em.newInstance("MonsterPark" + mapid);
	var map = parseInt(mapid);
	var max = (map / 1000000 == 952 ? 5 : 6);
	eim.setProperty("max", "" + max);
	eim.setProperty("boss", 0);
	for (var i = 0; i < max; i++) {
	eim.setInstanceMap(map + (i * 100)).resetFully();
	eim.setProperty("map" + i, "" + (map + (i * 100)));
	}
	eim.startEventTimer(1200000); //20 mins
	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(0);
	player.changeMap(map, map.getPortal(0));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 951000000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	for (var i = 0; i < parseInt(eim.getProperty("max")); i++) {
	if (mapid == parseInt(eim.getProperty("map" + i))) {
		return;
		}
		}
		playerExit(eim, player);
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	eim.disposeIfPlayerBelow(0, 0)
}

function init() {}//服務端讀取

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function leftParty(eim, player) {}//離開小組觸發

function disbandParty(eim) {}//小組退出時觸發

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
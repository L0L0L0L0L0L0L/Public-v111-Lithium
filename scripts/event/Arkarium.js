/*
	名字:	黑暗時間神殿
	地圖:	時間神殿迴廊2
	描述:	272010100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Arkarium");

	eim.setInstanceMap(272010200).resetFully();

	eim.startEventTimer(30 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(272010200);
	player.changeMap(map, map.getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 272010000);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 8860001) {
		eim.startEventTimer(3 * 60000);
		eim.setInstanceMap(272010200).spawnNpc(2144000, new java.awt.Point(-100, 71));
		eim.getMapInstance(272010200).startMapEffect("How dare you steal this chance from me...after all these centuries...!", 5120056);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 272010200) {
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
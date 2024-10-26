/*
	名字:	玩具城
	地圖:	時間塔
	描述:	220080000
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Populatus");

	eim.getMapInstance(220080001).resetFully();

	eim.startEventTimer(30 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(220080001);
	player.changeMap(map, map.getPortal(1));
	eim.getMapInstance(220080000).getReactorByName("ludigate1").forceHitReactor(1);//關閉大門
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 220080000);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 8500002) {
		eim.startEventTimer(3 * 60000);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//不在此地圖中事件結束
	if (mapid != 220080001) {
		playerExit(eim, player);
}
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	if (eim.getMapInstance(220080001).getCharacters().size() < 2) {//最後一位玩家離開後，打開大門反應堆
		eim.getMapInstance(220080000).getReactorByName("ludigate1").forceHitReactor(0);
		}
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
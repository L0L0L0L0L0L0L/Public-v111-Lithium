/*
	名字:	次元的縫隙
	地圖:	黑暗的祭壇 入口
	描述:	272030300
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("ArkariumAK");

	eim.setInstanceMap(272030400).resetFully();
	eim.setInstanceMap(272030410).resetFully();

	eim.startEventTimer(30 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(272030400);
	player.changeMap(map, map.getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 272030300);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9300304) {
		eim.startEventTimer(3 * 60000);

		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
		party.get(i).mobKilled(9300304, 1);
		Packages.server.quest.MapleQuest.getInstance(20760).forceStart(party.get(i), 0, 0);
		}
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 272030400 && mapid != 272030410 && mapid != 272030420) {
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
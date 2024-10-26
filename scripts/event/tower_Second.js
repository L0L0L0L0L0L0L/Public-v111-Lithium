/*
	名字:	獅子王城
	地圖:	第二座塔
	描述:	211060400
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("tower_Second");

	var map = eim.setInstanceMap(211060401);
	map.resetFully();
	var mob = em.getMonster(8210011);
	eim.registerMonster(mob);
	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1042, -528));
	eim.startEventTimer(10 * 60000); //1分鐘

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(211060401);
	player.changeMap(map, map.getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 211060400);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 8210011) {
		var party = eim.getPlayers();
		party.get(0).updateInfoQuest(3140, "clear=1;clear=1");
		party.get(0).updateQuest(party.get(0).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3140)), true);
		eim.getMapInstance(211060401).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Unleashed the seal of the second tower."));
		eim.startEventTimer(3 * 60000);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//不在此地圖中事件結束
	if (mapid != 211060401) {
		playerExit(eim, player);
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
/*
	名字:	外星基地
	地圖:	外星物質複製機入口
	描述:	610040800
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Extraterrestrial");

	var map = eim.getMapInstance(610040400);
	var mob = em.getMonster(9400802); //召喚怪物

	var modified = em.newMonsterStats();

	modified.setOHp(mob.getMobMaxHp() * 20);
	modified.setOMp(mob.getMobMaxMp());
	modified.setOExp(mob.getMobExp() * 7);

	mob.setOverrideStats(modified);

	//eim.registerMonster(mob);

	map.resetFully();

	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(540, 40));

	eim.startEventTimer(30 * 60000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(610040400);
	player.changeMap(map, map.getPortal(1));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 610040810);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9400802) {
		eim.startEventTimer(3 * 60000);

		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
		Qa = parseInt(party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).getCustomData());
		if (party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).getStatus() == 1) {
		party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).setCustomData(Qa + 1);
		party.get(i).updateQuest(party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)), true);
		}
		}
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, player, mapid) {//不在此地圖中事件結束
	if (mapid != 610040400) {
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
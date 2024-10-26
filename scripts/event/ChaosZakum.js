/*
	名字:	廢棄礦坑
	地圖:	混沌殘暴炎魔祭壇入口
	描述:	211042401
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("ChaosZakum");

	eim.setProperty("stage", 0);

	eim.setInstanceMap(280030001).resetFully();

	eim.startEventTimer(60 * 60000);
	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(280030001);
	player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 211042401);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 8800103 || mobId == 8800104 || mobId == 8800105 || mobId == 8800106 || mobId == 8800107 || mobId == 8800108 || mobId == 8800109 || mobId == 8800110) {
		var stage = parseInt(eim.getProperty("stage")) + 1;
		eim.setProperty("stage", stage);
		}
	if (eim.getProperty("stage") == 8) {
		eim.getMapInstance(280030001).killAllMonsters(true);
		eim.getMapInstance(280030001).spawnMonsterOnGroundBelow(em.getMonster(8800100), new java.awt.Point(-9, -220));
		eim.setProperty("stage", 0);
		}
	if (mobId == 8800102) {
		eim.startEventTimer(3 * 60000);
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 280030001) {
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
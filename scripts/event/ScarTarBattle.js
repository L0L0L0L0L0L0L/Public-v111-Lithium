/*
	名字:	馬來西亞
	地圖:	夢幻公園入口
	描述:	551030100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("ScarTarBattle");

	eim.setProperty("stage", 0);

	eim.setInstanceMap(551030200).resetFully();

	eim.startEventTimer(60 * 60000);
	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(551030200);
	player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 551030100);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9420544 || mobId == 9420549) {
		var stage = parseInt(eim.getProperty("stage")) + 1;//設置後 數值添加為 1, 2 ,3 遞增
		//var stage = eim.getProperty("stage") + 1;//設置後 數值添加為0, 01, 011 遞增
		eim.setProperty("stage", stage);
		}
	if (eim.getProperty("stage") == 2) {
		eim.startEventTimer(3 * 60000);//60000 = 1分鐘
		eim.getMapInstance(551030200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(551030200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 551030200) {
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
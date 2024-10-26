/*
	名字:	勇者亞邁斯
	地圖:	挑戰入口
	描述:	670010100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Amoria");

	eim.setInstanceMap(670010200).resetFully();
	eim.setInstanceMap(670010300).resetFully();
	eim.setInstanceMap(670010301).resetFully();
	eim.setInstanceMap(670010302).resetFully();
	eim.setInstanceMap(670010400).resetFully();
	eim.setInstanceMap(670010500).resetFully();
	eim.setInstanceMap(670010600).resetFully();
	eim.setInstanceMap(670010700).resetFully();
	eim.setInstanceMap(670010750).resetFully();
	eim.setInstanceMap(670010800).resetFully();

	eim.setInstanceMap(670010200).getPortal("go00").setScriptName("apq00");
	eim.setInstanceMap(670010200).getPortal("go01").setScriptName("apq01");
	eim.setInstanceMap(670010200).getPortal("go02").setScriptName("apq02");

	eim.setInstanceMap(670010300).getPortal("next00").setScriptName("apq3");
	eim.setInstanceMap(670010301).getPortal("next00").setScriptName("apq3");
	eim.setInstanceMap(670010302).getPortal("next00").setScriptName("apq3");
	eim.setInstanceMap(670010400).getPortal("next00").setScriptName("apq4");
	eim.setInstanceMap(670010500).getPortal("next00").setScriptName("apq5");

	eim.setInstanceMap(670010700).spawnMonsterOnGroundBelow(em.getMonster(9400536), new java.awt.Point(942, 478));

	eim.startEventTimer(90 * 60000);
	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(670010200);
	player.changeMap(map, map.getPortal(0));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9400514) {
		eim.setProperty("stage5", 0);
		eim.restartEventTimer(1 * 10000);//重新加載倒數計時
		eim.getMapInstance(670010700).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please wait for the countdown to end as we enter the exciting reward phase."));
		eim.getMapInstance(670010700).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(670010700).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	if (eim.getProperty("stage5") == 0) {
		eim.setProperty("stage5", 1);
		for (var i = 0; i < eim.getPlayers().size(); i++) {
		eim.getPlayers().get(i).changeMap(670010800, 0);
		}
		eim.startEventTimer(2 * 60000); //2 mins
		return;
		}
		eim.disposeIfPlayerBelow(100, 670011000);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 670010200 || mapid > 670010800) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(670011000);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 670011000);
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
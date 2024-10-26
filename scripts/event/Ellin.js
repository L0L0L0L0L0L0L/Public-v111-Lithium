/*
	名字:	艾靈森林
	地圖:	深沉精靈之林&amp;lt;離開地圖&gt;
	描述:	300030100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Ellin");

	eim.setInstanceMap(930000000).resetFully();
	eim.setInstanceMap(930000100).resetFully();
	eim.setInstanceMap(930000200).resetFully();
	eim.setInstanceMap(930000300).resetFully();
	eim.setInstanceMap(930000400).resetFully();
	eim.setInstanceMap(930000500).resetFully();
	eim.setInstanceMap(930000600).resetFully();
	eim.setInstanceMap(930000700).resetFully();

	eim.startEventTimer(20 * 60 * 1000);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(930000000);
	player.changeMap(map, map.getPortal(0));
	player.tryPartyQuest(1206);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9300172 && eim.getMapInstance(930000100).getAllMonstersThreadsafe().size() < 1) {
		eim.getMapInstance(930000100).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(930000100).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(930000100).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
	if (mobId == 9300182) {
		eim.startEventTimer(2 * 60000);
		eim.getMapInstance(930000600).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(930000600).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 930000800);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 930000000 || mapid > 930000700) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(930000800);
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
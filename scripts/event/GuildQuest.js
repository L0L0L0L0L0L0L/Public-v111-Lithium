/*
	名字:	修安
	地圖:	遺跡發掘隊營區
	描述:	102040200
*/

load('nashorn:mozilla_compat.js');
importPackage(java.lang);

function init() {//服務端讀取
	em.setProperty("state", 0);
	em.setProperty("guildid", -1);
}

function setup(level, leaderid) {//開始事件，時間

	var eim = em.newInstance("GuildQuest");

	eim.setInstanceMap(990000000).resetFully();
	eim.setInstanceMap(990000100).resetFully();
	eim.setInstanceMap(990000200).resetFully();
	eim.setInstanceMap(990000300).resetFully();
	eim.setInstanceMap(990000301).resetFully();
	eim.setInstanceMap(990000400).resetFully();
	eim.setInstanceMap(990000401).resetFully();
	eim.setInstanceMap(990000410).resetFully();
	eim.setInstanceMap(990000420).resetFully();
	eim.setInstanceMap(990000430).resetFully();
	eim.setInstanceMap(990000431).resetFully();
	eim.setInstanceMap(990000440).resetFully();
	eim.setInstanceMap(990000500).resetFully();
	eim.setInstanceMap(990000501).resetFully();
	eim.setInstanceMap(990000502).resetFully();
	eim.setInstanceMap(990000600).resetFully();
	eim.setInstanceMap(990000610).resetFully();
	eim.setInstanceMap(990000611).resetFully();
	eim.setInstanceMap(990000620).resetFully();
	eim.setInstanceMap(990000630).resetFully();
	eim.setInstanceMap(990000631).resetFully();
	eim.setInstanceMap(990000640).resetFully();
	eim.setInstanceMap(990000641).resetFully();
	eim.setInstanceMap(990000700).resetFully();
	eim.setInstanceMap(990000800).resetFully();
	eim.setInstanceMap(990000900).resetFully();
	eim.setInstanceMap(990001000).resetFully();
	eim.setInstanceMap(990001100).resetFully();
	eim.setInstanceMap(990001101).resetFully();

	eim.setInstanceMap(990000000).getPortal("join00").setScriptName("guildwaitingenter");

	eim.setInstanceMap(990000611).getReactorByName("").setDelay(-1);//設置延時
	eim.setInstanceMap(990000620).getReactorByName("").setDelay(-1);
	eim.setInstanceMap(990000631).getReactorByName("").setDelay(-1);
	eim.setInstanceMap(990000641).getReactorByName("").setDelay(-1);

	eim.startEventTimer(3 * 60000);//入場等待3分鐘

	var ts = Date.now();
	ts += (60000 * 3);
	eim.setProperty("entryTimestamp", "" + ts);//記錄時間

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(990000000);
	player.changeMap(map, map.getPortal(1));
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9300028) {
		eim.getMapInstance(990000900).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(990000900).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	if (em.getProperty("state") == 0) {
		if (eim.setInstanceMap(990000000).getCharacters().size() < 1) {//人數限制
		eim.getMapInstance(990000000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Sorry, the entrance has been closed due to insufficient number of people."));
		eim.disposeIfPlayerBelow(100, 990001100);
		return;
		}
		em.setProperty("state", 1);//關閉入場的條件
		eim.startEventTimer(120 * 60000);//加載正式事件時間
		eim.getMapInstance(990000000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The gate to the castle has been opened."));
		return;
		}
		eim.disposeIfPlayerBelow(100, 990001100);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid == 990000100) {
		eim.getMapInstance(990000100).startMapEffect("Warning: Once entering the vicinity of the fortress, anyone without protective stone earrings will immediately die due to the deterioration of the surrounding air.", 5120025);
		}
	if (mapid < 990000000 || mapid > 990001101) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
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
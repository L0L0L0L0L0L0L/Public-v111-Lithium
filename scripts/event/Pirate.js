/*
	名字:	靈藥幻境
	地圖:	海盜船境地
	描述:	251010404
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("Pirate");

	eim.setInstanceMap(925100000).resetFully();
	eim.setInstanceMap(925100100).resetFully();
	eim.setInstanceMap(925100200).resetFully();
	eim.setInstanceMap(925100201).resetFully();
	eim.setInstanceMap(925100202).resetFully();
	eim.setInstanceMap(925100300).resetFully();
	eim.setInstanceMap(925100301).resetFully();
	eim.setInstanceMap(925100302).resetFully();
	eim.setInstanceMap(925100400).resetFully();
	eim.setInstanceMap(925100500).resetFully();

	map = eim.setInstanceMap(925100200);
		for (var i = 0; i < 15; i++) {
		var mob = em.getMonster(9300124);
		var mob2 = em.getMonster(9300125);
		var mob3 = em.getMonster(9300124);
		var mob4 = em.getMonster(9300125);

		map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(72 + (Math.random() * 1800), 76));
		map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(72 + (Math.random() * 1800), 76));
		map.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(0 + (Math.random() * 1800), 238));
		map.spawnMonsterOnGroundBelow(mob4, new java.awt.Point(0 + (Math.random() * 1800), 238));
		}

	map = eim.setInstanceMap(925100201);
		for (var i = 0; i < 10; i++) {
		var mob = em.getMonster(9300112);
		var mob2 = em.getMonster(9300113);
		eim.registerMonster(mob);
		eim.registerMonster(mob2);

		map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0, 238));
		map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(1700, 238));
		}

	map = eim.setInstanceMap(925100202);
		for (var i = 0; i < 10; i++) {
		var mob = em.getMonster(9300124);
		var mob2 = em.getMonster(9300125);
		eim.registerMonster(mob);
		eim.registerMonster(mob2);
		map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-395 + (Math.random() * 2000), 238));
		map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-327 + (Math.random() * 1800), 76));
		}

	map = eim.setInstanceMap(925100300);
		for (var i = 0; i < 15; i++) {
		var mob = em.getMonster(9300124);
		var mob2 = em.getMonster(9300125);
		var mob3 = em.getMonster(9300124);
		var mob4 = em.getMonster(9300125);
		eim.registerMonster(mob);
		eim.registerMonster(mob2);
		eim.registerMonster(mob3);
		eim.registerMonster(mob4);

		map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(72 + (Math.random() * 1800), 76));
		map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(72 + (Math.random() * 1800), 76));
		map.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(0 + (Math.random() * 1800), 238));
		map.spawnMonsterOnGroundBelow(mob4, new java.awt.Point(0 + (Math.random() * 1800), 238));
		}

	map = eim.setInstanceMap(925100301);
		for (var i = 0; i < 10; i++) {
		var mob = em.getMonster(9300112);
		var mob2 = em.getMonster(9300113);
		eim.registerMonster(mob);
		eim.registerMonster(mob2);

		map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0, 238));
		map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(1700, 238));
		}

	map = eim.setInstanceMap(925100302);
		for (var i = 0; i < 10; i++) {
		var mob = em.getMonster(9300124);
		var mob2 = em.getMonster(9300125);
		eim.registerMonster(mob);
		eim.registerMonster(mob2);
		map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-395 + (Math.random() * 2000), 238));
		map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-327 + (Math.random() * 1800), 76));
		}

		eim.startEventTimer(20 * 60000); //20 mins
		return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(925100000);
	player.changeMap(map, map.getPortal(0));
	player.tryPartyQuest(1204);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if ((mobId == 9300108 || mobId == 9300109 || mobId == 9300110 || mobId == 9300111) && eim.getMapInstance(925100000).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage0") == null) {
		eim.getMapInstance(925100000).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(925100000).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100000).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage0", 1);
		}
	if ((mobId == 9300124 || mobId == 9300125) && eim.getMapInstance(925100300).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage3") == null) {
		eim.getMapInstance(925100300).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(925100300).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100300).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage3", 1);
		}
	if ((mobId == 9300112 || mobId == 9300113) && eim.getMapInstance(925100301).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage3a") == null) {
		eim.getMapInstance(925100301).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have discovered the pirate king's secret treasure chest, and the key may be on the pirate king in the nearby area."));
		eim.getMapInstance(925100301).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100301).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(925100301).getReactorByName("treasure2").forceHitReactor(1);
		eim.setProperty("stage3a", 1);
		}
	if ((mobId == 9300124 || mobId == 9300125) && eim.getMapInstance(925100200).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage2") == null) {
		eim.getMapInstance(925100200).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the next area has been opened."));
		eim.getMapInstance(925100200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100200).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage2", 1);
		}
	if ((mobId == 9300112 || mobId == 9300113) && eim.getMapInstance(925100201).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage2a") == null) {
		eim.getMapInstance(925100201).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have discovered the pirate king's secret treasure chest, and the key may be on the pirate king in the nearby area."));
		eim.getMapInstance(925100201).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100201).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.getMapInstance(925100201).getReactorByName("treasure1").forceHitReactor(1);
		eim.setProperty("stage2a", 1);
		}
	if (mobId == 9300119 || mobId == 9300105 || mobId == 9300106) {
		eim.restartEventTimer(3 * 60 * 1000);
		eim.getMapInstance(925100500).spawnNpc(2094001, new java.awt.Point(777, 140));
		eim.getMapInstance(925100500).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Wu Yang is released!"));
		eim.getMapInstance(925100500).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(925100500).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return 1;
}


function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 925100700);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 925100000 || mapid > 925100500) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(925100700);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 925100700);
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
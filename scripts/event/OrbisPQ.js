/*
	名字:	天空之城
	地圖:	疑問之塔
	描述:	200080101
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, leaderid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("OrbisPQ");

	em.setProperty("stage2", 0); //倉庫的女神的紅獨角獅计数

	eim.setInstanceMap(920010000).resetFully();
	eim.setInstanceMap(920010100).resetFully();
	eim.setInstanceMap(920010200).resetFully();
	eim.setInstanceMap(920010300).resetFully();
	eim.setInstanceMap(920010400).resetFully();
	eim.setInstanceMap(920010500).resetFully();
	eim.setInstanceMap(920010600).resetFully();
	eim.setInstanceMap(920010601).resetFully();
	eim.setInstanceMap(920010602).resetFully();
	eim.setInstanceMap(920010603).resetFully();
	eim.setInstanceMap(920010604).resetFully();
	eim.setInstanceMap(920010700).resetFully();
	eim.setInstanceMap(920010800).resetFully();
	eim.setInstanceMap(920010900).resetFully();
	eim.setInstanceMap(920010910).resetFully();
	eim.setInstanceMap(920010911).resetFully();
	eim.setInstanceMap(920010912).resetFully();
	eim.setInstanceMap(920010920).resetFully();
	eim.setInstanceMap(920010921).resetFully();
	eim.setInstanceMap(920010922).resetFully();
	eim.setInstanceMap(920010930).resetFully();
	eim.setInstanceMap(920010931).resetFully();
	eim.setInstanceMap(920010932).resetFully();
	eim.setInstanceMap(920011000).resetFully();
	eim.setInstanceMap(920011100).resetFully();

	eim.startEventTimer(20 * 60000);//60000 = 1分鐘

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(920010000);
	player.changeMap(map, map.getPortal(0));
	var rnd = Math.floor(Math.random() * 4);
	eim.applyBuff(player, 2022090 + rnd);//加載Buff內容
	player.tryPartyQuest(1203);
	eim.getMapInstance(920010000).startMapEffect("Hi, I am the steward of the goddess. I have been sealed, so you cannot see me now. Can you help me unseal it?", 5120019);//添加的
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9300049) {
		eim.getMapInstance(920010800).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Papa Pixie has been spawned."));
		eim.getMapInstance(920010800).spawnMonsterOnGroundBelow(em.getMonster(9300039), new java.awt.Point(-830, 563));
		}
	if (mobId == 9300039) {
		eim.getMapInstance(920010800).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please bring the Life Grass and go save the goddess as soon as possible."));
		eim.getMapInstance(920010800).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(920010800).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
	if (mobId == 9300040) {
		var st = parseInt(em.getProperty("stage2"));
		if (st < 14) {
			var mob = em.getMonster(9300040);
			em.setProperty("stage2", st + 1);
			eim.registerMonster(mob);
			var val = Math.floor(Math.random() * 5);
			eim.getMapInstance(920010300).spawnMonsterOnGroundBelow(mob, new java.awt.Point(eim.getMapInstance(920010300).getReactorById(2001002 + val).getPosition()));
			eim.getMapInstance(920010300).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Cellion has been spawned somewhere in the map."));
			}
			}
			return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, eim.getMapInstance(920010100).getReactorByName("minerva").getState() == 5 ? 920011300 : 920011200);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 920010000 || mapid > 920011100) {
		playerExit(eim, player);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	var map = eim.getMapInstance(920011200);
	player.changeMap(map, map.getPortal(0));
}

function disbandParty(eim) {//小組退出時觸發
	eim.disposeIfPlayerBelow(100, 920011200);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	player.dispelBuff(2022090);//清除BUFF
	player.dispelBuff(2022091);
	player.dispelBuff(2022092);
	player.dispelBuff(2022093);
	if (eim.disposeIfPlayerBelow(0, 0)) {
		em.setProperty("state", 0);
}
}

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function playerDead(eim, player) {}//玩家死亡時觸發

function playerRevive(eim, player) {}//玩家角色复時觸發

function cancelSchedule() {}//清除事件
/*
	名字:	雾海大作战
	地圖:	触礁的幽灵船
	描述:	923020000
*/

var exitMap = 0;
var waitingMap = 1;
var reviveMap = 2;
var winnerMap = 3;
var loserMap = 4;
var bossMap = 5;
var redFirstMap = 6;
var blueFirstMap = 11;

function setup(mapid) {//開始事件，時間
	var map = (parseInt(mapid) + 1) * 100;
	var eim = em.newInstance("Ghost" + mapid);

	eim.setInstanceMap(923020001); // <exit>
	eim.setInstanceMap(map + 923020000);
	eim.setInstanceMap(map + 923020009);
	eim.setInstanceMap(923020010);
	eim.setInstanceMap(923020020);
	eim.setInstanceMap(map + 923020090).resetFully();
	for (var i = 0; i < 5; i++) {
	eim.setInstanceMap(923020010 + map + i).resetFully();
	}
	for (var i = 0; i < 5; i++) {
	eim.setInstanceMap(923020020 + map + i).resetFully();
	}
	eim.setProperty("blue", 0);
	eim.setProperty("red", 0);
	eim.setProperty("started", "false");//需要設置為"false"，否则無法讀取玩家入場後的房間。
	eim.setProperty("boss", 0);
	eim.setProperty("finished", 0);

	//ghost status
	eim.setProperty("Red_Stage", 1);
	eim.setProperty("Blue_Stage", 1);
	eim.setProperty("redTeamDamage", 0);
	eim.setProperty("blueTeamDamage", 0);
	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	if (player.getCarnivalParty() != null) {//判斷是否有未清除的積分
		player.getCarnivalParty().removeMember(player);
		}
		player.disposeClones();
		player.changeMap(eim.getMapInstance(waitingMap), eim.getMapInstance(waitingMap).getPortal(0));
		eim.setProperty(player.getId() + "-Ghost_Point", 0);//ghost point

		eim.setProperty(player.getId() + "-PRaid_Bonus", 0);
		eim.setProperty(player.getId() + "-PRaid_Total", 0);
}

function registerCarnivalParty(eim, carnivalParty) {//等待區設置
	if (eim.getProperty("red") == 0) {
		eim.setProperty("red", carnivalParty.getLeader().getId() + "");
		eim.getMapInstance(waitingMap).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please be patient. If there are no other teams challenging within 3 minutes, the room will automatically close."));
		eim.startEventTimer(3 * 60000);
		return;
		}
		eim.setProperty("blue", carnivalParty.getLeader().getId() + "");
		eim.stopEventTimer();
		eim.startEventTimer(1 * 10000);
		eim.getMapInstance(waitingMap).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The event is about to begin."));
		eim.setProperty("started", 0);
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 923020010 || mapid > 923020190) {
		playerExit(eim, player);
}
}

function onMapLoad(eim, chr) {//地圖加載時觸發
	if (eim.getProperty("boss") == 0) {
	if (chr.getCarnivalParty().getTeam() == 0) {
		if (chr.getMap().getId() == eim.getMapInstance(redFirstMap).getId()) {
			chr.tryPartyQuest(1303);
			}
		if (chr.getMap().getId() == eim.getMapInstance(redFirstMap + 1).getId()) {
			eim.setProperty("Red_Stage", 2);
			}
		if (chr.getMap().getId() == eim.getMapInstance(redFirstMap + 2).getId()) {
			eim.setProperty("Red_Stage", 3);
			}
		if (chr.getMap().getId() == eim.getMapInstance(redFirstMap + 3).getId()) {
			eim.setProperty("Red_Stage", 4);
			}
		if (chr.getMap().getId() == eim.getMapInstance(redFirstMap + 4).getId()) {
			eim.setProperty("Red_Stage", 5);
			}
		if (chr.getMap().getId() == eim.getMapInstance(bossMap).getId()) {
			eim.setProperty("Red_Stage", "B");
			eim.setProperty("Blue_Stage", "B");
			eim.setProperty("boss", 1);
			eim.setProperty("redTeamDamage", 100000);
			eim.getMapInstance(bossMap).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Red Team has reached the boss map first and will get a 5% boost"));
			var iter = eim.getPlayers().iterator();
		while (iter.hasNext()) {
			var player = iter.next();
			player.changeMap(chr.getMap(), chr.getMap().getPortal(player.getCarnivalParty().getTeam() == 0 ? "redTeam" : "blueTeam"));
			}
			}
			}
	if (chr.getCarnivalParty().getTeam() == 1) {
		if (chr.getMap().getId() == eim.getMapInstance(blueFirstMap).getId()) {
			chr.tryPartyQuest(1303);
			}
		if (chr.getMap().getId() == eim.getMapInstance(blueFirstMap + 1).getId()) {
			eim.setProperty("Blue_Stage", 2);
			}
		if (chr.getMap().getId() == eim.getMapInstance(blueFirstMap + 2).getId()) {
			eim.setProperty("Blue_Stage", 3);
			}
		if (chr.getMap().getId() == eim.getMapInstance(blueFirstMap + 3).getId()) {
			eim.setProperty("Blue_Stage", 4);
			}
		if (chr.getMap().getId() == eim.getMapInstance(blueFirstMap + 4).getId()) {
			eim.setProperty("Blue_Stage", 5);
			}
		if (chr.getMap().getId() == eim.getMapInstance(bossMap).getId()) {
			eim.setProperty("Blue_Stage", "B");
			eim.setProperty("Red_Stage", "B");
			eim.setProperty("boss", 1);
			eim.setProperty("blueTeamDamage", 100000);
			eim.getMapInstance(bossMap).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Blue Team has reached the boss map first and will get a 5% boost"));
			var iter = eim.getPlayers().iterator();
		while (iter.hasNext()) {
			var player = iter.next();
			player.changeMap(chr.getMap(), chr.getMap().getPortal(player.getCarnivalParty().getTeam() == 0 ? "redTeam" : "blueTeam"));
			}
			}
			}
			var iter = eim.getPlayers().iterator();
		while (iter.hasNext()) {
			broadcastUpdate(eim, iter.next(), false);
			}
			return;
			}
	if (eim.getProperty("finished") != 0) {
		broadcastUpdate(eim, chr, false);
		chr.gainExp(parseInt(eim.getProperty(chr.getId() + "-PRaid_Total")) * em.getChannelServer().getExpRate(), true, true, false);
}
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 9700030 && eim.getMapInstance(redFirstMap).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage0a") == null) {
		eim.getMapInstance(redFirstMap).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(redFirstMap).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage0a", 1);
		}
	if (mobId == 9700030 && eim.getMapInstance(blueFirstMap).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage0b") == null) {
		eim.getMapInstance(blueFirstMap).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(blueFirstMap).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage0b", 1);
		}
	if (mobId == 9700031 && eim.getMapInstance(redFirstMap + 1).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage1a") == null) {
		eim.getMapInstance(redFirstMap + 1).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(redFirstMap + 1).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage1a", 1);
		}
	if (mobId == 9700031 && eim.getMapInstance(blueFirstMap + 1).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage1b") == null) {
		eim.getMapInstance(blueFirstMap + 1).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(blueFirstMap + 1).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage1b", 1);
		}
	if (mobId == 9700035 && eim.getMapInstance(redFirstMap + 2).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage2a") == null) {
		eim.getMapInstance(redFirstMap + 2).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(redFirstMap + 2).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage2a", 1);
		}
	if (mobId == 9700035 && eim.getMapInstance(blueFirstMap + 2).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage2b") == null) {
		eim.getMapInstance(blueFirstMap + 2).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(blueFirstMap + 2).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage2b", 1);
		}
	if ((mobId == 9700032 || mobId == 9700033) && eim.getMapInstance(redFirstMap + 3).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage3a") == null) {
		eim.getMapInstance(redFirstMap + 3).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(redFirstMap + 3).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage3a", 1);
		}
	if ((mobId == 9700032 || mobId == 9700033) && eim.getMapInstance(blueFirstMap + 3).getAllMonstersThreadsafe().size() < 1 && eim.getProperty("stage3b") == null) {
		eim.getMapInstance(blueFirstMap + 3).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		eim.getMapInstance(blueFirstMap + 3).broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		eim.setProperty("stage3b", 1);
		}
	if (mobId == 9700037) { //boss

		eim.setProperty("finished", 1);
		var blueParty = getParty(eim, "blue");
		var redParty = getParty(eim, "red");

		redParty.setWinner(true);

		var iter = eim.getPlayers().iterator();
	while (iter.hasNext()) {
		iter.next().endPartyQuest(1303);
		}
		blueParty.displayMatchResult();
		redParty.displayMatchResult();
		eim.stopEventTimer();
		eim.startEventTimer(5 * 1000);
		eim.setProperty("started", 2);
		}
		return 1;
}

function monsterKilled(eim, chr, cp) {//怪物死亡時觸發統計
	var iter = eim.getPlayers().iterator();
	while (iter.hasNext()) {
		var player = iter.next();
	if (player.getCarnivalParty().getTeam() == chr.getCarnivalParty().getTeam()) {
		eim.setProperty(player.getId() + "-Ghost_Point", (parseInt(eim.getProperty(player.getId() + "-Ghost_Point")) + cp) + "");
		broadcastUpdate(eim, player, true);
}
}
}

function monsterDamaged(eim, chr, mobId, damage) {//攻击BOSS时觸發統計，如果秒掉BOSS會有BUG，monsterValue已添加
	if (mobId == 9700037) { //boss
		var b = parseInt(eim.getProperty("blueTeamDamage"));
		var r = parseInt(eim.getProperty("redTeamDamage"));

		eim.setProperty(chr.getCarnivalParty().getTeam() == 0 ? "redTeamDamage" : "blueTeamDamage", chr.getCarnivalParty().getTeam() == 0 ? (r+damage)+"" : (b+damage)+"");

		eim.setProperty(chr.getId() + "-PRaid_Bonus", parseInt(eim.getProperty(chr.getId() + "-PRaid_Bonus")) + (damage / 100));
		var iter = eim.getPlayers().iterator();
	while (iter.hasNext()) {
		broadcastUpdate(eim, iter.next(), false);
		}
	if ((b >= 2000000 && chr.getCarnivalParty().getTeam() == 1) || (r >= 2000000 && chr.getCarnivalParty().getTeam() == 0)) { //half hp
		eim.setProperty("finished", 1); //must be boss
		var blueParty = getParty(eim, "blue");
		var redParty = getParty(eim, "red");
	if (b > r) {
		blueParty.setWinner(true);
		}
	if (r > b) {
		redParty.setWinner(true);
		}
		var iter = eim.getPlayers().iterator();
	while (iter.hasNext()) {
		iter.next().endPartyQuest(1303);
		}
		blueParty.displayMatchResult();
		redParty.displayMatchResult();
		eim.stopEventTimer();
		eim.startEventTimer(5 * 1000);
		eim.setProperty("started", 2);
		}
		}
		return 1;
}

function broadcastUpdate(eim, player, onlypoint) {//獲取積分設置
	player.writePoint("PRaid_Point", eim.getProperty(player.getId() + "-Ghost_Point"));
	if (onlypoint) {
		return;
		}
	if (eim.getProperty("boss") == 0) {
		player.writeEnergy("PRaid_Team", player.getCarnivalParty().getTeam() == 0 ? "redTeam" : "blueTeam");
		player.writeStatus("Red_Stage", eim.getProperty("Red_Stage"));
		player.writeStatus("Blue_Stage", eim.getProperty("Blue_Stage"));
		return;
		}
	if (eim.getProperty("finished") == 0) {
		player.writeStatus("Red_Stage", "B");
		player.writeStatus("Blue_Stage", "B");
		player.writeStatus("redTeamDamage", eim.getProperty("redTeamDamage"));
		player.writeStatus("blueTeamDamage", eim.getProperty("blueTeamDamage"));
		return;
		}
		player.writeStatus("Red_Stage", "BC");
		player.writeStatus("Blue_Stage", "BC");
		var pp = eim.getProperty(player.getId() + "-Ghost_Point");
		var pb = eim.getProperty(player.getId() + "-PRaid_Bonus");
		player.writeEnergy("PRaid_Point", parseInt(pp) * 20);
		player.writeEnergy("PRaid_Bonus", pb);
		eim.setProperty(player.getId() + "-PRaid_Total", ((parseInt(pp) * 20 + parseInt(pb))) + "");
		player.writeEnergy("PRaid_Total", eim.getProperty(player.getId() + "-PRaid_Total"));
		player.writeEnergy("PRaid_Team", "");
}

function scheduledTimeout(eim) {//規定時間結束
	if (eim.getProperty("started") == "false") {//等待挑戰者
		eim.disposeIfPlayerBelow(100, 923020001);
		return;
		}
	if (eim.getProperty("started") == 0) {//等待遊戲開始
		eim.setProperty("started", 1);
		eim.startEventTimer(15 * 60 * 1000);
		var blueParty = getParty(eim, "blue");
		var redParty = getParty(eim, "red");
		if (blueParty == null || redParty == null) { //already taken care of
		return;
		}
		blueParty.warp(eim.getMapInstance(blueFirstMap), 1);
		redParty.warp(eim.getMapInstance(redFirstMap), 1);
		return;
		}
	if (eim.getProperty("started") == 2) {//勝負方設置
		var blueParty = getParty(eim, "blue");
		var redParty = getParty(eim, "red");
		eim.stopEventTimer();
		eim.startEventTimer(30 * 1000);
		eim.setProperty("started", 3);
	if (blueParty.isWinner()) {
		blueParty.warp(eim.getMapInstance(winnerMap), 0);
		redParty.warp(eim.getMapInstance(loserMap), 0);
		return;
		}
		redParty.warp(eim.getMapInstance(winnerMap), 0);
		blueParty.warp(eim.getMapInstance(loserMap), 0);
		return;
		}
		eim.disposeIfPlayerBelow(100, 923020001);
}

function getParty(eim, property) {//入場檢測
	var chr = em.getChannelServer().getPlayerStorage().getCharacterById(parseInt(eim.getProperty(property)));
	if (chr == null) {
		eim.broadcastPlayerMsg(5, "The leader of the party " + property + " was not found.");
		playerExit(eim);
		return;
		}
		return chr.getCarnivalParty();
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function leftParty(eim, player) {//離開小組觸發
	playerExit(eim, player);
}

function disbandParty(eim) {//小組退出時觸發
	playerExit(eim, player);
}

function playerExit(eim, player) {//角色退出時觸發
	eim.unregisterPlayer(player);
	eim.disposeIfPlayerBelow(0, 0);
	if (eim.getProperty("started") != 3) {
		player.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, player.getName() + "Leaving the field, this competition has been cancelled."));
		eim.disposeIfPlayerBelow(100, 923020001);
}
}

function init() {}//服務端讀取

function playerRevive(eim, player) {}//玩家角色復活時觸發

function playerDead(eim, player) {}//玩家死亡時觸發

function cancelSchedule() {}//清除事件
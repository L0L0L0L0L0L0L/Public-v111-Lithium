/*
	名字:	怪物擂臺賽 1
	地圖:	休菲凱曼的辦公室
	描述:	980000000
*/

var exitMap = 0;
var waitingMap = 1;
var reviveMap = 2;
var fieldMap = 3;
var winnerMap = 4;
var loserMap = 5;

function setup(mapid) {//開始事件，時間
	var map = parseInt(mapid);
	var eim = em.newInstance("cpq" + mapid);

	eim.setProperty("started", "false");//需要設置為"false"，否则無法讀取玩家入場後的房間。
	eim.setProperty("red", 0);//房主
	eim.setProperty("blue", 0);//挑戰者

	eim.setInstanceMap(980000000); // <exit>
	eim.setInstanceMap(map);
	eim.setInstanceMap(map + 2);
	eim.setInstanceMap(map + 1).resetFully();
	eim.setInstanceMap(map + 3);
	eim.setInstanceMap(map + 4);

	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	if (player.getCarnivalParty() != null) {//判斷是否有未清除的積分
		player.getCarnivalParty().removeMember(player);
		}
		player.disposeClones();
		player.changeMap(eim.getMapInstance(waitingMap), eim.getMapInstance(waitingMap).getPortal(0));
		player.tryPartyQuest(1302);
}

function registerCarnivalParty(eim, carnivalParty) {//等待區設置
	if (eim.getProperty("red") == 0) {
		eim.getMapInstance(waitingMap).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please be patient. If there are no other teams challenging within 3 minutes, the room will automatically close."));
		eim.setProperty("red", carnivalParty.getLeader().getId() + "");
		eim.startEventTimer(3 * 60000);
		return;
		}
		eim.getMapInstance(waitingMap).broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The event is about to begin."));
		eim.setProperty("blue", carnivalParty.getLeader().getId() + "");
		eim.stopEventTimer();
		eim.startEventTimer(1 * 10000);
		eim.setProperty("started", 0);
}

function onMapLoad(eim, chr) {
	if (chr.getCarnivalParty().getTeam() == 0) {
		var blueParty = getParty(eim, "blue");
		chr.startMonsterCarnival(blueParty.getAvailableCP(), blueParty.getTotalCP());
		return;
		}
		var redParty = getParty(eim, "red");
		chr.startMonsterCarnival(redParty.getAvailableCP(), redParty.getTotalCP());
}

function changedMap(eim, player, mapid) {//進入地圖觸發
	if (mapid < 980000020 || mapid > 980001000) {
		playerExit(eim, player);
}
}

function monsterKilled(eim, chr, cp) {//怪物死亡時觸發統計
	chr.getCarnivalParty().addCP(chr, cp);
	chr.CPUpdate(false, chr.getAvailableCP(), chr.getTotalCP(), 0);
	chr.CPUpdate(true, chr.getAvailableCP(), chr.getTotalCP(), 0);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	return 1;
}

function scheduledTimeout(eim) {//規定時間結束
	if (eim.getProperty("started") == "false") {//等待挑戰者
		eim.disposeIfPlayerBelow(100, 980000000);
		return;
		}
	if (eim.getProperty("started") == 0) {//等待遊戲開始
		eim.setProperty("started", 1);
		eim.startEventTimer(10 * 60 * 1000);
		getParty(eim, "red").warp(eim.getMapInstance(fieldMap), "red00");
		getParty(eim, "blue").warp(eim.getMapInstance(fieldMap), "blue00");
		return;
		}
	if (eim.getProperty("started") == 1) {//活動時間結束
		var blueParty = getParty(eim, "blue");
		var redParty = getParty(eim, "red");
	if (blueParty.getTotalCP() > redParty.getTotalCP()) {
		blueParty.setWinner(true);
		}
	if (redParty.getTotalCP() > blueParty.getTotalCP()) {
		redParty.setWinner(true);
		}
		blueParty.displayMatchResult();
		redParty.displayMatchResult();
		eim.stopEventTimer();
		eim.startEventTimer(5 * 1000);
		eim.setProperty("started", 2);
		return;
		}
	if (eim.getProperty("started") == 2) {//勝負方設置
		var blueParty = getParty(eim, "blue");
		var redParty = getParty(eim, "red");
		eim.stopEventTimer();
		eim.startEventTimer(1 * 60 * 1000);
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
		eim.disposeIfPlayerBelow(100, 980000000);
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
		eim.disposeIfPlayerBelow(100, 980000000);
}
}

function init() {}//服務端讀取

function allMonstersDead(eim) {}//怪物死亡觸發和刪除這個怪在活動中的資訊

function playerRevive(eim, player) {}//玩家角色復活時觸發

function playerDead(eim, player) {}//玩家死亡時觸發

function cancelSchedule() {}//清除事件
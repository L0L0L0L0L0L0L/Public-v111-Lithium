/*
	名字:	武英
	地圖:	神殿底層
	描述:	105100100
*/

function init() {//服務端讀取
	em.setProperty("state", 0);
}

function setup(level, lobbyid) {//開始事件，時間
	em.setProperty("state", 1);
	var eim = em.newInstance("BossBalrog_NORMAL");

	eim.getMapInstance(105100400).resetFully();
	eim.getMapInstance(105100401).resetFully();

	eim.schedule("BossBalrog", 3 * 1000);//加載指定時間
	eim.schedule("releaseLeftClaw", 1 * 60000);//加載指定時間

	eim.startEventTimer(60 * 60000);
	return eim;
}

function playerEntry(eim, player) {//傳送進事件地圖
	var map = eim.getMapInstance(105100400);
	player.changeMap(map, map.getPortal(0));
}

function BossBalrog(eim) {//刷出BOSS如果不這樣設置 無法正常顯示主體
	var map = eim.getMapInstance(105100400);
	//var mob1 = em.getMonster(8830000);//真实主体召喚怪物
	var mob1 = em.getMonster(8830003);//召喚怪物

	var mob2 = em.getMonster(8830002);//召喚怪物
	var mob3 = em.getMonster(8830006);//召喚怪物

	//map.spawnFakeMonsterOnGroundBelow(mob1, new java.awt.Point(412, 258));//刷出假怪無法正常顯示

	map.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(412, 258));
	map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(412, 258));
	map.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(412, 258));
}

function releaseLeftClaw(eim) {//指定時間秒殺怪物釋放左爪
	eim.getMapInstance(105100400).killMonster(8830006);
	eim.schedule("releaseLeftClaw1", 2 * 1000);//加載指定時間
}

function releaseLeftClaw1(eim) {//刷出左爪
	var mob2 = em.getMonster(8830001);//召喚怪物
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(mob2, new java.awt.Point(412, 258));
}

function releaseLeftClaw2(eim) {//刷出消灭后的左爪
	var mob6 = em.getMonster(8830004);//召喚怪物
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(mob6, new java.awt.Point(412, 258));
}

function releaserightClaw2(eim) {//刷出消灭后右爪
	var mob6 = em.getMonster(8830005);//召喚怪物
	eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(mob6, new java.awt.Point(412, 258));
}

function scheduledTimeout(eim) {//規定時間結束
	eim.disposeIfPlayerBelow(100, 105100100);
}

function monsterValue(eim, mobId) {//殺怪後觸發
	if (mobId == 8830002) {//右爪被消滅後
		eim.schedule("releaserightClaw2", 3 * 1000);//加載指定時間
		}
	if (mobId == 8830001) {//左爪被消滅後釋放主體
		eim.getMapInstance(105100400).killMonster(8830003);
		var mob = em.getMonster(8830000);//召喚怪物
		eim.getMapInstance(105100400).spawnMonsterOnGroundBelow(mob, new java.awt.Point(412, 258));
		eim.schedule("releaseLeftClaw2", 3 * 1000);//加載指定時間
		}
	if (mobId == 8830000) {//主體被消滅
		eim.schedule("SealedBalrog", 10 * 1000);//加載指定時間
		eim.startEventTimer(3 * 60000);

		var party = eim.getPlayers();
		for (var i = 0; i < party.size(); i++) {
		Qa = parseInt(party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).getCustomData());
		if (party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).getStatus() == 1) {
		party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).setCustomData(Qa + 1);
		party.get(i).updateQuest(party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)), true);
		}
		if (party.get(i).getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2239)).getStatus() == 1) {
		party.get(i).mobKilled(9101003, 1);//添加任務怪物計數
		}
		}
		}
		return 1;
}

function SealedBalrog(eim) {//主體被消滅後的指定時間
	for (var i = 0; i < eim.getPlayers().size(); i++) {
		eim.getPlayers().get(i).changeMap(105100401, 0);
}
}

function playerDisconnected(eim, player) {//活動中角色斷開連接觸發
	playerExit(eim, player);
}

function changedMap(eim, chr, mapid) {//不在此地圖中事件結束
	if (mapid != 105100400 && mapid != 105100401) {
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
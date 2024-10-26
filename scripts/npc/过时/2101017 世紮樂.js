/*
	名字:	傑薩勒
	地圖:	第一個競技場入口
	描述:	980010100
*/

importPackage(Packages.server.expeditions);

var status = 0;
var toBan = -1;
var choice;
var arena;
var arenaName;
var type;
var map;
var exped;
var expedicao;
var expedMembers;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		cm.dispose();
		return;
		break;
		}
	if (cm.getPlayer().getMapId() == 980010100 || cm.getPlayer().getMapId() == 980010200 || cm.getPlayer().getMapId() == 980010300) {
	if (cm.getPlayer().getMapId() == 980010100) {
		exped = MapleExpeditionType.ARIANT;
		expedicao = cm.getExpedition(exped);

	} else if (cm.getPlayer().getMapId() == 980010200) {
		exped = MapleExpeditionType.ARIANT1;
		expedicao = cm.getExpedition(exped);
	} else {
		exped = MapleExpeditionType.ARIANT2;
		expedicao = cm.getExpedition(exped);
		}

	if (expedicao == null) {
		cm.dispose();
		return;
		}

		expedMembers = expedicao.getMemberList();
	if (status == 0) {
		if (cm.isLeaderExpedition(exped)) {
			cm.sendSimple("作為本次競技場的場主，你想幹什麼? #b\r\n#L1#查看人員#l\r\n#L2#移除人員#l\r\n#L3#開始戰鬥#l\r\n#L4#離開競技場#l");
			status = 1;
		} else {
			var toSend = "這個競技場裡有:\r\n#b";
			toSend += cm.getExpeditionMemberNames(exped);
			cm.sendOk(toSend);
			cm.dispose();
			}
	} else if (status == 1) {
		if (selection == 1) {
			var toSend = "當前有這些成員:\r\n#b";
			toSend += cm.getExpeditionMemberNames(exped);
			cm.sendOk(toSend);
			cm.dispose();
		} else if (selection == 2) {
			var size = expedMembers.size();
			if (size == 1) {
			cm.sendOk("你是唯一的成員。");
			cm.dispose();
			return;
			}
			var text = "這些是人員名單 (點擊可以移除):\r\n";
			text += "\r\n\t\t1." + expedicao.getLeader().getName();
			for (var i = 1; i < size; i++) {
			text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
			}
			cm.sendSimple(text);
			status = 6;
		} else if (selection == 3) {
			if (expedicao.getMembers().size() < 1) {
			cm.sendOk("需要更多玩家才能開始戰鬥。");
			cm.dispose();
		} else {
			if (cm.getParty() != null) {
			cm.sendOk("你不可以組隊參加納希競技大會。");
			cm.dispose();
			return;
			}

			var errorMsg = cm.startAriantBattle(exped, cm.getPlayer().getMapId());
			if (errorMsg != "") {
			cm.sendOk(errorMsg);
			}

			cm.dispose();
			}
		} else if (selection == 4) {
			cm.mapMessage(5, "組長離開了。");
			expedicao.warpExpeditionTeam(980010000);
			cm.endExpedition(expedicao);
			cm.dispose();
			}
	} else if (status == 6) {
		if (selection > 0) {
			var banned = expedMembers.get(selection - 1);
			expedicao.ban(banned);
			cm.sendOk("你移除了 " + banned.getValue() + " from the expedition.");
			cm.dispose();
		} else {
			cm.sendSimple(list);
			status = 2;
			}
			}
		} else if (Packages.constants.game.GameConstants.isAriantColiseumArena(cm.getPlayer().getMapId())) {
	if (cm.getPlayer().getMapId() == 980010101) {
		exped = MapleExpeditionType.ARIANT;
		expedicao = cm.getExpedition(exped);
	} else if (cm.getPlayer().getMapId() == 980010201) {
		exped = MapleExpeditionType.ARIANT1;
		expedicao = cm.getExpedition(exped);
	} else {
		exped = MapleExpeditionType.ARIANT2;
		expedicao = cm.getExpedition(exped);
		}
	if (status == 0) {
		var gotTheBombs = expedicao.getProperty("gotBomb" + cm.getChar().getId());
		if (gotTheBombs != null) {
			cm.sendOk("沒有更多物品可以給你了，現在快去殺死蠍子吧。");
			cm.dispose();
		} else if (cm.canHoldAll([2270002, 2100067], [50, 5])) {
			cm.sendOk("我給你5個#b炸彈#k和50個#b速成石#k，使用炸彈攻擊蠍子並用速成石收集蠍子的靈魂石。");
			expedicao.setProperty("gotBomb" + cm.getChar().getId(), "1");
			cm.gainItem(2270002, 50);
			cm.gainItem(2100067, 5);
			cm.dispose();
		} else {
			cm.sendOk("無法收納物品，請檢查一下你的背包是否留有空位。");
			cm.dispose();
			}
			}
		} else {
			cm.sendOk("你好，你聽說過納希競技大會嗎，這是一個競賽項目，適用於20-30級之間的玩家。");
			cm.dispose();
}
}
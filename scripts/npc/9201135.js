/*
	名字:	Audrey
	地圖:	中心商務區
	描述:	540000000
*/

var maps = [550000000, 551000000];
var cost = [20000, 30000];

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getId() == 540000000)
			cm.sendSimple("旅行者，有沒有興趣去馬來西亞觀光呢，哪里有繁華的都市美景，與鄉村田野的自然風光，還有夢幻主題公園期待著你的光臨哦。\r\n#L0##b都會潮流區#k(20000楓幣)#l\r\n#L1##b鄉村鎮#k(30000楓幣)#l");
		else
			cm.sendSimple ("#m" + cm.getPlayer().getMap().getId() + "#怎麼樣？很有趣吧。\r\n#L2##b觀光：" + (cm.getPlayer().getMap().getId() == 550000000 ? "鄉村鎮" : "都會潮流區") + "#l\r\n#L3#返回：#m" + cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR")) + "##l\r\n#L4#繼續觀光#l");
			break;
	case 1:
		if (selection < 2) {
			select = selection;
			cm.sendYesNo("你真的想去#m" + maps[select] + "#嗎？路費為#b" + cost[select] + "#k楓幣。");
			}
		if (selection == 2) {
			cm.sendYesNo("你還想去" + (cm.getPlayer().getMap().getId() == 550000000 ? "鄉村鎮" : "都會潮流區") + "看看嗎？哦，那真是太好了，我可以給你打個折扣，只需要花費#b" + 5000 + "#k楓幣。");
			}
		if (selection == 3) {
			cm.sendNext("好的，希望你能滿意本次旅行，如果需要到別的地方旅遊，請記得告訴我。");
			}
		if (selection == 4) {
			cm.sendOk("不想回去就再到處看看吧，等你想回去的時候再來告訴我。");
			cm.dispose();
			}
			select = selection;
			break;
	case 2:
		if (select < 3) {
			if (cm.getPlayer().getMeso() < (select < 2 ? cost[select] : 5000)) {
			cm.sendOk("很抱歉，你好像沒有足夠楓幣支付出行費。");
			cm.dispose();
			return;
			}
			if (select < 2)
			cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
			cm.gainMeso(-(select < 2 ? cost[select] : 5000));
			map = select < 2 ? maps[select] : cm.getPlayer().getMap().getId() == 550000000 ? 551000000 : 550000000;
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
			cm.dispose();
			return;
			}
		if (select < 4) {
			var map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"))
			if (map < 0) map = 540000000;
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
			cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
			}
			cm.dispose();
}
}
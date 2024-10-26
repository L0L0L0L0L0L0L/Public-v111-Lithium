/*
	名字:	海盗转蛋机
	地圖:	转蛋屋
	描述:	749050400
*/

var itemList = Array(
        Array(1012056, 80, 1, 1), //狗狗鼻子1012056	
        Array(2510181, 200, 1, 1),
        Array(2510186, 200, 1, 1),
        Array(2510191, 200, 1, 1),
        Array(2510196, 200, 1, 1),
        Array(2511106, 40, 1, 1),
        Array(2511040, 100, 1, 1),
        Array(2511079, 100, 1, 1),
        Array(2511097, 100, 1, 1),
        Array(2510175, 60, 1, 1),
        Array(2510176, 60, 1, 1),
        Array(2510239, 60, 1, 1),
        Array(2510171, 60, 1, 1),
        Array(2510172, 60, 1, 1),
        Array(1482002, 500, 1, 0),
        Array(1482004, 500, 1, 0),
        Array(1482006, 500, 1, 0),
        Array(1482029, 500, 1, 0),
        Array(1482007, 500, 1, 0),
        Array(1482008, 500, 1, 0),
        Array(1492002, 500, 1, 0),
        Array(1492004, 500, 1, 0),
        Array(1492006, 500, 1, 0),
        Array(1492007, 500, 1, 0),
        Array(1492008, 500, 1, 0),
        Array(1492030, 500, 1, 0),
        Array(1492037, 500, 1, 0),
        Array(1102000, 500, 1, 0),
        Array(1102001, 500, 1, 0),
        Array(1102002, 500, 1, 0),
        Array(1102003, 500, 1, 0),
        Array(1102004, 500, 1, 0),
        Array(1102011, 500, 1, 0),
        Array(1102012, 500, 1, 0),
        Array(1102013, 500, 1, 0),
        Array(1102014, 500, 1, 0),
        Array(1102015, 500, 1, 0),
        Array(1102016, 500, 1, 0),
        Array(1102017, 500, 1, 0),
        Array(1102018, 500, 1, 0),
        Array(1082180, 500, 1, 0),
        Array(1082183, 500, 1, 0),
        Array(1082186, 500, 1, 0),
        Array(1082189, 500, 1, 0),
        Array(1082192, 500, 1, 0),
        Array(1082195, 500, 1, 0),
        Array(1082198, 500, 1, 0),
        Array(1082201, 500, 1, 0),
        Array(1072285, 500, 1, 0),
        Array(1072288, 500, 1, 0),
        Array(1072291, 500, 1, 0),
        Array(1072294, 500, 1, 0),
        Array(1072297, 500, 1, 0),
        Array(1072300, 500, 1, 0),
        Array(1072303, 500, 1, 0),
        Array(1072306, 500, 1, 0),
        Array(1052095, 500, 1, 0),
        Array(1052098, 500, 1, 0),
        Array(1052101, 500, 1, 0),
        Array(1052104, 500, 1, 0),
        Array(1052107, 500, 1, 0),
        Array(1052110, 500, 1, 0),
        Array(1052113, 500, 1, 0),
        Array(1052116, 500, 1, 0),
        Array(1052119, 500, 1, 0),
        Array(1002610, 500, 1, 0),
        Array(1002613, 500, 1, 0),
        Array(1002616, 500, 1, 0),
        Array(1002619, 500, 1, 0),
        Array(1002622, 500, 1, 0),
        Array(1002625, 500, 1, 0),
        Array(1002628, 500, 1, 0),
        Array(1002631, 500, 1, 0),
        Array(1002634, 500, 1, 0)
        );

function start() {
	var jpzs = "";
	for (var j = 0; j < itemList.length; j++) {
	jpzs += "#v" + itemList[j][0] + ":#";
	}
	if (cm.haveItem(5451001, 1)) {
		cm.sendSimple("冒险岛转蛋机中有各类#b装备、卷轴或稀有新奇的道具#k噢！使用“#b#t5451001##k”就可以抽奖，否则是不可以使用我的。现在要玩转蛋机么? \r\n#b#L2#试试手气吧#l#k\r\n\r\n\r\n下期部分奖励展示:\r\n" + jpzs);
	} else {
		cm.sendSimple("冒险岛转蛋机中有各类#b装备、卷轴或稀有新奇的道具#k噢！使用“#b#t5451001##k”就可以交换。 假如不买转蛋券的话，是不可以使用我的。现在要玩转蛋机么?    \r\n\r\n#r你背包里没#v5451001##z5451001#\r\n\r\n#k部分奖励展示:\r\n" + jpzs + "");
}
}

function action(mode, type, selection) {
	if (mode == 1) {
		var chance = cm.getDoubleFloor(cm.getDoubleRandom() * 500);
		var finalitem = Array();
		for (var i = 0; i < itemList.length; i++) {
		if (itemList[i][1] >= chance) {
			finalitem.push(itemList[i]);
			}
			}
		if (finalitem.length != 0) {
			var item;
			var finalchance = cm.nextInt(finalitem.length);
			var itemId = finalitem[finalchance][0];
			var quantity = finalitem[finalchance][2];
			var notice = finalitem[finalchance][3];
			item = cm.gainGachaponItem(itemId, quantity, "职业转蛋机", notice);
		if (item != -1) {
			cm.gainItem(5451001, -1);
			cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
			cm.dispose();
		} else {
			cm.sendOk("你确实有#b#t5451001##k吗？如果是，请你确认在背包的装备，消耗，其它窗口中是否有一格以上的空间。");
			}
			cm.safeDispose();
		} else {
			cm.sendOk("今天的运气可真差，什么都没有拿到。\r\n(获得了安慰奖：#v2000005#。)");
			cm.gainItem(5451001, -1);
			}
			}
		cm.dispose();
}
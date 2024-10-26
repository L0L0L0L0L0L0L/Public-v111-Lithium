/*
	名字:	工作人员E
	地圖:	百草堂
	描述:	251000000
*/

var selectedType = -1;
var selectedItem = -1;
var item;
var items;
var mats;
var matQty;
var cost;
var qty = 1;
var equip;
var maxEqp = 0;

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
		if (status <= 4) {
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
		cm.getPlayer().setCS(true);
		var selStr = "你好,我是#b饰品制作NPC#k!我喜欢搜集各种各样的稀有道具,如果你正好有,我愿意用一些饰品和你交换.看看你想要什么?#b";
		var options = ["坠子","脸饰","眼饰","腰带&勋章","戒指"/*,"#t4032496#"*/];
		for (var i = 0; i < options.length; i++)
		selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		cm.sendSimple(selStr);
		break;
	case 1:
		if (selection == 0) { //pendants
			var selStr = "好的,我现在有这些坠子:#b";
			items = [1122018,1122007,1122001,1122003,1122004,1122006,1122002,1122005,1122058];
			for (var i = 0; i < items.length; i++)
			selStr += "\r\n#L" + i + "##t" + items[i] + "##b";
			}
		if (selection == 1) { //face accessory
			var selStr = "嗯,脸饰?挑一个吧: #b";
			items = [1012181,1012182,1012183,1012184,1012185,1012186, 1012108, 1012109, 1012110, 1012111];
			for (var i = 0; i < items.length; i++)
			selStr += "\r\n#L" + i + "##t" + items[i] + "##b";
			}
		if (selection == 2) { //eye accessory
			var selStr = "视力不好吗？好吧，那你想让我做什么眼镜?#b";
			items = [1022073, 1022088, 1022103, 1022089, 1022082];
			for (var i = 0; i < items.length; i++)
			selStr += "\r\n#L" + i + "##t" + items[i] + "##b";
			}
		if (selection == 3) { //belt & medal
			var selStr = "嗯... 这些有点棘手. 这些东西都太香了,我不知道我会做出哪一种.还是要交换吗?";
			items = [];
			maxEqp = 0;
            
			for (var x = 1132005; x < 1132017; maxEqp++, x++)
				items[maxEqp] = x;
            
			for (var x = 1142000; x < 1142102; maxEqp++, x++)
				items[maxEqp] = x;
            
			for (var x = 1142107; x < 1142121; maxEqp++, x++)
				items[maxEqp] = x;
		
			for (var x = 1142122; x < 1142143; maxEqp++, x++)
				items[maxEqp] = x;		
				selStr += "\r\n#L" + i + "##bTry it!#b";
            
				}
		if (selection == 4) { //ring refine
			var selStr = "Rings, huh? These are my specialty, go check it yourself!#b";
			items = [1112407, 1112408, 1112401, 1112413, 1112414, 1112405, 1112402];
            
			for (var i = 0; i < items.length; i++)
			selStr += "\r\n#L" + i + "##t" + items[i] + "##b";
            
			}
		if (selection == 4) { //make necklace
			var selStr = "Need to make #t4032496#?#b";
			items = [4032496];
			for (var i = 0; i < items.length; i++)
			selStr += "\r\n#L" + i + "##t" + items[i] + "##l";
			}
			selectedType = selection;
			cm.sendSimple(selStr);
			break;
	case 2:
		if (selectedType != 3) selectedItem = selection;
        
		if (selectedType == 0) { //pendant refine
			var matSet = [[4003004, 4030012, 4001356, 4000026], [4000026, 4001356, 4000073, 4001006], [4001343, 4011002, 4003004, 4003005], [4001343, 4011006, 4003004, 4003005], [4000091, 4011005, 4003004, 4003005], [4000091, 4011001, 4003004, 4003005], [4000469, 4011000, 4003004, 4003005], [4000469, 4011004, 4003004, 4003005], [1122007, 4003002, 4000413]];
			var matQtySet = [[20, 20, 5, 1], [5, 5, 10, 1], [10, 2, 20, 4], [10, 1, 20, 4], [15, 3, 30, 6], [15, 3, 30, 6], [20, 5, 20, 8], [20, 4, 40, 8], [1, 1, 1]];
			var costSet = [150000, 500000, 200000, 200000, 300000, 300000, 400000, 400000, 2500000];
			}
		if (selectedType == 1) { //face accessory refine
			var matSet = [[4006000, 4003004],[4006000, 4003004,4000026],[4006000, 4003004,4000026,4000082,4003002],[4006000, 4003005],[4006000, 4003005,4000026],[4006000, 4003005,4000026,4000082,4003002],[4001006, 4011008],[4001006, 4011008],[4001006, 4011008],[4001006, 4011008]];
			var matQtySet = [[5,5],[5,5,5],[5,5,5,5,1],[5,5],[5,5,5],[5,5,5,5,1],[1,1],[1,1],[1,1],[1,1]];
			var costSet = [100000,200000,300000,125000,250000,375000,500000,500000,500000,500000, 25000, 25000, 25000, 25000];
			}
		if (selectedType == 2) { //eye accessory refine
			var matSet = [[4001006, 4003002, 4000082, 4031203], [4001005, 4011008], [4001005, 4011008], [4001005, 4011008, 4000082], [4001006, 4003002, 4003000, 4003001]];
			var matQtySet = [[2, 2, 5, 10], [3, 2], [4, 3], [5, 3, 10], [2, 2, 10, 5]];
			var costSet = [250000, 250000, 300000, 400000, 200000];
			}
		if (selectedType == 3) { //belt & medals refine
			var matSet = [[4001006, 4003005, 4003004], [7777, 7777]];
			var matQtySet = [[2, 5, 10], [7777, 7777]];
			var costSet = [15000, 7777];
			}
		if (selectedType == 4) { //ring refine
			var matSet = [[4003001, 4001344, 4006000], [4003001, 4001344, 4006000], [4021004, 4011008], [4011008, 4001006], [1112413, 2022039], [1112414, 4000176], [4011007, 4021009]];
			var matQtySet = [[2, 2, 2], [2, 2, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
			var costSet = [10000, 10000, 10000, 20000, 15000, 15000, 10000];
			}
		if (selectedType == 5) { //necklace refine
			var matSet = [[4011007, 4011008, 4021009]];
			var matQtySet = [[1, 1, 1]];
			var costSet = [10000];
			}
		if (selectedType == 3) {
			selectedItem = Math.floor(Math.random() * maxEqp);
			item = items[selectedItem];
			mats = matSet[0];
			matQty = matQtySet[0];
			cost = costSet[0];
		} else {
			item = items[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
			}
        
			var prompt = "You want me to make ";
		if(selectedType != 3) {
			if (qty == 1)
				prompt += "a #b#t" + item + "##k?";
			else
				prompt += "#b" + qty + " #t" + item + "##k?";
				}
				else prompt += "a #bbelt#k or a #bmedal#k?";
        
				prompt += " Right! I will need some items to make that item. Make sure you have a #bfree slot#k in your inventory!#b";
			if (mats instanceof Array)
				for(var i = 0; i < mats.length; i++)
				prompt += "\r\n#v" + mats[i] + "# " + (matQty[i] * qty) + " #t" + mats[i] + "#";
			else
				prompt += "\r\n#v" + mats + "# " + (matQty * qty) + " #t" + mats + "#";
			if (cost > 0)
				prompt += "\r\n#v4031138# " + (cost * qty) + " meso";
				cm.sendYesNo(prompt);
				break;
	case 3:
		if (cm.getMeso() < (cost * qty)) {
			cm.sendOk("This is the fee I charge to make my items! No credit.");
		} else {
			var complete = true;
		if (mats instanceof Array) {
			for(var i = 0; complete && i < mats.length; i++)
		if (!cm.haveItem(mats[i], matQty[i] * qty))
			complete = false;
		} else if (!cm.haveItem(mats, matQty * qty))
			complete = false;
            
		if (!complete)
			cm.sendOk("你真有全部我需要的东西?检查一下!");
		else {
			if (cm.canHold(item, qty)) {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++)
					cm.gainItem(mats[i], -(matQty[i] * qty));
				} else
					cm.gainItem(mats, -(matQty * qty));
					cm.gainMeso(-(cost * qty));

					cm.gainItem(item, qty);
					cm.sendOk("制作完成!看看合不合适.");
				} else {
					cm.sendOk("You got no free slot on your inventory.");
					}
					}
					}
				cm.dispose();
}
}
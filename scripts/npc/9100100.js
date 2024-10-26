/*
	Name: Gachapon Machine
	Map: Henesys Market
	Description: 100000100
*/

var z0 = [2430291, 2430293, 2430295, 2430297, 3010002, 3010003, 3010007, 3010008, 3010009];
var z1 = [2044500, 2044501, 2044502, 2044504, 2044505];
var z2 = [2044600, 2044601, 2044602, 2044604, 2044605];
var z3 = [2040027, 2040028, 2040029, 2040030, 2040031, 2040306, 2040307, 2040316, 2040317, 2040318, 2040500, 2040501, 2040502, 2040508, 2040509, 2040610, 2040611, 2040612, 2040613, 2040614, 2040623, 2040624, 2040625, 2040626, 2040627, 2040700, 2040701, 2040702, 2040712, 2040713, 2040800, 2040801, 2040802, 2040808, 2040809, 2041018, 2041019, 2041020, 2041038, 2041039, 2041106, 2041107, 2041108, 2041116, 2041117, 2041306, 2041307, 2041308, 2041316, 2041317];
var z4 = [2040706, 2040707, 2040708, 2040716, 2040717];
var z5 = [2290052, 2290053, 2290054, 2290055, 2290056, 2290057, 2290058, 2290059, 2290060, 2290061, 2290062, 2290063, 2290064, 2290065, 2290066, 2290067, 2290068, 2290069, 2290070, 2290071, 2290072, 2290073, 2290074, 2290075, 2290096, 2290125, 2290290, 2290291];

function start() {
	if (cm.getPlayer().itemQuantity(5220000) || cm.getPlayer().itemQuantity(5451000)) {
		cm.sendSimple("You can use #b#p" + cm.getNpc() + "##k. Do you want to use your Gachapon Ticket?\r\n#L0#Use Gachapon Ticket#l\r\n#L2#View Gachapon Prizes#l");
	} else {
		cm.sendSimple("Welcome to #b#p" + cm.getNpc() + "##k. How can I help you?\r\n#L1#What is the Gachapon Machine?#l\r\n#L2#View Gachapon Prizes#l\r\n#L3#Where can I buy Gachapon Tickets?#l");
	}
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			var rand = Math.floor(Math.random() * 100);
			y = rand < 1 ? z0 : rand < 10 ? z1 : rand < 20 ? z2 : rand < 60 ? z3 : rand < 70 ? z4 : z5;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 100000100 ? 5220000 : 5451000, -1);
				cm.sendOk("You have obtained #b#t" + z + "##k.");
				cm.dispose();
				return;
			}
			cm.sendOk("Please make sure you have at least one free slot in both your inventory and your equipment before using the Gachapon Machine.");
			break;
		case 1:
			cm.sendOk("The Gachapon Machine is a random prize game where you can win rare scrolls, equipment, chairs, master books, and other rare items! All you need is a #bGachapon Ticket#k to become a winner of random prizes.");
			break;
		case 2:
			y0 = y1 = y2 = y3 = y4 = y5 = "";
			for (var x0 = 0; x0 < z0.length; x0++)
				y0 += "#v" + z0[x0] + ":#";
			for (var x1 = 0; x1 < z1.length; x1++)
				y1 += "#v" + z1[x1] + ":#";
			for (var x2 = 0; x2 < z2.length; x2++)
				y2 += "#v" + z2[x2] + ":#";
			for (var x3 = 0; x3 < z3.length; x3++)
				y3 += "#v" + z3[x3] + ":#";
			for (var x4 = 0; x4 < z4.length; x4++)
				y4 += "#v" + z4[x4] + ":#";
			for (var x5 = 0; x5 < z5.length; x5++)
				y5 += "#v" + z5[x5] + ":#";
			cm.sendOk("Rare Items:\r\n\r\n" + y0 + "\r\nBow Scrolls:\r\n\r\n" + y1 + "\r\nCrossbow Scrolls:\r\n\r\n" + y2 + "\r\nAgility Scrolls:\r\n\r\n" + y3 + "\r\nSpeed Scrolls:\r\n\r\n" + y4 + "\r\nSkill Books:\r\n\r\n" + y5);
			break;
		case 3:
			cm.sendOk("Gachapon Tickets are available in the MapleStory Cash Shop. You can purchase them using Maple Points or Red Beans. Click the red shop icon in the bottom right corner of the screen to visit the #rMapleStory Cash Shop#k where you can buy Gachapon Tickets.");
	}
	cm.dispose();
}

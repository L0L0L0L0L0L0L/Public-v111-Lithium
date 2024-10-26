/*
	Name: Gachapon Machine
	Map: Ancient Shrine
	Description: 800000000
*/

var z0 = [2430333, 2430337, 2430341, 3010067, 3010069, 3010071, 3010072, 3010073];
var z1 = [2043100, 2043101, 2043102, 2043104, 2043105, 2043110, 2043111, 2043112, 2043113, 2043114];
var z2 = [2043200, 2043201, 2043202, 2043204, 2043205, 2043210, 2043211, 2043212, 2043213, 2043214];
var z3 = [2045200, 2045201, 2045202, 2045203, 2045204];
var z4 = [2040814, 2040815, 2040816, 2040817, 2040818, 2040918, 2040919, 2040920, 2040921, 2040922, 2041009, 2041010, 2041011, 2041032, 2041033];
var z5 = [2290096, 2290125, 2290340, 2290341, 2290342, 2290343, 2290344, 2290345, 2290346, 2290347, 2290348, 2290349, 2290290, 2290291];
var z6 = [2290354, 2290355, 2290356, 2290357, 2290358, 2290361, 2290362, 2290363, 2290364, 2290365, 2290366, 2290367];

function start() {
	if (cm.getPlayer().itemQuantity(5220000) || cm.getPlayer().itemQuantity(5451000)) {
		cm.sendSimple("You can use #b#p" + cm.getNpc() + "##k. Would you like to use your Gachapon Ticket?\r\n#L0#Use Gachapon Ticket#l\r\n#L2#View Gachapon Prizes#l");
	} else {
		cm.sendSimple("Welcome to #b#p" + cm.getNpc() + "##k. How can I assist you?\r\n#L1#What is the Gachapon Machine?#l\r\n#L2#View Gachapon Prizes#l\r\n#L3#Where can I buy Gachapon Tickets?#l");
	}
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			var rand = Math.floor(Math.random() * 100);
			y = rand < 1 ? z0 : rand < 15 ? z1 : rand < 30 ? z2 : rand < 45 ? z3 : rand < 60 ? z4 : rand < 80 ? z5 : z6;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 800000000 ? 5220000 : 5451000, -1);
				cm.sendOk("You have obtained #b#t" + z + "##k.");
				cm.dispose();
				return;
			}
			cm.sendOk("Please ensure you have at least one free slot in both your inventory and your equipment before using the Gachapon Machine.");
			break;
		case 1:
			cm.sendOk("The Gachapon Machine is a random prize game where you can win rare scrolls, equipment, chairs, master books, and other rare items! All you need is a #bGachapon Ticket#k to become a winner of random prizes.");
			break;
		case 2:
			y0 = y1 = y2 = y3 = y4 = y5 = y6 = "";
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
			for (var x6 = 0; x6 < z6.length; x6++)
				y6 += "#v" + z6[x6] + ":#";
			cm.sendOk("Rare Items:\r\n\r\n" + y0 + "\r\nOne-Handed Axe Scrolls:\r\n\r\n" + y1 + "\r\nOne-Handed Staff Scrolls:\r\n\r\n" + y2 + "\r\nDual Bowgun Scrolls:\r\n\r\n" + y3 + "\r\nMagic Scrolls:\r\n\r\n" + y4 + "\r\nSkill Books:\r\n\r\n" + y5 + "\r\nSkill Books:\r\n\r\n" + y6);
			break;
		case 3:
			cm.sendOk("Gachapon Tickets are available in the MapleStory Cash Shop. You can purchase them using Maple Points or Red Beans. Click the red shop icon in the bottom right corner of the screen to visit the #rMapleStory Cash Shop#k where you can buy Gachapon Tickets.");
	}
	cm.dispose();
}

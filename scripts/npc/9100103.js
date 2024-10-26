/*
	Name: Gachapon Machine
	Map: Fallen City
	Description: 103000000
*/

var z0 = [2430315, 2430317, 2430319, 3010047, 3010049, 3010052, 3010055, 3010057];
var z1 = [2044700, 2044701, 2044702, 2044704, 2044705];
var z2 = [2043300, 2043301, 2043302, 2043304, 2043305];
var z3 = [2043400, 2043401, 2043402];
var z4 = [2040319, 2040320, 2040321, 2040322, 2040323, 2040410, 2040411, 2040412, 2040413, 2040414, 2040423, 2040424, 2040425, 2040426, 2040427, 2040515, 2040516, 2040517, 2040520, 2040521, 2040906, 2040907, 2040923, 2040924, 2040925, 2041021, 2041022, 2041023, 2041040, 2041041, 2041109, 2041110, 2041111, 2041118, 2041119, 2041309, 2041310, 2041311, 2041318, 2041319];
var z5 = [2290076, 2290077, 2290078, 2290079, 2290080, 2290081, 2290082, 2290083, 2290084, 2290085, 2290086, 2290087, 2290088, 2290089, 2290090, 2290091, 2290092, 2290093, 2290094, 2290095, 2290096, 2290125, 2290153, 2290154, 2290155, 2290156, 2290157, 2290158, 2290159, 2290160, 2290161];

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
			y = rand < 1 ? z0 : rand < 10 ? z1 : rand < 20 ? z2 : rand < 30 ? z3 : rand < 70 ? z4 : z5;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 103000000 ? 5220000 : 5451000, -1);
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
			cm.sendOk("Rare Items:\r\n\r\n" + y0 + "\r\nKnuckle Scrolls:\r\n\r\n" + y1 + "\r\nShort Sword Scrolls:\r\n\r\n" + y2 + "\r\nDouble Dagger Scrolls:\r\n\r\n" + y3 + "\r\nLuck Scrolls:\r\n\r\n" + y4 + "\r\nSkill Books:\r\n\r\n" + y5);
			break;
		case 3:
			cm.sendOk("Gachapon Tickets are available in the MapleStory Cash Shop. You can purchase them using Maple Points or Red Beans. Click the red shop icon in the bottom right corner of the screen to visit the #rMapleStory Cash Shop#k where you can buy Gachapon Tickets.");
	}
	cm.dispose();
}

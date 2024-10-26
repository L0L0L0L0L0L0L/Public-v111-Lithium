/*
	Name: Gachapon Machine
	Map: Male Bathhouse
	Description: 809000101
*/

var z0 = [2430343, 2430346, 2430348, 3010085, 3010095, 3010096, 3010098, 3010099];
var z1 = [2040003, 2040004, 2040005, 2040010, 2040011, 2040100, 2040101, 2040102, 2040103, 2040104, 2040324, 2040325, 2040326, 2040327, 2040328, 2040408, 2040409, 2040420, 2040421, 2040422, 2040608, 2040609, 2040620, 2040621, 2040622, 2040823, 2040824, 2040825, 2040908, 2040909, 2040926, 2040927, 2040928, 2041006, 2041007, 2041008, 2041030, 2041031];
var z2 = [2040406, 2040407, 2040417, 2040418, 2040419, 2040530, 2040531, 2040532, 2040533, 2040534, 2040929, 2040930, 2040931, 2040932, 2040933, 2041012, 2041013, 2041014, 2041034, 2041035, 2041100, 2041101, 2041102, 2041112, 2041113, 2041300, 2041301, 2041302, 2041312, 2041313];
var z3 = [2040319, 2040320, 2040321, 2040322, 2040323, 2040410, 2040411, 2040412, 2040413, 2040414, 2040423, 2040424, 2040425, 2040426, 2040427, 2040515, 2040516, 2040517, 2040520, 2040521, 2040906, 2040907, 2040923, 2040924, 2040925, 2041021, 2041022, 2041023, 2041040, 2041041, 2041109, 2041110, 2041111, 2041118, 2041119, 2041309, 2041310, 2041311, 2041318, 2041319];
var z4 = [2040706, 2040707, 2040708, 2040716, 2040717];

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
			y = rand < 1 ? z0 : rand < 30 ? z1 : rand < 60 ? z2 : rand < 90 ? z3 : z4;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 809000101 ? 5220000 : 5451000, -1);
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
			y0 = y1 = y2 = y3 = y4 = "";
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
			cm.sendOk("Rare Items:\r\n\r\n" + y0 + "\r\nHP Scrolls:\r\n\r\n" + y1 + "\r\nStrength Scrolls:\r\n\r\n" + y2 + "\r\nLuck Scrolls:\r\n\r\n" + y3 + "\r\nSpeed Scrolls:\r\n\r\n" + y4);
			break;
		case 3:
			cm.sendOk("Gachapon Tickets are available in the MapleStory Cash Shop. You can purchase them using Maple Points or Red Beans. Click the red shop icon in the bottom right corner of the screen to visit the #rMapleStory Cash Shop#k where you can buy Gachapon Tickets.");
	}
	cm.dispose();
}

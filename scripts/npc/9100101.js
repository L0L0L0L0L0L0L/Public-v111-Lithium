/*
	Name: Gachapon Machine
	Map: Magic Forest
	Description: 101000000
*/

var z0 = [2430299, 2430301, 2430303, 2430305, 3010013, 3010016, 3010017, 3010024, 3010026];
var z1 = [2043700, 2043701, 2043702, 2043704, 2043705];
var z2 = [2043800, 2043801, 2043802, 2043804, 2043805];
var z3 = [2040012, 2040013, 2040024, 2040025, 2040026, 2040205, 2040206, 2040207, 2040208, 2040209, 2040300, 2040301, 2040302, 2040304, 2040305, 2040512, 2040513, 2040514, 2040518, 2040519, 2041015, 2041016, 2041017, 2041036, 2041037, 2041103, 2041104, 2041105, 2041114, 2041115, 2041303, 2041304, 2041305, 2041314, 2041315];
var z4 = [2040105, 2040106, 2040107, 2040108, 2040109];
var z5 = [2290024, 2290025, 2290026, 2290027, 2290028, 2290029, 2290030, 2290031, 2290032, 2290033, 2290034, 2290035, 2290036, 2290037, 2290038, 2290039, 2290040, 2290041, 2290042, 2290043, 2290044, 2290045, 2290046, 2290047, 2290048, 2290049, 2290050, 2290051, 2290096, 2290125, 2290206, 2290207];

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
			y = rand < 1 ? z0 : rand < 10 ? z1 : rand < 20 ? z2 : rand < 60 ? z3 : rand < 70 ? z4 : z5;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 101000000 ? 5220000 : 5451000, -1);
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
			cm.sendOk("Rare Items:\r\n\r\n" + y0 + "\r\nShort Staff Scrolls:\r\n\r\n" + y1 + "\r\nLong Staff Scrolls:\r\n\r\n" + y2 + "\r\nIntelligence Scrolls:\r\n\r\n" + y3 + "\r\nAvoidance Scrolls:\r\n\r\n" + y4 + "\r\nSkill Books:\r\n\r\n" + y5);
			break;
		case 3:
			cm.sendOk("Gachapon Tickets are available in the MapleStory Cash Shop. You can purchase them using Maple Points or Red Beans. Click the red shop icon in the bottom right corner of the screen to visit the #rMapleStory Cash Shop#k where you can buy Gachapon Tickets.");
	}
	cm.dispose();
}

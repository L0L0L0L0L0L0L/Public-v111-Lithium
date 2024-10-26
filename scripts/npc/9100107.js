/*
	Name: Gachapon Machine
	Map: Female Bathhouse
	Description: 809000201
*/

var z0 = [2430350, 2430352, 2430354, 3010101, 3010106, 3010113, 3010114, 3010115];
var z1 = [2041000, 2041001, 2041002, 2041026, 2041027];
var z2 = [2040105, 2040106, 2040107, 2040108, 2040109];
var z3 = [2040606, 2040607, 2040617, 2040618, 2040619, 2040703, 2040704, 2040705, 2040714, 2040715];
var z4 = [2040758, 2040759, 2040760, 2040803, 2040804, 2040805, 2040810, 2040811, 2040914, 2040915, 2040916, 2040917];

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
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 809000201 ? 5220000 : 5451000, -1);
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
			cm.sendOk("Rare Items:\r\n\r\n" + y0 + "\r\nMagic Defense Scrolls:\r\n\r\n" + y1 + "\r\nEvasion Scrolls:\r\n\r\n" + y2 + "\r\nJump Scrolls:\r\n\r\n" + y3 + "\r\nAttack Scrolls:\r\n\r\n" + y4);
			break;
		case 3:
			cm.sendOk("Gachapon Tickets are available in the MapleStory Cash Shop. You can purchase them using Maple Points or Red Beans. Click the red shop icon in the bottom right corner of the screen to visit the #rMapleStory Cash Shop#k where you can buy Gachapon Tickets.");
	}
	cm.dispose();
}

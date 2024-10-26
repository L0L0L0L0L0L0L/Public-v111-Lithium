/*
	Name: Gachapon Machine
	Map: Fantasia Village
	Description: 105000000
*/

var z0 = [2430325, 2430329, 2430331, 3010058, 3010063, 3010064, 3010065, 3010066];
var z1 = [2044400, 2044401, 2044402, 2044404, 2044405, 2044410, 2044411, 2044412, 2044413, 2044414];
var z2 = [2040000, 2040001, 2040002, 2040008, 2040009, 2040308, 2040309, 2040310, 2040311, 2040312, 2040400, 2040401, 2040402, 2040404, 2040405, 2040503, 2040504, 2040505, 2040510, 2040511, 2040600, 2040601, 2040602, 2040604, 2040605, 2040900, 2040901, 2040902, 2040904, 2040905, 2041003, 2041004, 2041005, 2041028, 2041029];
var z3 = [2040012, 2040013, 2040024, 2040025, 2040026, 2040205, 2040206, 2040207, 2040208, 2040209, 2040300, 2040301, 2040302, 2040304, 2040305, 2040512, 2040513, 2040514, 2040518, 2040519, 2041015, 2041016, 2041017, 2041036, 2041037, 2041103, 2041104, 2041105, 2041114, 2041115, 2041303, 2041304, 2041305, 2041314, 2041315];
var z4 = [2290126, 2290127, 2290128, 2290129, 2290130, 2290131, 2290132, 2290133, 2290134, 2290135, 2290136, 2290137, 2290138, 2290139, 2290378, 2290379];
var z5 = [2290096, 2290125, 2290140, 2290141, 2290142, 2290143, 2290144, 2290145, 2290146, 2290147, 2290148, 2290149, 2290150, 2290151, 2290152];

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
			y = rand < 1 ? z0 : rand < 15 ? z1 : rand < 45 ? z2 : rand < 70 ? z3 : rand < 85 ? z4 : z5;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 105000000 ? 5220000 : 5451000, -1);
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
			cm.sendOk("Rare Items:\r\n\r\n" + y0 + "\r\nSpear Scrolls:\r\n\r\n" + y1 + "\r\nDefense Scrolls:\r\n\r\n" + y2 + "\r\nIntelligence Scrolls:\r\n\r\n" + y3 + "\r\nSkill Books:\r\n\r\n" + y4 + "\r\nSkill Books:\r\n\r\n" + y5);
			break;
		case 3:
			cm.sendOk("Gachapon Tickets are available in the MapleStory Cash Shop. You can purchase them using Maple Points or Red Beans. Click the red shop icon in the bottom right corner of the screen to visit the #rMapleStory Cash Shop#k where you can buy Gachapon Tickets.");
	}
	cm.dispose();
}

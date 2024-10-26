/*
	Name:	Gachapon Machine
	Map:	Restaurant
	Description:	120000103
*/

var z0 = [2430362, 2430536, 2430339, 3010126, 3010127, 3010128, 3010129, 3010130];

var z1 = [2044800, 2044801, 2044802, 2044803, 2044804, 2044805, 2044806, 2044807, 2044808, 2044809];

var z2 = [2044900, 2044901, 2044902, 2044903, 2044904];

var z3 = [2045300, 2045301, 2045302, 2045303, 2045304];

var z4 = [2040014, 2040015, 2040016, 2040017, 2040018, 2040201, 2040202, 2040203, 2040204, 2040812, 2040813];

var z5 = [2290096, 2290097, 2290098, 2290099, 2290100, 2290101, 2290102, 2290103, 2290104, 2290105, 2290106, 2290107, 2290108, 2290110, 2290111, 2290112, 2290113, 2290114, 2290115, 2290116, 2290117, 2290118, 2290119, 2290120, 2290121, 2290122, 2290123, 2290124, 2290125, 2290322, 2290323, 2290324, 2290325, 2290326, 2290327, 2290329, 2290330, 2290331, 2290332, 2290333, 2290334];

function start() {
	if (cm.getPlayer().itemQuantity(5220000) || cm.getPlayer().itemQuantity(5451000))
		cm.sendSimple("You can use #b#p" + cm.getNpc() + "##k. Would you like to use your gachapon tickets?\r\n#L0#Use gachapon ticket to draw#l\r\n#L2#View gachapon machine prizes#l");
	else
		cm.sendSimple("Welcome to #b#p" + cm.getNpc() + "##k. How can I help you?\r\n#L1#What is a gachapon machine?#l\r\n#L2#View gachapon machine prizes#l\r\n#L3#Where can I buy gachapon tickets?#l");
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			var rand = Math.floor(Math.random() * 100);
			y = rand < 1 ? z0 : rand < 20 ? z1 : rand < 40 ? z2 : rand < 60 ? z3 : rand < 80 ? z4 : z5;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 120000103 ? 5220000 : 5451000, -1);
				cm.sendOk("You have obtained #b#t" + z + "##k.");
				cm.dispose();
				return;
			}
			cm.sendOk("Before using the gachapon machine, please ensure you have one free slot each in your consumption and decoration inventory.");
			break;
		case 1:
			cm.sendOk("The gachapon machine is a random game where you can win rare scrolls, equipment, chairs, master books, and other rare items! All you need is a #b gachapon ticket#k to become a winner of the random draw.");
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
			cm.sendOk("Rare Items:\r\n" + y0 + "\r\nFinger Tiger Scrolls:\r\n\r\n" + y1 + "\r\nFire Gun Scrolls:\r\n\r\n" + y2 + "\r\nFire Cannon Scrolls:\r\n\r\n" + y3 + "\r\nAccuracy Scrolls:\r\n\r\n" + y4 + "\r\nSkill Books:\r\n\r\n" + y5);
			break;
		case 3:
			cm.sendOk("Gachapon tickets are available in the MapleStory mall and can be purchased using Maple Points or Reward Points. Click the red shop icon in the bottom right corner of the screen to access the #rMapleStory Mall#k, where you can buy gachapon tickets.");
	}
	cm.dispose();
}

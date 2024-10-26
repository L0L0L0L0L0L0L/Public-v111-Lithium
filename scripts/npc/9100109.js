/*
	Name:	Mini Gachapon Machine
	Map:	New Leaf City - City Center
	Description:	600000000
*/

var z0 = [2430356, 2430358, 2430360, 3010119, 3010120, 3010123, 3010124, 3010125];

var z1 = [2043800, 2043801, 2043802, 2043804, 2043805];

var z2 = [2044600, 2044601, 2044602, 2044604, 2044605];

var z3 = [2044900, 2044901, 2044902, 2044903, 2044904];

var z4 = [2040606, 2040607, 2040617, 2040618, 2040619, 2040703, 2040704, 2040705, 2040714, 2040715];

var z5 = [2290226, 2290227, 2290228, 2290229, 2290230, 2290231, 2290232, 2290233, 2290234, 2290235, 2290236, 2290237, 2290328, 2290359, 2290360, 2290374];

var z6 = [2290238, 2290239, 2290240, 2290241, 2290242, 2290243, 2290244, 2290246, 2290247, 2290370, 2290411];

var z7 = [2290275, 2290276, 2290277, 2290278, 2290279, 2290280, 2290281, 2290282, 2290283, 2290284];

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
			y = rand < 1 ? z0 : rand < 10 ? z1 : rand < 20 ? z2 : rand < 30 ? z3 : rand < 50 ? z4 : rand < 70 ? z5 : rand < 85 ? z6 : z7;
			z = cm.gainGachaponItem(y[Math.floor(Math.random() * y.length)], 1);
			if (z != -1) {
				cm.gainItem(cm.getPlayer().itemQuantity(5220000) && cm.getPlayer().getMap().getId() == 600000000 ? 5220000 : 5451000, -1);
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
			y0 = y1 = y2 = y3 = y4 = y5 = y6 = y7 = "";
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
			for (var x7 = 0; x7 < z7.length; x7++)
				y7 += "#v" + z7[x7] + ":#";
			cm.sendOk("Rare Items:\r\n" + y0 + "\r\nStaff Scrolls:\r\n\r\n" + y1 + "\r\nCrossbow Scrolls:\r\n\r\n" + y2 + "\r\nFire Gun Scrolls:\r\n\r\n" + y3 + "\r\nJump Scrolls:\r\n\r\n" + y4 + "\r\nSkill Books:\r\n\r\n" + y5 + "\r\nSkill Books:\r\n\r\n" + y6 + "\r\nSkill Books:\r\n\r\n" + y7);
			break;
		case 3:
			cm.sendOk("Gachapon tickets are available in the MapleStory mall and can be purchased using Maple Points or Reward Points. Click the red shop icon in the bottom right corner of the screen to access the #rMapleStory Mall#k, where you can buy gachapon tickets.");
	}
	cm.dispose();
}

/*
	Name: Hummel
	Map: Professional Skill Village <Meister Town>
	Description: 910001000
*/

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
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			cm.sendNext("If you want to understand professional skills, I'll give a brief explanation. In this village, there are a total of #bHerb Gathering, Mining, Equipment Crafting, Accessory Crafting, and Alchemy#k artisans.");
			break;
		case 1:
			cm.sendPrev("To increase the efficiency of professional skills, our association has stipulated that each person can learn 2 professional skills. According to this rule, you can only learn 1 gathering skill and 1 crafting skill.\r\n\r\n#rHerb Gathering + Alchemy\r\nMining + Gem Handcrafting\r\nMining + Equipment Crafting");
			break;
		case 2:
			cm.dispose();
	}
}

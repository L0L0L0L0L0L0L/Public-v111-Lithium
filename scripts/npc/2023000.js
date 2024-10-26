/*
	名字:	危險地帶超高速計程車
	地圖:	奇幻村
	描述:	105000000
*/

var cost =[15000, 35000, 45000, 45000, 45000, 45000, 25000, 25000, 25000, 25000, 35000, 35000, 55000, 200000, 55000, 55000];
var map =[105030000, 220000000, 211040200, 300000100, 211060000, 211041400, 220050300, 221000000, 222000000, 300000100, 220000000, 300000100, 240030000, 240040500, 220000000, 211000000];

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
		if (type < 3) {
		cm.sendNext("Hmm, please think this over. It's not cheap, but you will NOT be disappointed with our premier service!");
		cm.dispose();
		return;
		}
		if (type < 6) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (cm.getPlayer().getMap().getId() == 105000000) {
			cm.sendNext("Hello there! This Danger Zone Taxi can take you from #m105000000# to #b#m105030000##k for #b15000 mesos#k.");
			}
		if (cm.getPlayer().getMap().getId() == 105030000) {
			cm.sendYesNo("Hello there! Thanks for considering the Danger Zone Taxi. It's only #b15000 mesos#k to #b#m105000000##k. Would you like to try it out?");
			}
		if (cm.getPlayer().getMap().getId() == 211000000) {
			cm.sendNext("Hello there! This taxi takes you to dangerous places in Ossyria faster than an arrow! We go from #m211000000# all the way to #b#m211040200#, Ellin Forest, the Lion King's Castle, and #m211041400##k! It'll cost you #b45000 Mesos#k. I know it's a bit expensive, but it's well worth passing all those dangerous areas.");
			}
		if (cm.getPlayer().getMap().getId() == 220000000) {
			cm.sendNext("Hello there! This taxi takes you to dangerous places in Ossyria faster than an arrow! We go from #m220000000# all the way to #b#m220050300#, #m221000000#, #m222000000#, and Ellin Forest#k! It'll cost you #b25000 Mesos#k. I know it's a bit expensive, but it's well worth passing all those dangerous areas.");
			}
		if (cm.getPlayer().getMap().getId() == 221000000) {
			cm.sendNext("Hello there! This Taxi takes you from #m221000000# to #b#m220000000# and Ellin Forest#k! It'll cost you #b35000 mesos#k. I know it's a bit expensive, but it's well worth passing through all those dangerous areas in an instant!");
			}
		if (cm.getPlayer().getMap().getId() == 220050300) {
			cm.sendNext("Hello there! This taxi takes you from the #m220050300# to #b#m220000000##k for #b35000 mesos#k. I know it's a bit expensive, but it's well worth passing all those dangerous areas.");
			}
		if (cm.getPlayer().getMap().getId() == 240000000) {
			cm.sendNext("Hello there! This taxi takes you to dangerous places in Ossyria faster than an arrow! We go from #m240000000# all the way to #b#m240030000# and #m240040500#! #m240030000##k will cost 55,000 mesos and #b#m240040500##k will cost 200,000 mesos. I know it's a bit expensive, but it's well worth passing all the dangerous areas.");
			}
		if (cm.getPlayer().getMap().getId() == 300000100) {
			cm.sendNext("Hello there! This taxi takes you to dangerous places in Ossyria faster than an arrow! We go from #m300000100# all the way to #b#m220000000#, and #m211000000##k! It'll cost you #b55000 Mesos#k. I know it's a bit expensive, but it's well worth passing all those dangerous areas.");
			}
			break;
	case 1:
		if (cm.getPlayer().getMap().getId() == 105000000) {
			cm.sendYesNo("Would you like to pay #b15000 Mesos#k to travel to #b#m105030000##k?");
			}
		if (cm.getPlayer().getMap().getId() == 105030000) {
		if (cm.getPlayer().getMeso() < 15000) {
			cm.sendNext("I don't think you have enough mesos. I'd drive you for free, but we've all got to make a living. Why don't you hunt some monsters for mesos, then come on back?");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(105000000), cm.getMap(105000000).getPortal(0));
			cm.gainMeso(-15000);
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMap().getId() == 211000000) {
			cm.sendSimple("The fare is #b45000 mesos#k. Where would you like to go? \r\n\r\n#b#L2##m211040200##l\r\n#L3#Ellin Forest#l\r\n#L4#Lion King's Castle#l\r\n#L5##m211041400##l");
			}
		if (cm.getPlayer().getMap().getId() == 220000000) {
			cm.sendSimple("The fare is #b25000 mesos#k. Where would you like to go? \r\n\r\n#b#L6##m220050300##l\r\n#L7##m221000000##l\r\n#L8##m222000000##l\r\n#L9#Ellin Forest#l");
			}
		if (cm.getPlayer().getMap().getId() == 221000000) {
			cm.sendSimple("The fare is #b35000 mesos#k. Where would you like to go? \r\n\r\n#b#L10##m220000000##l\r\n#L11#Ellin Forest#l");
			}
		if (cm.getPlayer().getMap().getId() == 220050300) {
			cm.sendYesNo("Would you like to pay #b35000 Mesos#k to travel to #b#m220000000##k?");
			}
		if (cm.getPlayer().getMap().getId() == 240000000) {
			cm.sendSimple("Where would you like to go? \r\n\r\n#b#L12##m240030000# (55,000 mesos)#l\r\n#L13##m240040500# (200,000 mesos)#l");
			}
		if (cm.getPlayer().getMap().getId() == 300000100) {
			cm.sendSimple("The fare is #b55000 mesos#k. Where would you like to go? \r\n\r\n#b#L14##m220000000##l\r\n#L15##m211000000##l");
			}
			break;
	case 2:
		selection = selection < 1 ? (cm.getPlayer().getMap().getId() == 105000000 ? 0 : 1) : selection;

		if (cm.getPlayer().getMeso() < cost[selection]) {
			cm.sendNext("I don't think you have enough mesos. I'd drive you for free, but we've all got to make a living. Why don't you hunt some monsters for mesos, then come on back?");
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(map[selection]), cm.getMap(map[selection]).getPortal(0));
			cm.gainMeso(-cost[selection]);
			cm.dispose();
}
}
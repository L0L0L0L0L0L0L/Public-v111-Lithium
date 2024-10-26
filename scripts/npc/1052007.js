/*
	名字:	檢票口
	地圖:	地鐵售票處
	描述:	103020000
*/

var item = [4031036, 4031037, 4031038];
var map = [910360000, 910360100, 910360200];

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
		if (status < 2) {
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
		cm.sendSimple("Pick your destination. #b" + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1600)).getStatus() > 0 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1602)).getStatus() < 2 ? "\r\n#L0##eSubway Construction Site#n#l" : "") + "\r\n#L1#Kerning city Subway#r(Beware of Stirges and Wr aiths!)#l\r\n#L2##bKerning Square Shopping Center (Get on the Subway).#l\r\n\r\n#L3#Enter Construction Site#l\r\n#L4#New Leaf City#l");
		break;
	case 1:
		if (selection == 0) { //維修中的列車
			if (cm.getMap(931050400).getCharacters().size() > 0 || cm.getMap(931050402).getCharacters().size() > 0) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in the Subway Construction Site. Please try again later."));
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(931050400), cm.getMap(931050400).getPortal(1));
			cm.dispose();
			return;
			}
		if (selection == 1) { //沿著軌道
			cm.getPlayer().changeMap(cm.getMap(103020100), cm.getMap(103020100).getPortal(2));
			cm.dispose();
			return;
			}
		if (selection == 2) { //廢都廣場
			cm.getPlayer().changeMap(cm.getMap(103020010), cm.getMap(103020010).getPortal(0));
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("The next stop is at Kerning Square Station. The exit is to your left."));
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The next stop is at Kerning Square Station. The exit is to your left."));
			cm.getPlayer().startMapTimeLimitTask(10, cm.getMap(103020020));
			cm.dispose();
			}
		if (selection == 3) { //工地區域
			if (!(cm.getPlayer().itemQuantity(4031036) || cm.getPlayer().itemQuantity(4031037) || cm.getPlayer().itemQuantity(4031038))) {
			cm.sendNext("Here's the ticket reader. You are not allowed in without the ticket.");
			cm.dispose();
			return;
			}
			chat = "Here's the ticket reader. You will be brought in immediately. Which ticket would you like to use? #b";
			for (i = 0; i < item.length; i++)
			if (cm.getPlayer().itemQuantity(item[i]))
			chat += "\r\n#L" + i + "# Construction site B" + (i + 1) + "#l";
			cm.sendSimple(chat);
			}
		if (selection == 4) {
			if (!cm.getPlayer().itemQuantity(4031711)) {
			cm.sendNext("Here's the ticket reader. You are not allowed in without the ticket.");
			cm.dispose();
			return;
			}
			em = cm.getEventManager("Subway");
			if (em.getProperty("entry") == "false" && em.getProperty("docked") == "true") {
			cm.sendNext("We will begin boarding 1 minute before the takeoff. Please be patient. Be aware that the subway will take off promptly, and we stop receiving tickets 1 minute prior, so please make sure to arrive on time.");
			cm.dispose();
			return;
			}
			if (em.getProperty("entry") == "false") {
			cm.sendNext("The subway for Kerning city  is preparing for takeoff. I'm sorry, but you'll have to hop on the next ride. The ride schedule is available through the usher at the ticketing booth.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("It looks like there's plenty of room for this ride. Please have your ticket ready so I can let you in. The ride will be long, but you'll get to your destination just fine. Would you like to get on this ride?");
			}
			select = selection;
			break;
	case 2:
		if (select == 3) {
			cm.gainItem(item[selection], -1);
			cm.getPlayer().changeMap(cm.getMap(map[selection]), cm.getMap(map[selection]).getPortal(0));
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(600010004), cm.getMap(600010004).getPortal(0));
			cm.dispose();
}
}
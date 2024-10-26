/*
    Name:    Bell
    Map:     Subway Ticket Booth
    Description:    103020000
*/

var cost = 5000;

function start() {
	map = cm.getPlayer().getMap().getId();
	item = (4031711 + parseInt(map / 300000000));
	cm.sendYesNo(map == 103020000 || map == 600010001 ?
		"Hello, I am Bell, the subway ticket agent. From this station to #b" +
		(map == 103020000 ? "New Leaf City - City Center" : "Fallen City") +
		"#k will cost you #b" + cost + "#k mesos. You need to purchase #b#t" +
		item + "##k to ride the subway." :
		"Do you want to leave before the train departs? If you want to re-enter, you will need to buy another ticket."
	);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (map == 103020000 || map == 600010001) {
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in other item slots"));
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMeso() < cost) {
				cm.sendOk("Sorry, please make sure you have #b" + cost + "#k mesos.");
				cm.dispose();
				return;
			}
			cm.gainMeso(-cost);
			cm.gainItem(item, 1);
			cm.sendOk("Please take your #b#v" + item + "##t" + item + "##k.");
			cm.dispose();
			return;
		}
		cm.getPlayer().changeMap(cm.getMap(map == 600010002 ? 600010001 : 103020000), cm.getMap(map == 600010002 ? 600010001 : 103020000).getPortal(0));
	}
	cm.dispose();
}

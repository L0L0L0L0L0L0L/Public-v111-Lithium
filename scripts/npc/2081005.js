/*
	Name: Carobin
	Map: Life's Cave Entrance
	Description: 240040700
*/

function start() {
	if (cm.getPlayer().getBuffSource(Packages.client.MapleBuffStat.MORPH) == 2210003 || cm.getPlayer().itemQuantity(4001086)) {
		cm.getPlayer().changeMap(cm.getMap(240050000), cm.getMap(240050000).getPortal(1));
		cm.dispose();
		return;
	}
	cm.sendOk("Ahead is the cave where the most powerful creature of the Minar Forest, the Dark Dragon King, resides. Foreigners are #bprohibited from passing#k.");
	cm.dispose();
}

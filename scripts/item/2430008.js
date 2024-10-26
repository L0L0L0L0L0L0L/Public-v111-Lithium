/*
	名字:	金指南針
	地圖:	金指南針
	描述:	特殊消耗品
*/

function start() {
	for (var i = 390000000; i < 390000005; i++)
	if (im.getMap(i).getCharacters().size() < 1) {
		im.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("RICHIE"));
		im.getPlayer().changeMap(im.getMap(i), im.getMap(i).getPortal(0));
		im.gainItem(2430008, -1);
		im.dispose();
		return;
		}
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Make sure you have enough space in your inventory."));
		im.dispose();
}
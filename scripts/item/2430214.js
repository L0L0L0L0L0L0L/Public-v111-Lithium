/*
	名字:	提神飲料-咖啡因飲料
	地圖:	提神飲料-咖啡因飲料
	描述:	特殊消耗品
*/

function start() {
	if (im.getPlayer().getFatigue() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The character is full of energy and does not need to be used."));
		im.dispose();
		return;
		}
		im.gainItem(2430214, -1);
		im.getPlayer().setFatigue(im.getPlayer().getFatigue() - 30);
		im.dispose();
}
/*
	名字:	納希沙漠
	地圖:	納希宮殿
	描述:	260000300
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4031582)) {
		pi.getPlayer().changeMap(pi.getMap(260000301), pi.getMap(260000301).getPortal(5)); //納希宮殿(庭園&gt;
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Those who have not received the permit cannot enter the palace."));
		return false;
}
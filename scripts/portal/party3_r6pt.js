/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;向上通道&gt;
	描述:	920010700
*/

function enter(pi) {
	x = pi.getPortal().getName();
	eim = pi.getPlayer().getEventInstance();
	for (var i = 1; i < 9; i++) {
	if (eim.getProperty(i + "st") == null) {
		eim.setProperty(i + "st", ("rp0"+ i) + (Math.floor(Math.random() * 4) + 1));
		}
	if (eim.getProperty(i + "st") == x) {
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.instantMapWarp(pi.getPlayer().getMap().getPortal("np0" + (pi.getPortal().getName().substring(3, 4) - 1)).getId()));
		pi.getPlayer().getMap().movePlayer(pi.getPlayer(), new java.awt.Point(pi.getPlayer().getMap().getPortal("np0" + (pi.getPortal().getName().substring(3, 4) - 1)).getPosition()));
		return true;
		}
		}
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.instantMapWarp(pi.getPlayer().getMap().getPortal(x.substring(2, 5) > 54 ? "np03" : "np16").getId()));
		pi.getPlayer().getMap().movePlayer(pi.getPlayer(), new java.awt.Point(pi.getPlayer().getMap().getPortal(x.substring(2, 5) > 54 ? "np03" : "np16").getPosition()));
		return true;
}
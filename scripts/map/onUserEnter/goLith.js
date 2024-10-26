/*
	名字:	楓之島
	地圖:	乘船動畫
	描述:	2010000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
	ms.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction3.img/goLith/Scene" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
	ms.dispose();
}
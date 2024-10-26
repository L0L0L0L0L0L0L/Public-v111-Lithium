/*
	名字:	楓之島
	地圖:	海盗教程
	描述:	1020500
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction3.img/pirate/Scene" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
	ms.dispose();
}
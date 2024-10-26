/*
	名字:	楓之島
	地圖:	剑士教程
	描述:	1020100
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction3.img/swordman/Scene" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
	ms.dispose();
}
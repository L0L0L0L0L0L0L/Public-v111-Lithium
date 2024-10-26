/*
	名字:	可可島
	地圖:	火箭著陸
	描述:	912060400
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/Scene01"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/out02"));
	ms.dispose();
}
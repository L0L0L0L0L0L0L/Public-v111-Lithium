/*
	名字:	菇菇城堡
	地圖:	菇菇城堡動畫
	描述:	106020501
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi1"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi2"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi22"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi3"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi4"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi5"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi6"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi7"));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/gasi/gasi8"));
	ms.dispose();
}
/*
	名字:	那因哈特的職業介紹人
	地圖:	皇家騎士團
	描述:	913040100
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 913040106:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(0));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction.img/cygnus/Scene6"));
		break;
	default:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction.img/cygnus/Scene" + (ms.getPlayer().getMap().getId() - 913040100)));
		}
		ms.dispose();
}
/*
	名字:	楓之島
	地圖:	菇菇村訓練所入口
	描述:	0
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction3.img/goAdventure/Scene" + (ms.getPlayer().getGender() == 0 ? "0" : "1")));
	ms.dispose();
}
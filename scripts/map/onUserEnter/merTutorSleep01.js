/*
	名字:	精靈之林
	地圖:	國王休息處
	描述:	910150006
*/

function start() {
	while (ms.getPlayer().getLevel() < 10) {
		ms.getPlayer().levelUp();
	}
	ms.getPlayer().changeJob(2300);
	Packages.server.quest.MapleQuest.getInstance(24008).forceStart(ms.getPlayer(), 0, 1);
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction5.img/mersedesTutorial/Scene1"));
	ms.dispose();
}
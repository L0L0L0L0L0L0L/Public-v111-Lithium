/*
	名字:	黑路
	地圖:	死路森林
	描述:	914000300
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(21002).indexOf("fin=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(21002, pi.getPlayer().getInfoQuest(21002) + ";fin=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/Child"));
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/ClickChild"));
		return false;
}
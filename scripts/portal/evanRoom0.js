/*
	名字:	猶他家
	地圖:	小閣樓
	描述:	100030100
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("mo30=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";mo30=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/evanTutorial/evanBalloon30"));
		return true;
}
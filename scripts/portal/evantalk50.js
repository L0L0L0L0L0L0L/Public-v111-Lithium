/*
	名字:	隱密之地
	地圖:	遺失的路
	描述:	900020210
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(22013).indexOf("mo50=o") != -1) {
		return false;
		}
		pi.getPlayer().updateInfoQuest(22013, pi.getPlayer().getInfoQuest(22013) + ";mo50=o");
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/evanTutorial/evanBalloon50"));
		return true;
}
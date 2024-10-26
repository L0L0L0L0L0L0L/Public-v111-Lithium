/*
	名字:	隱藏地圖
	地圖:	惡魔的老家
	描述:	924020000
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/normalEffect/demonSlayer/chatBalloon" + pi.getPortal().getName().substring(pi.getPortal().getName().length() - 1, pi.getPortal().getName().length())));
	return true;
}
/*
	名字:	楓之島
	地圖:	大菇菇
	描述:	50000
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("UI/tutorial.img/26"));
	return true;
}
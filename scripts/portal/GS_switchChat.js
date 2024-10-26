/*
	名字:	霧之海
	地圖:	第5 作戰室
	描述:	923020114
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction3.img/ghostShip/chat"));
	return true;
}
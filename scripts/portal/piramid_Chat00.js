/*
	名字:	隱藏地圖
	地圖:	金字塔山丘
	描述:	926010000
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction2.img/piramid/anubis"));
	return true;
}
/*
	名字:	隱藏地圖
	地圖:	聯盟的結成
	描述:	913050003
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction5.img/unitedMaple/Scene3"));
	ms.dispose();
}
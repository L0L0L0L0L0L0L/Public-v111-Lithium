/*
	名字:	隱藏地圖
	地圖:	訓練房的倉庫
	描述:	931050200
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Defeat the spy with black wings."));
	ms.dispose();
}
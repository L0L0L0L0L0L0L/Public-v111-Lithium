/*
	名字:	隱藏地圖
	地圖:	傑利麥勒實驗室入口
	描述:	931000640
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The entrance has been blocked."));
	return true;
}
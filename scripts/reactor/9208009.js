/*
	名字:	威廉的古堡
	地圖:	死亡迴廊
	描述:	990000800
*/

function act() {
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The entrance to the throne has been opened."));
}
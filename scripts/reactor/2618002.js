/*
	名字:	隱藏地圖
	地圖:	特殊實驗室
	描述:	926100200
*/

function act() {
	rm.getMap(rm.getPlayer().getMap().getId() + 1).getReactorById(2618003).forceHitReactor(1);
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The automatic door has been opened."));
}
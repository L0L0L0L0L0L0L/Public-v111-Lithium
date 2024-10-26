/*
	名字:	毒霧森林
	地圖:	森林外圍出口
	描述:	930000800
*/

function act() {
	rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The water source has been purified."));
}


//4001164		巨人毒珠
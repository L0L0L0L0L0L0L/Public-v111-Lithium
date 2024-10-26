/*
	名字:	冰原雪域
	地圖:	通往殘暴炎魔之門
	描述:	211042300
*/

function enter(pi) {
	if (!pi.getPlayer().itemQuantity(4001017)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You do not have the Eye of Fire. You may not face the boss."));
		return false;
		}
		map = pi.getPlayer().getMap().getId() + 100; //殘暴炎魔祭壇入口
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
		return true;
}
/*
	名字:	阿杜比斯的任務Ⅰ
	地圖:	不知名的廢礦
	描述:	280010000
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty(pi.getPlayer().getName()) != null) { //領取過獎勵的玩家可以離開
		pi.getPlayer().changeMap(pi.getMap(280090000), pi.getMap(280090000).getPortal(0)); //悲憤之室
		return true;
		}
	if (eim.getProperty("reward1") != null || eim.getProperty("reward2") != null) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Your have yet to claim your prize. Talk to Aura."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Your team has not yet completed the trials. Fetch the Fire Ore and give it to Aura first."));
		return false;
}
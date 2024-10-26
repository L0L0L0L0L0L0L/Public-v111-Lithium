/*
	名字:	米納爾森林
	地圖:	天空巢穴
	描述:	240080800
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
	if (pi.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please make some space before leaving."));
		return false;
		}
		y = pi.getPlayer().getJob();
	if (y > 100 && y < 140 || y > 1100 && y < 1120 || y > 2000 && y < 2120 || y > 3100 && y < 3120) {
		pi.gainItem(2022652, 1);
		}
	if (y > 200 && y < 240 || y > 1200 && y < 1220 || y > 2200 && y < 2220 || y > 3200 && y < 3220) {
		pi.gainItem(2022653, 1);
		}
	if (y > 300 && y < 330 || y > 1300 && y < 1320 || y > 2300 && y < 2320 || y > 3300 && y < 3320) {
		pi.gainItem(2022654, 1);
		}
	if (y > 400 && y < 440 || y > 1400 && y < 1420) {
		pi.gainItem(2022655, 1);
		}
	if (y > 500 && y < 540 || y > 1500 && y < 1520 || y > 3500 && y < 3520) {
		pi.gainItem(2022656, 1);
		}
		pi.addTrait("will", 40);
		pi.addTrait("charisma", 10);
		pi.gainExp(pi.getPlayer().getLevel() * 1000);
		pi.getPlayer().changeMap(pi.getMap(240080050), pi.getMap(240080050).getPortal(0)); //亡者的洞穴
		return true;
}
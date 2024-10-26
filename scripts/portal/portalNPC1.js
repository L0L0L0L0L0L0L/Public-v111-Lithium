/*
	名字:	次元的縫隙
	地圖:	阿卡伊農的祭壇前
	描述:	272020110
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 272020200) {
		pi.openNpc(2144018);
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(272020110), pi.getMap(272020110).getPortal(2)); //阿卡伊農的祭壇前
		return true;
}
/*
	名字:	童話村
	地圖:	狐狸山坡
	描述:	222010300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3647)).getStatus() == 1 && pi.getPlayer().itemQuantity(4031793)) {
		pi.getPlayer().changeMap(pi.getMap(922220000), pi.getMap(922220000).getPortal(4)); //陰森森林
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(222010200), pi.getMap(222010200).getPortal(5)); //老虎山坡
		return true;
}
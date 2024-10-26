/*
	名字:	組隊任務
	地圖:	大師議會大廳
	描述:	610030600
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("mob1").getState() > 1 && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(610030700), pi.getMap(610030700).getPortal(0)); //大師秘密房間
		}
		return false;
}
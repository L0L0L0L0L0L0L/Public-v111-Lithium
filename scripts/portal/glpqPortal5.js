/*
	名字:	組隊任務
	地圖:	團結的測試
	描述:	610030500
*/

function enter(pi) {
	var nun = pi.getPlayer().getMap().getReactorByName("5weapon0").getState() + pi.getPlayer().getMap().getReactorByName("5weapon1").getState() + pi.getPlayer().getMap().getReactorByName("5weapon2").getState() + pi.getPlayer().getMap().getReactorByName("5weapon3").getState() + pi.getPlayer().getMap().getReactorByName("5weapon4").getState();
	if (nun > 4) {
		pi.getPlayer().changeMap(pi.getMap(610030600), pi.getMap(610030600).getPortal(0)); //大師議會大廳
		}
		return false;
}
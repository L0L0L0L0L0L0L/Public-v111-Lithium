/*
	名字:	組隊任務
	地圖:	機智的測試
	描述:	610030400
*/

function enter(pi) {
	var nun = pi.getPlayer().getMap().getReactorByName("4skill0a").getState() + pi.getPlayer().getMap().getReactorByName("4skill1a").getState() + pi.getPlayer().getMap().getReactorByName("4skill2a").getState() + pi.getPlayer().getMap().getReactorByName("4skill3a").getState() + pi.getPlayer().getMap().getReactorByName("4skill4a").getState();
	if (nun > 9) {
		pi.getPlayer().changeMap(pi.getMap(610030500), pi.getMap(610030500).getPortal(0)); //團結的測試
		}
		return false;
}
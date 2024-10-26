/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;岔路&gt;
	描述:	920010000
*/

function act() {
	rm.getPlayer().getMap().getReactorByName("eak").forceHitReactor(rm.getPlayer().getMap().getReactorByName("eak").getState() + 1);
	rm.dropItems();
}


//4001063		雲片
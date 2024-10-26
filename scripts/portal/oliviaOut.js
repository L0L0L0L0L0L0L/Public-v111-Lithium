/*
	名字:	闹鬼宅邸
	地圖:	682010102
	描述:	682010102
*/

function enter(pi) {
	if (pi.getPlayer().getEventInstance() != null ) {
	var s = parseInt(pi.getPlayer().getEventInstance().getProperty("Olivia"));
		pi.gainExp((s == 0 ? 1500 : (s == 1 ? 3000 : 9000)));
		pi.gainNX((s == 0 ? 150 : (s == 1 ? 300 : 600)));
		}
		pi.getPlayer().changeMap(pi.getMap(682000000), pi.getMap(682000000).getPortal(0)); //鬧鬼宅邸外部
}
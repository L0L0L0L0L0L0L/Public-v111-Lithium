/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;罪人之室&gt;
	描述:	920010900
*/

function enter(pi) {
	if (pi.getMap(920010100).getReactorByName("minerva").getState() > 4) {
		pi.getPlayer().changeMap(pi.getMap(920010910), pi.getMap(920010910).getPortal(1)); //雅典娜禁地&amp;lt;監獄Ⅰ&gt;
		}
		return false;
}
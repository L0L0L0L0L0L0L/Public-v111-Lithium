/*
	名字:	隱密之地
	地圖:	女神之塔&amp;lt;中央塔&gt;
	描述:	920010100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(920010300), pi.getMap(920010300).getPortal(1)); //雅典娜禁地&amp;lt;倉庫&gt;
	return true;
}
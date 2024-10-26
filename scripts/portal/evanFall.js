/*
	名字:	隱密之地
	地圖:	茂盛的森林
	描述:	900020100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(900090102), pi.getMap(900090102).getPortal(0)); //動畫 教程2
	return true;
}
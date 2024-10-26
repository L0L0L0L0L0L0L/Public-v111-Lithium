/*
	名字:	亞泰爾營地
	地圖:	營地會議場
	描述:	300000010
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(300000012), pi.getMap(300000012).getPortal(0)); //地下室
	return true;
}
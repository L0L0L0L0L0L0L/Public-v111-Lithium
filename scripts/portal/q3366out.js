/*
	名字:	隱藏地圖
	地圖:	實驗室出口
	描述:	926130200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(926130100), pi.getMap(926130100).getPortal(4)); //實驗室入口
	return true;
}
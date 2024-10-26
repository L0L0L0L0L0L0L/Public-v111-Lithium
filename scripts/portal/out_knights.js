/*
	名字:	騎士團要塞
	地圖:	騎士團第1區域
	描述:	271030100
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(271030000), pi.getMap(271030000).getPortal(2)); //要塞入口
	return true;
}
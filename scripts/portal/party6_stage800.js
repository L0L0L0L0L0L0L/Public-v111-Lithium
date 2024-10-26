/*
	名字:	毒霧森林
	地圖:	森林外圍出口
	描述:	930000800
*/

var item = [4001162, 4001163, 4001164, 4001169, 2270004];

function enter(pi) {
	for (var i = 0; i < item.length; i++)
	pi.removeAll(item[i]);
	pi.getPlayer().changeMap(pi.getMap(300030100), pi.getMap(300030100).getPortal(0)); //深沉精靈之林
	return true;
}
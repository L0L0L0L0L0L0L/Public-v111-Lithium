/*
	名字:	生命之穴
	地圖:	洞穴小徑
	描述:	240050600
*/

var item = [4001087, 4001088, 4001089, 4001090, 4001091, 4001092, 4001093];

function enter(pi) {
	for (var i = 0; i < item.length; i++)
	pi.getPlayer().removeAll(item[i]);
	pi.getPlayer().changeMap(pi.getMap(240050000), pi.getMap(240050000).getPortal(0)); //洞穴入口
	return true;
}
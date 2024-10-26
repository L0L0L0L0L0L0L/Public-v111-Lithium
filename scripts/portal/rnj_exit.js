/*
	名字:	隱藏地圖
	地圖:	離開
	描述:	926100700
*/

var item = [4001130, 4001131, 4001132, 4001133, 4001134, 4001135];

function enter(pi) {
	var map = pi.getPlayer().getMap().getId() == 926100700 ? 261000011 : 261000021; //蒙特鳩祕密之室
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
	for (var i = 0; i < item.length; i++)
	pi.getPlayer().removeAll(item[i]);
	return true;
}
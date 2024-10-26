/*
	名字:	隱藏地圖
	地圖:	蒙特鳩祕密之室
	描述:	261000011
*/

function enter(pi) {
	var map = pi.getSavedLocation("MULUNG_TC");
	if (map < 0) map = 261000010; //蒙特鳩協會

	portal = map == 261000010 ? 2 : pi.getMap(map).getPortal("unityPortal2") != null ? "unityPortal2" : pi.getMap(map).getPortal(3) != null ? 3 : 0;
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	pi.clearSavedLocation("MULUNG_TC"); //刪除標記地圖
	return true;
}
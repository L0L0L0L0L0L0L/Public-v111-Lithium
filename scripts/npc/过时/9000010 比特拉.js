/*
	名字:	比特拉
	地圖:	活动地图出口
	描述:	109050001
*/

function start() {
	var map = cm.getSavedLocation("EVENT");
	if (map > -1 && map != cm.getMapId()) {
		cm.warp(map, 0);
	} else {
		cm.warp(910000000, 0);
		}
	cm.dispose();
}

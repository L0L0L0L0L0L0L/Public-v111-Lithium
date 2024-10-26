/*
	名字:	隱藏地圖
	地圖:	堆積灰塵的月台
	描述:	910320100
*/

load('nashorn:mozilla_compat.js');

function start() {
	if (ms.getPlayer().getPyramidSubway() == null) {
		ms.getPlayer().setPyramidSubway(new Packages.server.maps.Event_PyramidSubway(ms.getPlayer()));
		}
		ms.dispose();
}
/*
	名字:	神殿深處
	地圖:	黃昏與黎明之間
	描述:	270050300
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(270050000), pi.getMap(270050000).getPortal(0)); //被遺忘的黃昏
	return true;
}
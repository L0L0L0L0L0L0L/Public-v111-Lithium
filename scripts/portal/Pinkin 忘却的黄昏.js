/*
	名字:	神殿深處
	地圖:	遺失的黃昏
	描述:	270050200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(270050000), pi.getMap(270050000).getPortal(0)); //被遺忘的黃昏
	return true;
}
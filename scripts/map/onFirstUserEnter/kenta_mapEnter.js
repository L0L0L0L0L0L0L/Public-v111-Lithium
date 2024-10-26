/*
	名字:	隱藏地圖
	地圖:	危險之海1
	描述:	923040100
*/

function start() {
	switch ((ms.getPlayer().getMap().getId() / 100) % 10) {
	case 1: //危險之海1
		ms.getPlayer().getMap().startMapEffect("Eliminate all the monsters!", 5120052);
		break;
	case 2: //危險之海2
		ms.getPlayer().getMap().startMapEffect("Get me 10 Air Bubbles for me to survive!", 5120052);
		break;
	case 3: //危險之海中央
		ms.getPlayer().getMap().startMapEffect("Help! Make sure I live for three minutes!", 5120052);
		break;
	case 4: //危險的洞窟
		ms.getPlayer().getMap().startMapEffect("Eliminate the two Pianus!", 5120052);
		break;
	default:
		}
		ms.dispose();
}
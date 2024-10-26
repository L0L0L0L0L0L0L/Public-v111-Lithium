/*
	名字:	雾海大作战
	地圖:	触礁的幽灵船
	描述:	923020000
*/

function start() {
	switch (ms.getPlayer().getMap().getId() % 10) {
	case 0: //第1作戰室
		ms.getPlayer().getMap().startMapEffect("Eliminate all the monsters!", 5120033);
		break;
	case 1: //第2作戰室
		ms.getPlayer().getMap().startMapEffect("Break the boxes and eliminate the monsters!", 5120033);
		break;
	case 2: //第3作戰室
		ms.getPlayer().getMap().startMapEffect("Eliminate the Officer!", 5120033);
		break;
	case 3: //第4作戰室
		ms.getPlayer().getMap().startMapEffect("Eliminate all the monsters!", 5120033);
		break;
	case 4: //第5作戰室
		ms.getPlayer().getMap().startMapEffect("Find the way to the other side!", 5120033);
		break;
	default:
		}
		ms.dispose();
}
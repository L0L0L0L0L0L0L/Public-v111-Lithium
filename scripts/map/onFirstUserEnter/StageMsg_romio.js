/*
	名字:	隱藏地圖
	地圖:	羅密歐
	描述:	926100000
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 926100000: //可疑的研究室
		ms.getPlayer().getMap().startMapEffect("Please find the hidden door by investigating the Lab!", 5120021);
		break;
	case 926100001: //實驗室通道
		ms.getPlayer().getMap().startMapEffect("Find  your way through this darkness!", 5120021);
		break;
	case 926100100: //令人不適的實驗室
		ms.getPlayer().getMap().startMapEffect("Fill the beakers to power the energy!", 5120021);
		break;
	case 926100200: //特殊實驗室
		ms.getPlayer().getMap().startMapEffect("Get the files for the experiment through each door!", 5120021);
		break;
	case 926100203: //猶利塔的辦公室
		ms.getPlayer().getMap().startMapEffect("Please defeat all the monsters!", 5120021);
		break;
	case 926100300: //研究室走廊
		ms.getPlayer().getMap().startMapEffect("Find your way through the Lab!", 5120021);
		break;
	case 926100400: //中央研究室入口
		ms.getPlayer().getMap().startMapEffect("Please hurry up, I hope there's still time!", 5120021);
		break;
	case 926100401: //中央研究室
		ms.getPlayer().getMap().startMapEffect("Please, protect my love!", 5120021);
		break;
	default:
		}
		ms.dispose();
}
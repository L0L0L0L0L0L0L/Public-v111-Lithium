/*
	名字:	隱藏地圖
	地圖:	茱麗葉
	描述:	926110000
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 926110000: //可疑的研究室
		ms.getPlayer().getMap().startMapEffect("Please find the hidden door by investigating the Lab!", 5120022);
		break;
	case 926110001: //實驗室通道
		ms.getPlayer().getMap().startMapEffect("Find  your way through this darkness!", 5120022);
		break;
	case 926110100: //令人不適的實驗室
		ms.getPlayer().getMap().startMapEffect("Fill the beakers to power the energy!", 5120022);
		break;
	case 926110200: //特殊實驗室
		ms.getPlayer().getMap().startMapEffect("Get the files for the experiment through each door!", 5120022);
		break;
	case 926110203: //猶利塔的辦公室
		ms.getPlayer().getMap().startMapEffect("Please defeat all the monsters!", 5120022);
		break;
	case 926110300: //研究室走廊
		ms.getPlayer().getMap().startMapEffect("Find your way through the Lab!", 5120022);
		break;
	case 926110400: //中央研究室入口
		ms.getPlayer().getMap().startMapEffect("Please hurry up, I hope there's still time!", 5120022);
		break;
	case 926110401: //中央研究室
		ms.getPlayer().getMap().startMapEffect("Please, protect my love!", 5120022);
		break;
	default:
		}
		ms.dispose();
}
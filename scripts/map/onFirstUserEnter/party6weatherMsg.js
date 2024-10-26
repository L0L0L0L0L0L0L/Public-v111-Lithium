/*
	名字:	毒霧森林
	地圖:	毒霧森林
	描述:	930000000
*/

function start() {
	switch (ms.getPlayer().getMap().getId()) {
	case 930000000: //毒霧森林
		ms.getPlayer().getMap().startMapEffect("Step in the portal to be transformed.", 5120023);
		break;
	case 930000100: //初入森林
		ms.getPlayer().getMap().startMapEffect("Defeat the poisoned monsters!", 5120023);
		break;
	case 930000200: //變質的森林
		ms.getPlayer().getMap().startMapEffect("Eliminate the spore that blocks the way by purifying the poison!", 5120023);
		break;
	case 930000300: //濃霧森林
		ms.getPlayer().getMap().startMapEffect("Uh oh! The forest is too confusing! Find me, quick!", 5120023);
		break;
	case 930000400: //中毒的森林
		ms.getPlayer().getMap().startMapEffect("Purify the monsters by getting Purification Marbles from me!", 5120023);
		break;
	case 930000500: //森林空地
		ms.getPlayer().getMap().startMapEffect("Find the Purple Magic Stone!", 5120023);
		break;
	case 930000600: //劇毒森林
		ms.getPlayer().getMap().startMapEffect("Place the Magic Stone on the altar!", 5120023);
		break;
	default:
		}
		ms.dispose();
}
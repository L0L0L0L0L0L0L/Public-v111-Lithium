/*
	名字:	霧之海
	地圖:	第5 作戰室
	描述:	923020114
*/

function act() {
	rm.getPlayer().getMap().getReactorByName("jump").forceHitReactor(rm.getReactor().getState());
}
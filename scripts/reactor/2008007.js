/*
	名字:	隱密之地
	地圖:	雅典娜禁地&amp;lt;監獄Ⅰ&gt;
	描述:	920010910
*/

function hit() {
	var map = rm.getPlayer().getMap();
	map.moveEnvironment("trap" + rm.getReactor().getName()[5], 1);
}

function act() {}
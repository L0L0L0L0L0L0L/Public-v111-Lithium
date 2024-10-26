/*
	名字:	阿爾利
	地圖:	悲憤之室
	描述:	280090000
*/

var item = [4001015, 4001016, 4001018];

function start() {
	if (cm.getPlayer().itemQuantity(4031061))
		cm.sendNext("你很好的完成了第一階段的任務，我會把你送到#b#p2030008##k那裡。不過在那之前，你不能把這裡特殊的東西留到外面去，我將會在你的背包中拿走這些東西，那麼，就這樣吧，願真主保佑你。");
	else
		cm.sendNext("你沒有能完成任務，我會送你出去。不過在那之前，你不能把這裡特殊的東西留到外面去，我將會在你的背包中拿走這些東西，那麼，就這樣吧，願真主保佑你。");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < item.length; i++)
		cm.removeAll(item[i]);
		cm.getPlayer().changeMap(cm.getMap(211042300), cm.getMap(211042300).getPortal(0));
		}
		cm.dispose();
}
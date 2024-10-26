/*
	名字:	隱藏地圖
	地圖:	遺棄之塔&amp;lt;Bonus&gt;
	描述:	922011000
*/

function act() {
	rand = Math.floor(Math.random() * 3);
	if (rand < 1) rand = 1;

	for (var i = 0; i<rand; i++) {
	rm.dropItems(true, 1, 30, 60, 15);
}
}
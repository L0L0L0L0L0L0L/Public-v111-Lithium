/*
	名字:	武陵道場
	地圖:	武陵道場
	描述:	925020000
*/

function start() {
	ms.getPlayer().getMap().startMapEffect(Msg[Packages.server.Randomizer.nextInt(Msg.length)], 5120024);
	ms.dispose();
}

Msg = ["I have been waiting for you! If you have an ounce of courage in you, you'll be walking in that door right now!",
	"How brave of you to take on Mu Lung Training Tower!",
	"I will make sure you will regret taking on Mu Lung Training Tower!",
	"I do like your intestinal fortitude! But don't confuse your courage with recklessness!",
	"If you want to step on the path to failure, by all means to do so!"];
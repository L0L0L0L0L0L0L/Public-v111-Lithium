/*
	名字:	羅茲弟
	地圖:	戰鬥廣場
	描述:	960000000
*/

function start() {
	var chat = "Welcome to the Battle Square. The method to participate in the Brawl is very simple. Find #b#p9070000##k next to you and you can enter immediately. Let me briefly explain the rules.";
    var options = ["Free-For-All", "Red and Blue Team Battle", "Ice Knight", "Level Selection"];
	for (var i = 0; i < options.length; i++)
	chat += "\r\n#L" + i + "#" + options[i] + "#l";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendOk(Text[selection][mode-1]);
		cm.dispose();
}

var Text = [["To put it simply, it is an individual match. All players on the map are enemies. Just find a way to defeat them."],
["It is also a team competition. After entering the map, the system will automatically help players divide into red and blue teams to compete with each other. Whichever team defeats the most opponents will be the winning team."],
["The gameplay is that one of the 10 players will become an ice knight, and one person will fight against the other 9 players. There will be special tricks. The detailed gameplay must be entered into the game to experience it!"],
["The Brawl mode is divided into 4 stages: LV.30+, LV.70+, LV.120+, LV.180+ according to the level. Players can choose to enter the appropriate area to challenge."]];
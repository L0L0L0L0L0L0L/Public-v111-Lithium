/*
	名字:	珀爾
	地圖:	瑪迦提亞城
	描述:	261000000
*/

var Text = [["#e[Up and Up]#nThank you everyone for coming! Here are the rules. The [Up and up] game is similar to a #bladder game#k. #rWinning and losing are heavily based on luck#k. When you pass through all gateways within the time limit, you will be moved to an area to get prizes! There are #b3 stages#k to the gateways. The time limit is #r6 minutes#k, and after that the game will #bend automatically#k. [Up and Up] #rdoes not allow #bjumps, teleports#k, or #bhastes#k. More details can be provided within the game."], 
	["#b[Physical Fitness Test] is an obstacle-course-type game#k. Think Forest of Endurance and Forest of Tenacity. Overcome various difficulties and reach the goal within the time limit to win. \r\n\r\nThere are 4 phases total, and #btime limit is 15 minutes#k. You cannot use Teleport or Haste in [Physical Fitness Test]."], 
	["#b[Snowball Rollin]#k is a game to see which one of the two teams, 'Maple' and 'Story', #brolls Snowball farther#k. If the victor is not determined during the time given, the team that rolled more distance at the end wins more. \r\n\r\nGo near the Snowball and attack (Ctrl key) to slowly roll the Snowball forward. Ranged attacks and all attack skills are useless - you can ONLY use #rmelee attack#k. \r\n\r\nCharacter that touches the Snowball will instantly be summoned back to the starting point. Attack the Snowman at the starting point to keep the opposing team's Snowball from moving forward. Attack the Snowball or attack the Snowman? Strategize with your team and lead your team to victory!"], 
	["ln #b[Coconut Harvest]#k, the participants get divided into two different teams, the Maple and the Story team, and compete against each other. The team that #bpicks up more coconuts within the given time limit#k wins the game. The time limit is #r5 minutes#k. If the first game ends in a [Draw], additional 2 minutes will be added to the game. If two teams tie again, then the game will end in a draw. \r\n\r\nNo range attacks or skills can be used in this game mode. Only the #rmelee attack#k can be used. If you don't have any melee weapons, you can purchase a melee weapon from the NPC located inside of the event map. Regardless of the character level, weapon, or its options, same hit damage will be applied. \r\n\r\nAlso you'll find obstacles and traps in various locations in the map. You will be dropped out of the event game when your character dies. The last player to hit the coconut before it falls on the ground will gain the point. Only the fallen coconut will be counted towards your points. There are hidden portals in the turban sheel at the bottom of the map, so try to take advantage of these hidden portals!"], 
	["The #bSpeed OX Quiz#k is a game where you answer questions using Os and Xs. If you want to play, open up your Mini Map with the M key to find the O and X locations. You win by correctly answering all the questions! \r\n\r\nWhen questions are asked, take the ladder down to the location of the answer before time runs out. If you don't answer or you're still on a ladder, you're out! Also, you can't move until the correct answer disappears from your screen."], 
	["#b[Treasure Hunt]#k You must find the hidden #btreasure document#k that is in each field in #r10 minutes#k for this game. You'll find mysterious treasure chests all over the place. Break these to obtain various items, and you will also find the treasure document in them. \r\n\r\nYou must use #bnormal attacks#k to break the treasure chests, You can trade the treasure document for Devil Scrolls from the appropriate NPCs. The exchange NPCs are also in the treasure hunt maps, and you can also ask #b[Vikin]#k in Lith Harbor. \r\n\r\nYou'll find hidden portals and teleporters in this game. Press #bUp direction key#k on them to use them! There are also hidden staircases or ropes, so be sure to try jumping in hidden places! There are also treasure chests that will send you to hidden locations and treasure chests that can only be found in these locations. \r\n\r\n Certain skills are #rnot allowed#k in the Treasure Hunt game, so be sure to use your normal attacks to break the treasure chests!"], 
	["#b[Sheep Ranch]#k game is a survival game in which participants get divided into two different groups, the Sheep and Wolf Group, and try to either destroy the opponent group or survive within the given time limit."]];

var select = -1;

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNext("Hey, I'm #b#p9000000##k, if you're not busy and all ... then can I hang out with you? I heard there are people gathering up around here for an #revent#k but I don't want to go there by myself ... Well, do you want to go check it out with me?");
		break;
	case 1:
		cm.sendSimple("Huh? What kind of an event? Well, that's...\r\n#L0##bWhat kind of an event is it?#l\r\n#L1#Explain the event game to me.#l\r\n#L2#Alright, let's go!#l");
		break;
	default:
		if (selection < 1) {
			cm.sendNext("All this month, MapleStory Global is celebrating its 3rd anniversary! The GM's will be holding surprise GM Events throughout the event, so stay on your toes and make sure to participate in at least one of the events for great prizes!");
			cm.dispose();
			}
		if (selection == 1) {
			cm.sendSimple("There are many games for this event. It will help you a lot to know how to play the game before you play it. Choose the one you want to know more of! #b\r\n#L0#Ola Ola#l\r\n#L1#Physical Fitness Test#l\r\n#L2#Snowball#l\r\n#L3#Coconut Harvest#l\r\n#L4#Speed OX Quiz#l\r\n#L5#Treasure Hunt#l\r\n#L6#Sheep Ranch#l");
			}
		if (selection == 2) {
			cm.sendNext("Either the event has not been started, you already have the #bScroll of Secrets#k, or you have already participated in this event within the last 24 hours. Please try again later!");
			cm.dispose();
			}
			break;
	case 3:
		cm.sendNext(Text[selection]);
		cm.dispose();
}
}
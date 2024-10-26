/*
    Name:    Jack
    Map:     Corridor of the Inner Chamber
    Description:    610030100
*/

var Text = [["As soon as we entered this area, the Guardians detected us, so we need to move quickly.", "I previously checked this area, and the gate to the Twisted Master has been destroyed. We must find another way, a path that takes us through many death traps.", "Now, we must search the nearby area immediately! Otherwise, the Guardians will catch up with us."],
	["Do you see the situation around? It's troublesome. For this path, I believe we need all 5 types of adventurer jobs to pass through. I hope our team is complete; otherwise, we'll have to turn back.", "The 5 adventurer jobs need to use their skills on these signal-marked platforms to activate the symbols of each job. Once this is done, we can open the portal."],
	["Oh no!!! This area is similar to the previous one, where job skills are used to activate symbols. But as you can see, the situation seems to be much more complicated.", "See those dangerous mechanisms? If we can avoid those death traps, I believe we can continue soon. I hope everything goes smoothly."],
	["Oh!!! My goodness, more terrifying mechanisms. It seems we better figure out how to open the portal to the next stage.", "This is our only way out, so we'd better act quickly. It will be troublesome if the Guardians arrive."],
	["Do you see that broken huge statue? It's the first time I've seen one. Take a close look; the statue has no weapon in its hand. I think it was probably dismantled.", "There are five rooms around the statue. Each room has a statue nearby. I suspect that the weapons of the dismantled statue are stored in different rooms.", "Find a way to bring the weapons back and restore them to their original places in the statue! That should open the portal to the next stage."],
	["This path leads to the Twisted Master's armory. I think we've reached our destination."]];

var map = [610030100, 610030200, 610030300, 610030400, 610030500, 610030700];

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
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			for (var i = 0; i < map.length; i++)
				if (cm.getPlayer().getMap().getId() == map[i])
					select = i;
			cm.sendNext(Text[select][status-0]);
			break;
		default:
			Text[select][status-0] == undefined ? cm.dispose() : cm.sendNextPrev(Text[select][status-0]);
	}
}

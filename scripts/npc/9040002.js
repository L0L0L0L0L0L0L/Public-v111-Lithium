/*
	名字:	杉峰
	地圖:	遺跡發掘隊營區
	描述:	102040200
*/

var Text = [["Sharenian was a literate civilization from the past that had control over every area of the Victoria Island. The Temple of Golem, the Shrine in the deep part of the Dungeon, and other old architectural constructions where no one knows who built it are indeed made during the Sharenian times.", 
	"The last king of Sharenian was a gentleman named Sharen Ill, and apparently he was a very wise and compassionate king. But one day, the whole kingdom collapsed, and there was no explanation made for it."],
	["Rubian is a legendary jewel that brings eternal youth to the one that possesses it Ironically, it seems like everyone that had Rubian ended up downtrodden, which should explain the downfall of Sharenian."],
	["I've sent groups of the explorers to Sharenian before, but none of them ever came back, which prompted us to start the Guild Quest We've been waiting for guilds that are strong enough to take on tough challenges, guilds like yours.", 
	"The ultimate goal of this Guild Quest is to explore Sharenian and find Rubian. This is not a task where power solves everything. Teamwork is more important here."]];

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
		if (status < 1) {
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
		var chat = "We, the Union of Guilds, have been trying to decipher 'Emerald Tablet,' a treasured old relic, for a long time. As a result, we have found out that Sharenian, the mysterious country from the past, lay asleep here. We also found out that clues of Rubian, a legendary, mythical jewelry, may be here at the remains of Sharenian. This is why the Union of Guilds have opened Guild Quest to ultimately find Rubian.";
		chat += "\r\n#L0##bWhat's Sharenian?#l\r\n#L1#Rubian?#l\r\n#L2#Guild Quest?#l\r\n#L3#I'm fine now.#l";
		cm.sendSimple(chat);
		break;
	case 1:
		if (selection > 2) {
			cm.sendOk("Really? If you have anything else to ask, please feel free to talk to me.");
			cm.dispose();
			return;
			}
			if (select < 0) select = selection;
			cm.sendNext(Text[select][status-1]);
			break;
	default:
		Text[select][status-1] == undefined ? cm.dispose() : cm.sendPrev(Text[select][status-1]);
		break;
}
}
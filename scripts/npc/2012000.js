/*
	名字:	售票員
	地圖:	天空之城售票處
	描述:	200000100
*/

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
            		cm.sendSimple("I can guide you to the right ship to reach your destination. Where are you headed? \r\n#L0##bVictoria Island#l\r\n#L1#Ludibrium Castle#l\r\n#L2#Leafre#l\r\n#L3#Mu Lung#l\r\n#L4#Ariant#l\r\n#L5#Ereve#l\r\n#L6#Edelstein#l");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You're headed to Victoria Island? Oh, it's a beautiful island with a variety of villages. A #b1-seater ship for Victoria is always standing by#k for you to use.");
		break;
	case 2:
		cm.sendNextPrev("Talk to #bIsa the Platform Guide#k on the right if you would like to take the Airship to Victoria. If anyone can show you the way, it's Isa.");
		break;
	case 3:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You're headed to Ludibrium Castle at Ludus Lake? It's such a fun village made of toys. A #b1-seater ship for Ludibrium Fortress is always standing by#k for you to use.");
		break;
	case 2:
		cm.sendNextPrev("Talk to #bIsa the Platform Guide#k on the right if you would like to take the Airship to Ludibrium. If anyone can show you the way, it's Isa.");
		break;
	case 3:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You're headed to Leafre in Minar Forest? I love that quaint little village of Halflingers. A #b1-seater ship for Leafre is always standing by#k for you to use.");
		break;
	case 2:
		cm.sendNextPrev("Talk to #bIsa the Platform Guide#k on the right if you would like to take the Airship to Leafre. If anyone can show you the way, it's Isa.");
		break;
	case 3:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Are you heading towards Mu Lung in the Mu Lung Temple? I'm sorry, but there's no ship that flies from Orbis to Mu Lung. There is another way to get there, though. There's a #bCrane that runs a cab service for 1 that's always available#k, so you'll get there as soon as you wish.");
		break;
	case 2:
		cm.sendNextPrev("Unlike the ships that fly for free, however, this cab requires a set fee. This personalized flight to Mu Lung will cost you #b1,500 mesos#k, so please have the fee ready before riding the Crane.");
		break;
	case 3:
		cm.sendNextPrev("Talk to #bIsa the Platform Guide#k on the right if you would like to take the Crane to Mu Lung. If anyone can show you the way, it's Isa.");
		break;
	case 4:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("You're headed to Ariant in the Nihal Desert? The people living there have a passion as hot as the desert. A #bship that heads to Ariant is always standing by#k for you to use.");
		break;
	case 2:
		cm.sendNextPrev("Talk to #bIsa the Platform Guide#k on the right if you would like to take the Genie to Ariant. If anyone can show you the way, it's Isa.");
		break;
	case 3:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Are you heading toward Ereve? It's a beautiful island blessed with the presence of the Shinsoo the Holy Beast and Empress Cygnus. #bThe boat is for 1 person and it's always readily available#k so you can travel to Ereve fast.");
		break;
	case 2:
		cm.sendNextPrev("Talk to #bIsa the Platform Guide#k on the right if you would like to take the ship to Ereve. If anyone can show you the way, it's Isa.");
		break;
	case 3:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Are you going to Edelstein? The brave people who live there constantly fight the influence of dangerous monsters. #b1-person Airship to Edelstein is always on standby#k, so you can use it at any time.");
		break;
	case 2:
		cm.sendNextPrev("Talk to #bIsa the Platform Guide#k on the right if you would like to take the ship to Edelstein. If anyone can show you the way, it's Isa.");
		break;
	case 3:
		cm.dispose();
}
}
/*
	名字:	樹枝雪人
	地圖:	幸福村
	描述:	209000000
*/

function start() {
	var chat = "我們有美麗高大的#b聖誕樹#k，你想去看看並且裝飾它嗎？\r\n#b";
	chat += "\r\n#L0#第一棵樹的房間";
	chat += "\r\n#L1#第二棵樹的房間";
	chat += "\r\n#L2#第三棵樹的房間";
	chat += "\r\n#L3#第四棵樹的房間";
	chat += "\r\n#L4#第五棵樹的房間";
	cm.sendSimple(chat);
}


function action(mode, type, selection) {
	if (mode == 1)
		cm.warp(209000001 + selection, 0);
		cm.dispose();
}
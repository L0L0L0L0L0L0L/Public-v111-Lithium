/*
	名字:	比特罗
	地圖:	奖品领取点
	描述:	109050000
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
		if (status == 0) {
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
		cm.sendNext("Bam bam bam bam!! 你在活动的游戏中获得了胜利.恭喜你!");
		break;
	case 1:
		cm.sendNext("你将获得#b神秘卷轴#k.这个卷轴上用古老的字符写这神秘的信息.");
		break;
	case 2:
		cm.sendNext("你可以去找玩具城的#rChun Ji#k或者\r\n#rGeanie#k鉴定卷轴.");
		break;
	case 3:
		if (cm.canHold(4031019)) {
			cm.gainItem(4031019);
			//cm.gainItem(2041200,3);
			cm.warp(910000000, 0);
			cm.dispose();
		} else {
			cm.sendNext("I think your Etc window is full. Please make room, then talk to me.");
			}
		cm.dispose();
}
}
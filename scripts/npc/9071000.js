/*
	名字:	休菲凱曼
	地圖:	怪物公園
	描述:	951000000
*/

function start() {
	var chat = "Welcome to the Monster Park! Haha, I am the owner of the Monster Park, Spiegleman! If you want to know anything, you can ask me! #b";
    var options = ["What is Monster Park", "What is admission ticket", "Rewards for Monster Park activities"];
	for (var i = 0; i < options.length; i++)
	chat += "\r\n#L" + i + "#" + options[i] + "#l";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendOk(Text[selection][mode-1]);
		cm.dispose();
}

var Text = [["It seems that you are very interested in the monster park! Haha. This is a battle program where you can experience it individually or work together with team members to defeat powerful monsters. It is a super interesting #btheme park#k oh!"],
["There are three types of entrance pattern scrolls, spotted pattern scrolls, leopard pattern scrolls, and tiger pattern scrolls. Through daily hunting monsters, you have the opportunity to obtain pattern scroll fragments. As long as you collect 10 identical fragments, you can find them. #b #p9071002##kRedeem a complete admission coupon "],
["Hunting any monster in the activity area will have the opportunity to obtain #b#z4310020##k. Collect the corresponding number of monster park commemorative currencies, which can be exchanged for different theme props. When completing stage tasks, there will also be a large amount of #b The reward#k is oh."]];
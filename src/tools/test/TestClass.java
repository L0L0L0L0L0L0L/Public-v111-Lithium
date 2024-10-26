package tools.test;
/*
by. 히니스 소스 코드 제작테스트용도
 */

public class TestClass {
    public static void main(String[] args) {
        boolean a = false;
        int rank = 0;
        for (int i = 0; i < 1000; i++) {
            if (Math.ceil(Math.random() * 100.0D) <= 3 && 17 != 20) {
                a = true;
                rank ++;
                System.out.println(rank + "There is a 3% chance of success after switching");
            } else {
                a = false;
            }
            //System.out.println(rank);
        }
       //System.out.println("1000 번중 " + rank + "번 레전드리 뜸");
    }
}

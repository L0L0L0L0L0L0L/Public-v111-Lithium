package tools;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;

/*
 *
 *  히니스
 * 
 */
public class WZStringDumper {
    public static void main(String args[]) throws FileNotFoundException, IOException {
        File stringFile = MapleDataProviderFactory.fileInWZPath("String.wz");
        MapleDataProvider stringProvider = MapleDataProviderFactory.getDataProvider(stringFile);
        MapleData cash = stringProvider.getData("Cash.img");
        MapleData consume = stringProvider.getData("Consume.img");
        MapleData eqp = stringProvider.getData("Eqp.img").getChildByPath("Eqp");
        MapleData etc = stringProvider.getData("Etc.img").getChildByPath("Etc");
        MapleData ins = stringProvider.getData("Ins.img");
        MapleData pet = stringProvider.getData("Pet.img");
        MapleData map = stringProvider.getData("Map.img");
        MapleData mob = stringProvider.getData("Mob.img");
        MapleData skill = stringProvider.getData("Skill.img");
        MapleData npc = stringProvider.getData("Npc.img");
        String output = args[0];
        File outputDir = new File(output);
        File cashTxt = new File(output + "\\Cash.txt");
        File useTxt = new File(output + "\\Use.txt");
        File eqpTxt = new File(output + "\\Equip.txt");
        File etcTxt = new File(output + "\\Etc.txt");
        File insTxt = new File(output + "\\Setup.txt");
        File petTxt = new File(output + "\\Pet.txt");
        File mapTxt = new File(output + "\\Map.txt");
        File mobTxt = new File(output + "\\Mob.txt");
        File skillTxt = new File(output + "\\Skill.txt");
        File npcTxt = new File(output + "\\NPC.txt");

        outputDir.mkdir();
        cashTxt.createNewFile();
        useTxt.createNewFile();
        eqpTxt.createNewFile();
        etcTxt.createNewFile();
        insTxt.createNewFile();
        petTxt.createNewFile();
        mapTxt.createNewFile();
        mobTxt.createNewFile();
        skillTxt.createNewFile();
        npcTxt.createNewFile();
        int i = 0;
        System.out.println("Reading the entire string to write code...");
        PrintWriter writer = new PrintWriter(new FileOutputStream(cashTxt));
        for (MapleData child : cash.getChildren()) {
                MapleData nameData = child.getChildByPath("name");
                MapleData descData = child.getChildByPath("desc");
                String name = "";
                String desc = "";
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                if (nameData != null) {
                    i++;
                    name = (String) nameData.getData();
                }
                writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();

        writer = new PrintWriter(new FileOutputStream(useTxt));
        for (MapleData child : consume.getChildren()) {
                MapleData nameData = child.getChildByPath("name");
                MapleData descData = child.getChildByPath("desc");
                String name = "";
                String desc = "";
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                if (nameData != null) {
                    i++;
                    name = (String) nameData.getData();
                }
                writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();

        PrintWriter eqpWriter = new PrintWriter(new FileOutputStream(eqpTxt));
        for (MapleData child : eqp.getChildren()) {
                for (MapleData child2 : child.getChildren()) {
                        MapleData nameData = child2.getChildByPath("name");
                        MapleData descData = child.getChildByPath("desc");
                        String name = "";
                        String desc = "";
                        if (descData != null) {
                            desc = (String) descData.getData();
                        }
                        if (nameData != null) {
                            i++;
                            name = (String) nameData.getData();
                        }
                        eqpWriter.println(child2.getName() + " - < " + name + " > - desc ( " + desc + " )");
                }
        }
        eqpWriter.flush();
        eqpWriter.close();

        writer = new PrintWriter(new FileOutputStream(etcTxt));
        for (MapleData child : etc.getChildren()) {
                MapleData nameData = child.getChildByPath("name");
                MapleData descData = child.getChildByPath("desc");
                String name = "";
                if (nameData != null) {
                    i++;
                    name = (String) nameData.getData();
                }
                String desc = "";
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();

        writer = new PrintWriter(new FileOutputStream(insTxt));
        for (MapleData child : ins.getChildren()) {
                MapleData nameData = child.getChildByPath("name");
                MapleData descData = child.getChildByPath("desc");
                String name = "";
                if (nameData != null) {
                    i++;
                    name = (String) nameData.getData();
                }
                String desc = "";
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();

        writer = new PrintWriter(new FileOutputStream(petTxt));
        for (MapleData child : pet.getChildren()) {
                MapleData nameData = child.getChildByPath("name");
                MapleData descData = child.getChildByPath("desc");
                String name = "";
                if (nameData != null) {
                    i++;
                    name = (String) nameData.getData();
                }
                String desc = "";
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();

        writer = new PrintWriter(new FileOutputStream(mapTxt));
        for (MapleData child : map.getChildren()) {
                writer.println(child.getName());
                writer.println();
                for (MapleData child2 : child.getChildren()) {
                        MapleData streetData = child2.getChildByPath("streetName");
                        MapleData mapData = child2.getChildByPath("mapName");
                        String streetName = "(no street name)";
                        String mapName = "(no map name)";
                        if (streetData != null) {
                            streetName = (String) streetData.getData();
                        }
                        if (mapData != null) {
                            i++;
                            mapName = (String) mapData.getData();
                        }
                        writer.println(child2.getName() + " - < " + streetName + " - " + mapName + " >");
                }
                writer.println();
        }
        writer.flush();
        writer.close();

        writer = new PrintWriter(new FileOutputStream(mobTxt));
        for (MapleData child : mob.getChildren()) {
                MapleData nameData = child.getChildByPath("name");
                MapleData descData = child.getChildByPath("desc");
                String name = "";
                if (nameData != null) {
                    i++;
                    name = (String) nameData.getData();
                }
                String desc = "";
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();

        writer = new PrintWriter(new FileOutputStream(skillTxt));
        for (MapleData child : skill.getChildren()) {
            MapleData nameData = child.getChildByPath("name");
            MapleData descData = child.getChildByPath("desc");
            String name = "";
            String desc = "";
            if (descData != null) {
                desc = (String) descData.getData();
            }
            if (nameData != null) {
                i++;
                name = (String) nameData.getData();
            } 
            writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();

        writer = new PrintWriter(new FileOutputStream(npcTxt));
        for (MapleData child : npc.getChildren()) {
                MapleData nameData = child.getChildByPath("name");
                MapleData descData = child.getChildByPath("desc");
                String name = "";
                if (nameData != null) {
                    i++;
                    name = (String) nameData.getData();
                }
                String desc = "";
                if (descData != null) {
                    desc = (String) descData.getData();
                }
                writer.println(child.getName() + " - < " + name + " > - desc ( " + desc + " )");
        }
        writer.flush();
        writer.close();
        System.out.println(i + "Complete code writing.");
    }
}
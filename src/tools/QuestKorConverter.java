/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
    Matthias Butz <matze@odinms.de>
    Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


 */
package tools;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataType;

/**
 *
 * @author T-Sun
 * 
 *   This file was written by T-Sun (doomgate17@naver.com)
 *
 */

public class QuestKorConverter {
    public static void main(String args[]) {
        List <Pair<Integer, Pair<String, Object>>> Values = new ArrayList<Pair<Integer, Pair<String, Object>>>();
        Map <String, String> Type = new HashMap<String, String>();
        Map <Integer, Boolean> writedHeader = new HashMap<Integer, Boolean>();
        System.out.println("Start...");
        try {
            File output = new File("add.xml"); 
            output.createNewFile(); 
            FileOutputStream file1 = new FileOutputStream(output.getPath()); 
            OutputStreamWriter writer = new OutputStreamWriter(file1, "utf-8"); 
            writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\r\n"); 
            writer.write("  <imgdir name=\"QuestInfo.img\">\r\n");
            MapleDataProvider OriginData = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("QuestKMS.wz"));
            MapleDataProvider ToData = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Quest.wz"));
            MapleData origin = OriginData.getData("QuestInfo.img");
            MapleData to = ToData.getData("QuestInfo.img");
            for (MapleData d : origin.getChildren()) {
                System.out.println("Entering" +d.getName() +"imgdir. ");
                if (to.getChildByPath(d.getName()) != null) {
                    for (MapleData in : d.getChildren()) {
                        System.out.println("Entered "+d.getName()+"'s " +in.getName() +" Data");
                        if (in.getType() == MapleDataType.STRING) {
                            Type.put(d.getName()+"/"+in.getName(), "S");
                        } else {
                            Type.put(d.getName()+"/"+in.getName(), "I");
                        }
                        Values.add(new Pair(Integer.parseInt(d.getName()), new Pair(in.getName(), in.getData())));
                    }
                }
            }
            for (MapleData d : to.getChildren()) {
                System.out.println("Entering" +d.getName() +"imgdir. ");
                if (!Type.containsKey(d.getName() + "/name")) {
                    for (MapleData in : d.getChildren()) {
                        System.out.println("Entered "+d.getName()+"'s " +in.getName() +" Data");
                        if (in.getType() == MapleDataType.STRING) {
                            Type.put(d.getName()+"/"+in.getName(), "S");
                        } else {
                            Type.put(d.getName()+"/"+in.getName(), "I");
                        }
                        Values.add(new Pair(Integer.parseInt(d.getName()), new Pair(in.getName(), in.getData())));
                    }
                }
            }
            for (Pair<Integer, Pair<String, Object>> e : Values) {
                if (!writedHeader.containsKey(e.getLeft())) {
                    if (e.getLeft() != 1000) 
                    writer.write("  </imgdir>\r\n");
                    writer.write("     <imgdir name=\""+e.getLeft()+"\">\r\n");
                    writedHeader.put(e.getLeft(), true);
                    //writer.write("<Overwrite Type=\"7\" Name=\""+e.getLeft()+"\" />\r\n");
                    
                }
                if ("I".equals(Type.get(e.getLeft()+"/"+e.getRight().getLeft()))) {
                    writer.write("          <int name=\""+e.getRight().getLeft()+"\" value=\""+e.getRight().getRight()+"\"/>\r\n");
                } else {
                    String data = String.valueOf(e.getRight().getRight());
                    data = data.replaceAll(String.valueOf('&'), "&amp;");
                    data = data.replaceAll(String.valueOf('"'), "&quot;");
                    data = data.replaceAll(String.valueOf('<'), "&lt;");
                    data = data.replaceAll(String.valueOf('>'), "&gt;");
                    data = data.replaceAll(String.valueOf("'"), "&apos;");
                    System.out.println((int) '"');
                    writer.write("          <string name=\""+e.getRight().getLeft()+"\" value=\""+data+"\"/>\r\n");
                }      
            }
            writer.write("</Add>");
            writer.write("</Add>");
            //writer.write("</imgdir>\r\n");
            System.out.println("Success..");
            writer.close(); 
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

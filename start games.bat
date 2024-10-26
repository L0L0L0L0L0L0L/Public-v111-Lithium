@echo off
@title MapleStory Server GMS ver.0.111
Color 0C

tasklist|find "mysqld.exe"
if "%errorlevel%"=="0" (goto StartServer) else (goto StartMysql)
pause

:StartMysql
echo Mysql...
start MySQL\bin\mysqld.exe
PING -n 4 127.0.0.1 >nul
echo Mysql...
goto StartServer

:StartServer
set PATH=jre\bin;%SystemRoot%\system32;%SystemRoot%;%SystemRoot%
set JRE_HOME=jre
set JAVA_HOME=jre\bin
set CLASSPATH=.;lib\*
java -Xmx1024m -Dnet.sf.odinms.wzpath=wz\ server.Start
pause

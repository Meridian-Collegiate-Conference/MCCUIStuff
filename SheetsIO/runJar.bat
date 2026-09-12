@echo off
FOR /f "tokens=*" %%G IN ('dir /b SheetsIO*.jar') DO java -Dsun.java2d.uiScale=3 -Dsun.java2d.dpiaware=false -Dlog4j.configurationFile=resources/log4j2.xml -jar %%G application.Main 
PAUSE
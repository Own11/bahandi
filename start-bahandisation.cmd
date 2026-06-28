@echo off
setlocal

set "NODE_EXE=C:\Users\Ayana\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE_EXE%" (
  echo Node.js was not found.
  echo Install Node.js 20+ or open the project through Codex again.
  pause
  exit /b 1
)

cd /d "%~dp0"
"%NODE_EXE%" server.js

pause

@echo off
title Clothes Store FastAPI Backend
cd /d "%~dp0"
echo ==============================================
echo   Starting Clothes Store FastAPI Backend...
echo   Open in browser: http://localhost:8000/docs
echo ==============================================
call venv\Scripts\activate.bat
uvicorn app.main:app --reload --port 8000
pause


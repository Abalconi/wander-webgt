#!/bin/bash
echo "Limpiando dependencias..."
rm -rf node_modules package-lock.json
echo "Instalando dependencias..."
npm install
echo "Haciendo build..."
npm run build
echo "Build completado!"
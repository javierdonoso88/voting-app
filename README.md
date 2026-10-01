# voting-app

Aplicación de votación en tiempo real para las presentaciones "Casos de IA en vuestro dÍA a dÍA".

## URLs de producción (BTP Cloud Foundry)

| Página | URL |
|--------|-----|
| 🗳️ Votación (participantes) | https://voting-app-ia.cfapps.eu10.hana.ondemand.com/ |
| 📺 Landing con QR (proyectar en pantalla) | https://voting-app-ia.cfapps.eu10.hana.ondemand.com/landing.html |
| ⚙️ Panel admin | https://voting-app-ia.cfapps.eu10.hana.ondemand.com/admin.html |

## Desarrollo local

```bash
npm install
npm start
# → http://localhost:3000
```

## Despliegue en BTP Cloud Foundry

```bash
cf push
```

La app está configurada en `manifest.yml` con el nombre `voting-app-ia` en `eu10`.

## Clave admin

Por defecto: `admin2024`  
Cámbiala en `manifest.yml` → `ADMIN_KEY` antes de subir a producción.

## Flujo de uso en el evento

1. **Proyecta** `landing.html` en la pantalla grande — muestra el QR y el contador en vivo
2. Los participantes **escanean el QR** con su móvil y votan una sola vez
3. En `admin.html` ves los votos en tiempo real
4. Cuando quieras revelar, pulsa **"Revelar Resultados"** → animación simultánea en todos los dispositivos con confetti

## Opciones de votación

| # | Presentación | Ponente |
|---|-------------|---------|
| 1 | 🎯 Propuesta AI para clientes | Jaime Durán — Architect Advisor |
| 2 | ✨ AI es la nueva UI | Sergi Millans — Solution Advisor Finanzas |
| 3 | 🌍 Estado de la nación | José Enríquez — Solution Advisor EPM |
| 4 | 🤝 Mentoring Companion | Florencia Martino — Graphic Recording EMEA |
| 5 | 🚀 Me@SAP como AA | Carles Viaplana — Architect Advisor |
| 6 | ⌨️ Navegas o escribes | Javier Fdez Gallego — Solution Advisor SCM |
| 7 | 💬 FeedMeBack | Daniel Álamo — Solution Advisor BTP |
| 8 | 🎮 Scape Box Digital | Fran San Fructuoso — Solution Advisor Innovation |

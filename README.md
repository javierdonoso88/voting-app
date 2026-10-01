# voting-app

Aplicación de votación en tiempo real para las presentaciones "Casos de IA en vuestro dÍA a dÍA".

## Instalación

```bash
npm install
npm start
```

## URLs

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000` | Pantalla de votación (participantes) |
| `http://localhost:3000/admin.html` | Panel de administración |

## Despliegue en BTP Cloud Foundry

```bash
npm install
cf push
```

La app quedará disponible en la URL que asigne CF.

## Clave admin

Por defecto: `admin2024`  
Cámbiala en `manifest.yml` → `ADMIN_KEY` antes de subir a producción.

## Flujo

1. Comparte la URL con los participantes
2. Cada uno vota **una sola vez** desde su dispositivo
3. En el panel admin puedes ver los votos en tiempo real
4. Cuando quieras revelar, pulsa **"Revelar Resultados"** → aparece en todas las pantallas con animación

# Frontend Mobile Semestre I 2024
## Descripción del Proyecto
Este es un proyecto en el cual se construye una aplicación móvil Delivery con el fin de comprender los aspectos fundamentales de Typescript, utilizando Expo Go y el patrón de diseño MVVM y Clean Architecture.

![React Native Expo](https://miro.medium.com/v2/resize:fit:600/1*fQJ4KqHQIxUH9SiAaLev9Q.png)

## Tecnologías Utilizadas
- React Native Expo

## Instalación y Configuración

### Software y Documentación Necesaria
- Git: [Descargar Git](https://git-scm.com/downloads)
- Node: [Descargar Node](https://nodejs.org/en/download/current)
- Cuenta Expo Go: [Página Oficial Expo Go](https://expo.dev/go)

### Pasos de Ejecución

Clonar el repositorio con el comando git clone:
```bash
    git clone https://github.com/mores-hitt/pids-frontend.git
```
Navegar a la carpeta del proyecto
```bash
    cd pids-frontend
```
Instalar las dependencias con el comando npm install
```bash
    npm install
```
Iniciar sesión con tu cuenta de Expo Go con el comando:   
```bash
    npx expo login -h
```

Configurar el archivo ApiDelivery con la url del backend
```javascript
import axios from "axios";

// EMULATOR ANDROID URL = http://10.0.2.2

const ApiDelivery = axios.create({
    baseURL: 'http://123.456.7.890:000/api/', //URL del backend. Modificar acá
    headers: {
        'Content-type': 'application/json'
    }
});

export { ApiDelivery }
```

Ejecutar el proyecto de manera local con el comando `npx expo start`.
```bash
    npx expo start
```

Ejecute la aplicación en su dispositivo móvil o en un dispositivo emulado.
¡Disfruta de la aplicación móvil!

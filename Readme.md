# 🚀 Características

- Servidor **Socket.IO** con **Express**
- Endpoint **REST** para emitir eventos desde cualquier cliente HTTP
- Configuración mediante **variables de entorno**
- Soporte para **CORS**

---

## 📋 Prerrequisitos

- **Node.js 16+**
- **npm** o **yarn**

---

## 🔧 Instalación

1. **Clona el repositorio**
2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno** creando un archivo `.env`:

   ```env
   PORT=3000
   CORS_ORIGIN=*
   NODE_ENV=development
   ```

---

## 🚀 Uso

**Iniciar el servidor:**

```bash
npm start
```

El servidor estará corriendo en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## Emitir eventos (desde .NET/C#)

Puedes emitir eventos a todos los clientes conectados mediante una petición **HTTP POST**:

### Ejemplo en C#

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class SocketService
{
    private readonly HttpClient http = new HttpClient();
    
    public async Task EmitirNotificacion(string mensaje)
    {
        var json = JsonSerializer.Serialize(new { 
            evento = "notificacion", 
            data = new { mensaje } 
        });
        
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        await http.PostAsync("http://localhost:3000/emit", content);
    }
    
    public async Task EmitirAlerta(string tipo, string contenido)
    {
        var json = JsonSerializer.Serialize(new { 
            evento = "alerta", 
            data = new { tipo, contenido, timestamp = DateTime.Now } 
        });
        
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        await http.PostAsync("http://localhost:3000/emit", content);
    }
}
```

---

## Emitir eventos (desde .NET/C#)
## Ejemplo en JavaScript/TypeScript (Frontend)

```typescript
// Conectar al servidor Socket.IO
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Escuchar eventos
socket.on('notificacion', (data: any) => {
  console.log('Notificación recibida:', data);
  this.mensaje = data.mensaje;
});

socket.on('alerta', (data: any) => {
  console.log('Alerta recibida:', data);
  this.mostrarAlerta(data.tipo, data.contenido);
});

// Emitir eventos desde el cliente (opcional)
socket.emit('mensaje_cliente', { texto: 'Hola servidor!' });
```

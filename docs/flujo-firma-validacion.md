# Flujo de Firma Digital y Validación Biométrica

## Formulario de Vinculación - Mibanco Colombia

---

## 1. Contexto del Proceso

### Escenario de Uso
El **Asesor de Crédito** de Mibanco visita al cliente en campo (negocio, domicilio) para realizar el proceso de vinculación. El asesor lleva consigo un dispositivo móvil (tablet o celular corporativo) donde el cliente completa y firma el formulario de vinculación.

### Actores del Proceso

| Actor | Rol | Responsabilidad |
|-------|-----|-----------------|
| **Cliente** | Solicitante | Completa datos, firma digitalmente, valida identidad |
| **Asesor de Crédito** | Gestor en campo | Acompaña al cliente, verifica información, inicia gestión |
| **Gerente de Agencia** | Aprobador nivel 1 | Revisa y aprueba la solicitud |
| **Equipo de Operaciones** | Ejecutor | Procesa el desembolso del crédito |

---

## 2. Flujo General del Proceso

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          FLUJO DE VINCULACIÓN                               │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
    │   EN CAMPO   │     │   CLIENTE    │     │   OFICINA    │
    │   (Asesor)   │     │   (Móvil)    │     │   (Agencia)  │
    └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
           │                    │                    │
           │  1. Diligencia     │                    │
           │     formulario     │                    │
           │  ──────────────►   │                    │
           │                    │                    │
           │  2. Cliente firma  │                    │
           │     en dispositivo │                    │
           │  ◄──────────────   │                    │
           │                    │                    │
           │  3. Clic "Iniciar  │                    │
           │     Gestión"       │                    │
           │  ─────────────────────────────────────► │
           │                    │                    │
           │                    │  4. Recibe link    │
           │                    │     WhatsApp       │
           │                    │  ◄─────────────────│
           │                    │                    │
           │                    │  5. Valida         │
           │                    │     biometría      │
           │                    │  ─────────────────►│
           │                    │                    │
           │                    │                    │  6. Gerente
           │                    │                    │     revisa y
           │                    │                    │     aprueba
           │                    │                    │     ▼
           │                    │                    │  7. Operaciones
           │                    │                    │     desembolsa
           │                    │                    │
    └──────┴────────────────────┴────────────────────┴──────┘
```

---

## 3. Detalle de Cada Paso

### Paso 1: Diligenciamiento del Formulario

**Ubicación**: En campo (negocio o domicilio del cliente)
**Dispositivo**: Tablet/celular del asesor
**Responsable**: Asesor con apoyo del cliente

**Acciones**:
1. El asesor abre la aplicación del formulario de vinculación
2. Completa los 6 pasos del formulario con información del cliente:
   - Datos personales y ubicación
   - Datos laborales/negocio
   - Información financiera
   - Producto solicitado
   - Cumplimiento (PEP, tributario, ambiental)
   - Autorizaciones legales

**Validaciones**:
- Campos obligatorios completados
- Formatos correctos (teléfono, email, documento)
- Autorizaciones legales aceptadas

---

### Paso 2: Firma Digital del Cliente

**Ubicación**: En campo
**Dispositivo**: El mismo dispositivo del asesor (el asesor entrega el dispositivo al cliente)
**Responsable**: Cliente

**Acciones**:
1. El cliente visualiza un resumen de las autorizaciones que está firmando
2. El cliente firma con su dedo en el área de firma táctil
3. El cliente confirma que la firma es suya
4. La firma queda registrada en el formulario

**Pantalla de Firma**:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  📝 Firma del Cliente                                   │
│                                                         │
│  Al firmar, declaro que:                               │
│  • La información proporcionada es verídica            │
│  • Autorizo la consulta en centrales de riesgo         │
│  • Acepto el tratamiento de mis datos personales       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │           [Área de firma táctil]               │   │
│  │                                                 │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Limpiar]                          [Guardar Firma]    │
│                                                         │
│  ☑ Confirmo que esta es mi firma                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Paso 3: Iniciar Gestión

**Ubicación**: En campo
**Dispositivo**: Dispositivo del asesor
**Responsable**: Asesor

**Acciones**:
1. El asesor revisa el resumen completo del formulario
2. Verifica que la firma del cliente esté registrada
3. Hace clic en el botón **"Iniciar Gestión"**
4. Se muestra un modal informativo explicando los siguientes pasos

**Modal Informativo**:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  📱 Validación de Firma Digital                         │
│                                                         │
│  Se enviará un enlace de validación biométrica al      │
│  cliente vía WhatsApp al número registrado.            │
│                                                         │
│  Una vez que el cliente autentique su firma:           │
│                                                         │
│  1. El caso pasará al Gerente de Agencia para          │
│     revisión y aprobación                              │
│                                                         │
│  2. Tras la aprobación, el equipo de Operaciones       │
│     procesará el desembolso del crédito                │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Número de WhatsApp del cliente:                       │
│  +57 *** *** 1234                                      │
│                                                         │
│         [Cancelar]        [Confirmar y Enviar]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Confirmación de Envío**:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              ✅ Solicitud Enviada                       │
│                                                         │
│  Se ha enviado el enlace de validación al número:      │
│  +57 *** *** 1234                                      │
│                                                         │
│  El cliente recibirá un mensaje de WhatsApp con        │
│  instrucciones para completar la validación            │
│  biométrica.                                           │
│                                                         │
│  Número de radicación: VIN-2024-001234                 │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Puede descargar el PDF del formulario para sus        │
│  registros.                                            │
│                                                         │
│         [Descargar PDF]        [Volver al Inicio]      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Paso 4: Validación Biométrica (Cliente)

**Ubicación**: Cualquier lugar (el cliente usa su propio celular)
**Dispositivo**: Celular personal del cliente
**Responsable**: Cliente

**Acciones**:
1. El cliente recibe un mensaje de WhatsApp de Mibanco
2. El mensaje contiene un enlace único de validación
3. El cliente hace clic en el enlace
4. Se abre una página de validación biométrica
5. El cliente sigue las instrucciones para verificar su identidad

**Mensaje de WhatsApp**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏦 Mibanco Colombia

Hola [Nombre del Cliente],

Para completar tu solicitud de vinculación,
necesitamos verificar tu identidad.

👉 Haz clic en el siguiente enlace:
https://validacion.mibanco.com.co/v/abc123

⏰ Este enlace expira en 24 horas.

Si tienes dudas, contacta a tu asesor o
llámanos al 601 744 0880.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Proceso de Validación Biométrica**:
1. **Captura de documento**: El cliente toma foto de su cédula (frente y reverso)
2. **Verificación facial**: El cliente se toma una selfie siguiendo instrucciones en pantalla
3. **Prueba de vida**: El cliente realiza acciones como parpadear o mover la cabeza
4. **Confirmación**: El sistema verifica que el rostro coincida con el documento

**Resultado Exitoso**:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              ✅ Verificación Exitosa                    │
│                                                         │
│  Tu identidad ha sido verificada correctamente.        │
│                                                         │
│  Tu solicitud de vinculación ha sido enviada al        │
│  Gerente de Agencia para su aprobación.                │
│                                                         │
│  Te notificaremos cuando tu solicitud sea aprobada.    │
│                                                         │
│  Gracias por confiar en Mibanco.                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Paso 5: Aprobación por Gerente de Agencia

**Ubicación**: Oficina de la agencia
**Dispositivo**: Computador del gerente
**Responsable**: Gerente de Agencia

**Acciones**:
1. El gerente recibe notificación de nueva solicitud pendiente
2. Accede al panel de aprobaciones
3. Revisa el formulario completo y documentos adjuntos
4. Verifica que la validación biométrica esté exitosa
5. Aprueba o rechaza la solicitud

**Vista del Gerente**:
```
┌─────────────────────────────────────────────────────────────────────┐
│  📋 Panel de Aprobaciones - Gerente de Agencia                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Solicitud: VIN-2024-001234                                        │
│  Cliente: Juan Pérez García                                        │
│  Documento: CC 1.234.567.890                                       │
│  Asesor: María López                                               │
│  Fecha solicitud: 04/12/2024 10:30 AM                              │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  Estado de Validaciones:                                           │
│  ✅ Formulario completo                                            │
│  ✅ Firma digital capturada                                        │
│  ✅ Validación biométrica exitosa (04/12/2024 11:45 AM)           │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  Producto Solicitado: Crédito Microempresarial                     │
│  Monto: $5.000.000                                                 │
│  Plazo: 24 meses                                                   │
│                                                                     │
│  [Ver Formulario Completo]  [Ver PDF]  [Ver Validación Biométrica] │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  Observaciones (opcional):                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│         [Rechazar]                            [Aprobar]            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Notificaciones al Aprobar**:
- Al asesor: "La solicitud VIN-2024-001234 ha sido aprobada"
- Al cliente (WhatsApp): "Tu solicitud de crédito ha sido aprobada"

**Notificaciones al Rechazar**:
- Al asesor: "La solicitud VIN-2024-001234 ha sido rechazada. Motivo: [...]"
- Al cliente (WhatsApp): "Tu solicitud requiere información adicional. Tu asesor te contactará."

---

### Paso 6: Desembolso por Operaciones

**Ubicación**: Oficina central / Operaciones
**Dispositivo**: Sistema de operaciones
**Responsable**: Equipo de Operaciones

**Acciones**:
1. Operaciones recibe la solicitud aprobada
2. Verifica documentación final
3. Procesa el desembolso según modalidad seleccionada:
   - Transferencia a cuenta del cliente
   - Cheque de gerencia
   - Abono en cuenta Mibanco
4. Genera comprobante de desembolso
5. Notifica al cliente y asesor

**Notificación de Desembolso**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏦 Mibanco Colombia

¡Felicitaciones [Nombre del Cliente]!

Tu crédito ha sido desembolsado exitosamente.

💰 Monto: $5.000.000
📅 Fecha: 04/12/2024
🏦 Cuenta destino: ****1234

Tu primera cuota será el 04/01/2025.

Gracias por confiar en Mibanco.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 4. Estados de la Solicitud

```
┌──────────────┐
│   BORRADOR   │  → Formulario en proceso de diligenciamiento
└──────┬───────┘
       │ Cliente firma
       ▼
┌──────────────┐
│   FIRMADO    │  → Firma digital capturada, pendiente de enviar
└──────┬───────┘
       │ Asesor inicia gestión
       ▼
┌──────────────┐
│  PENDIENTE   │  → Esperando validación biométrica del cliente
│  VALIDACIÓN  │
└──────┬───────┘
       │ Cliente completa validación
       ▼
┌──────────────┐
│  VALIDADO    │  → Biometría exitosa, pendiente de aprobación
└──────┬───────┘
       │ Asignado a gerente
       ▼
┌──────────────┐
│  PENDIENTE   │  → En cola de aprobación del gerente
│    JEFE      │
└──────┬───────┘
       │
       ├─────────────────────┐
       │ Aprueba             │ Rechaza
       ▼                     ▼
┌──────────────┐      ┌──────────────┐
│  APROBADO    │      │  RECHAZADO   │
└──────┬───────┘      └──────────────┘
       │ Pasa a operaciones
       ▼
┌──────────────┐
│    EN        │  → Operaciones procesando desembolso
│ DESEMBOLSO   │
└──────┬───────┘
       │ Desembolso completado
       ▼
┌──────────────┐
│ DESEMBOLSADO │  → Proceso completado exitosamente
└──────────────┘
```

---

## 5. Tiempos Estimados del Proceso

| Etapa | Tiempo Estimado | Responsable |
|-------|-----------------|-------------|
| Diligenciamiento formulario | 15-30 minutos | Asesor + Cliente |
| Firma digital | 2-3 minutos | Cliente |
| Validación biométrica | 3-5 minutos | Cliente |
| Aprobación gerente | 1-24 horas | Gerente |
| Desembolso | 1-48 horas | Operaciones |
| **Total proceso** | **1-3 días hábiles** | - |

---

## 6. Consideraciones de Seguridad

### Firma Digital
- La firma se captura como imagen PNG con marca de tiempo
- Se registra información del dispositivo (user agent)
- La firma queda asociada al número de documento del cliente

### Validación Biométrica
- Enlace único por solicitud con expiración de 24 horas
- Verificación facial con prueba de vida (liveness)
- Comparación contra documento de identidad oficial
- Registro de IP y dispositivo de validación

### Trazabilidad
- Cada acción queda registrada con timestamp y usuario
- PDF generado incluye hash de integridad
- Historial completo de estados disponible para auditoría

---

## 7. Casos Especiales

### Validación Biométrica Fallida
Si el cliente no logra completar la validación biométrica:
1. Puede reintentar hasta 3 veces
2. Si falla después de 3 intentos, se notifica al asesor
3. El asesor puede solicitar validación alternativa (presencial en agencia)

### Enlace Expirado
Si el enlace de validación expira (24 horas):
1. El cliente contacta al asesor
2. El asesor puede reenviar un nuevo enlace desde el sistema
3. Se mantiene la firma original, solo se revalida la biometría

### Cliente sin WhatsApp
Si el cliente no tiene WhatsApp:
1. Se puede enviar el enlace por SMS
2. Alternativa: validación presencial en la agencia más cercana

### Rechazo por Gerente
Si el gerente rechaza la solicitud:
1. Debe indicar el motivo del rechazo
2. El asesor recibe notificación con el motivo
3. El cliente recibe mensaje genérico invitándolo a contactar al asesor
4. El asesor puede corregir y reenviar si el motivo es subsanable

---

## 8. Beneficios del Proceso Digital

### Para el Cliente
- ✅ No necesita desplazarse a la agencia para firmar
- ✅ Proceso más rápido y conveniente
- ✅ Validación desde su propio celular
- ✅ Notificaciones en tiempo real del estado

### Para el Asesor
- ✅ Cierre de gestión en una sola visita
- ✅ Reducción de documentos físicos
- ✅ Seguimiento del estado en tiempo real
- ✅ Mayor productividad en campo

### Para Mibanco
- ✅ Reducción de fraude con validación biométrica
- ✅ Trazabilidad completa del proceso
- ✅ Reducción de tiempos de vinculación
- ✅ Mejora en experiencia del cliente

---

## 9. Próximos Pasos (Implementación Futura)

Este documento describe el flujo funcional completo. Para la implementación técnica se requiere:

1. **Backend de gestión de solicitudes**
2. **Integración con proveedor de WhatsApp Business API**
3. **Integración con proveedor de validación biométrica**
4. **Panel de aprobaciones para gerentes**
5. **Integración con sistema de desembolsos**
6. **Sistema de notificaciones en tiempo real**

---

*Documento de especificación funcional - Mibanco Colombia*
*Versión 1.0 - Diciembre 2024*

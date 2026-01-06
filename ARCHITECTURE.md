
# Arquitectura y Roadmap: Criadores Verificados MX

## A) Propuesta de Arquitectura (Simple & Barata)
Para el MVP, se recomienda una arquitectura de **Backend as a Service (BaaS)** para reducir costos de infraestructura y tiempo de desarrollo:

1.  **Frontend**: React (SPA) + Tailwind CSS. Enfoque mobile-first para facilitar la conversión a PWA o app híbrida (Capacitor/Ionic) en el futuro.
2.  **Backend/DB**: **Supabase** (PostgreSQL).
    *   **Justificación**: Ofrece Auth (Email/Google), base de datos relacional (vital para razas/criadores), almacenamiento de archivos (fotos/evidencia) y Row Level Security (RLS) para cumplir con las reglas de privacidad de los chats de forma nativa.
3.  **Hosting**: Vercel o Netlify (Capa gratuita).

## B) Esquema de Base de Datos y Reglas
*   **public.profiles**: Extensión de la tabla auth.users. Contiene `full_name`, `avatar_url` y `role`.
*   **public.breeder_profiles**: Datos del criadero. RLS: Lectura pública (si verificado), escritura solo por el dueño.
*   **public.litters**: Camadas. Relacionado con `breeder_id`. RLS: Lectura pública, escritura por el criador.
*   **public.conversations**: `id`, `user_id`, `breeder_id`. RLS: Solo accesible si `auth.uid() == user_id` O `auth.uid() == breeder.user_id`.
*   **public.messages**: `conversation_id`, `sender_id`, `text`. RLS: Solo si el usuario pertenece a la conversación.

## C) API Endpoints (Mínimos)
Utilizando Supabase (PostgREST), los endpoints son automáticos:
*   `GET /breeder_profiles?verificacion_status=eq.VERIFIED` - Listado público.
*   `POST /litters` - Crear camada (requiere JWT del criador).
*   `POST /messages` - Enviar mensaje (Trigger para actualizar `updated_at` en conversation).
*   `RPC /approve_breeder(id)` - Función ejecutada solo por rol ADMIN.

## D) Próximos Pasos (Checklist)
1.  **Verificación Avanzada**: Integrar OCR para validar automáticamente certificados de la Federación Canófila Mexicana (FCM).
2.  **Reputación**: Sistema de reseñas post-contacto verificado (solo usuarios que chatearon con el criador).
3.  **Mapa de Proximidad**: Geocodificación de ciudad/estado para búsqueda "Cerca de mí" sin revelar dirección exacta.
4.  **Notificaciones**: Push notifications y avisos por WhatsApp/Email cuando un criador publica una camada de una raza que el usuario sigue.
5.  **Monetización**: Suscripción mensual para criadores (Sello "Premium") y destacados en búsquedas.

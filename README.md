# Voz a Texto

Dicta con tu voz y mira el texto aparecer en pantalla en tiempo real. Gratis y sin cuenta. El reconocimiento lo hace tu navegador; SonhoLab no recibe tu voz ni el texto.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor (salvo lo indicado en *Privacidad* más abajo).

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Dictar un mensaje de WhatsApp, una nota de clase o un párrafo de un trabajo ya no exige escribir letra por letra. Aquí hablas frente al micrófono y el texto va apareciendo en la pantalla a medida que lo dices, listo para copiar o descargar como archivo de texto. La herramienta usa el reconocimiento de voz que ya trae tu navegador: SonhoLab no recibe ni guarda tu voz ni el texto, pero según el navegador (en Chrome, Google) el audio puede enviarse al servicio de reconocimiento de voz de su desarrollador para transcribirlo, por lo que se necesita conexión a internet. Funciona mejor en Google Chrome o Microsoft Edge.

**Cuándo te sirve:**

- Alguien va manejando o tiene las manos ocupadas cocinando y necesita dictar un mensaje de WhatsApp o un correo sin soltar lo que está haciendo.
- Un estudiante toma notas rápidas durante una clase o una reunión hablando en voz baja, en lugar de escribir a las carreras y perderse partes de la explicación, y las ordena con calma más tarde.
- Alguien con una lesión en la mano, o que simplemente piensa y habla más rápido de lo que escribe, redacta un documento completo dictando en vez de tipear cada palabra.

## Cómo se usa

1. **Da permiso al micrófono.** Haz clic en Grabar y el navegador te pedirá acceso al micrófono la primera vez. Acéptalo una sola vez; después, cada vez que vuelvas a la herramienta queda listo para usarse de inmediato.
2. **Habla con normalidad.** Dicta tu mensaje, tu nota o tu párrafo con voz clara y a un ritmo natural. El texto va apareciendo mientras hablas: lo que todavía se está procesando se ve en gris y lo ya confirmado se ve en negro sólido. El resultado no es perfecto al cien por ciento, sobre todo con ruido de fondo o palabras muy técnicas, pero de todas formas ahorra bastante tiempo frente a escribir todo a mano.
3. **Copia o descarga el resultado.** Presiona Detener cuando termines de hablar. Luego copia el texto al portapapeles para pegarlo donde lo necesites, o descárgalo directo como archivo .txt para guardarlo.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno que instalar**, pero depende del reconocimiento de voz que trae el propio navegador (Web Speech API).

### En el navegador de quien la usa

- **Solo Chrome, Edge y navegadores basados en Chromium.** Firefox no la implementa. Safari tiene soporte parcial.
- Hay que abrir la página por **HTTPS o por `localhost`**, y el usuario debe **aceptar el permiso del micrófono**.
- **Privacidad:** el audio no lo procesa esta herramienta: lo envía el navegador al servicio de reconocimiento de voz de su fabricante. No presentes esta herramienta como "100 % local".

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-voz-a-texto.git
cd herramienta-voz-a-texto
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/voz-a-texto/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

La transcripción usa el reconocimiento de voz del navegador. **El audio sale del equipo hacia el servicio de voz del fabricante del navegador** (por ejemplo Google en Chrome). Esta herramienta no guarda ni envía el audio a ningún servidor propio, no incluye analítica ni cookies, pero tampoco puede garantizar que la transcripción ocurra solo en local. Infórmalo así a tus usuarios.

## Preguntas frecuentes

**¿Funciona en cualquier navegador?**  
No en todos por igual. Funciona bien en Google Chrome y Microsoft Edge, que tienen soporte sólido para el reconocimiento de voz nativo del navegador. En Safari y Firefox el soporte es limitado o directamente no existe, así que si hablas y no aparece nada en pantalla, prueba abrir la herramienta en Chrome o Edge.

**¿Puedo subir un audio o una nota de voz de WhatsApp para transcribirla?**  
No. Esta herramienta solo transcribe lo que dices en vivo frente al micrófono; no acepta archivos de audio como un MP3 o una nota de voz ya grabada. Si lo que necesitas es transcribir un audio existente, esta no es la herramienta indicada para eso.

**¿Mi voz y el texto se envían o se guardan en algún servidor?**  
Por nuestra parte no: no recibimos, no guardamos ni enviamos a nuestros servidores ni tu voz ni el texto, que solo se muestra en tu pantalla. Pero el reconocimiento lo hace tu navegador y, según cuál uses (en Chrome, Google), el audio puede enviarse al servicio de reconocimiento de voz de su desarrollador para transcribirlo. Por eso la herramienta necesita internet y, en esa parte, rige la política de privacidad de ese proveedor. Si no quieres que algo pase por ese servicio, no lo dictes: evita contraseñas y datos sensibles. En esta página no se guarda nada: al cerrar la pestaña todo desaparece, salvo lo que hayas copiado o descargado antes.

**¿Necesito instalar algo o crear una cuenta?**  
No. Se usa directo desde el navegador que ya tienes instalado, sin agregar programas ni extensiones, y sin registrarte ni dejar tu correo. Lo único que pide es permiso para usar el micrófono, y solo la primera vez.

**¿En qué idioma reconoce lo que digo?**  
Reconoce el idioma que tengas configurado en el sitio en ese momento: si ves la página en español te entiende en español, y lo mismo si la cambias a inglés, francés o portugués. Cambia primero el idioma del sitio si necesitas dictar en otro.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.

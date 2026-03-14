# Landing Page Design System & Styles (landing-style.md)

## Estética "Awwwards Vibe"
El diseño de Anguria debe sentirse **letal, premium y tecnológico**.

## Fundamentos Visuales
- **Fondo:** Dark Mode extremo (`#050505`).
- **Acentuación:** **Naranja Anguria (#f97316)**. Se usa para CTAs, indicadores de estado y cursor del terminal.
- **Tipografía:** 
  - Títulos: Geist Sans (Black/Extrabold), tracking `-0.05em` (tracking-tighter).
  - Terminal: Geist Mono, espaciado clásico de consola.

## Componentes Clave
### 1. La Terminal Hero
- **Comportamiento:** Animación de tecleo literal carácter a carácter.
- **Interacción:** El cursor `_` parpadea en naranja. Al terminar de escribir, el contenido se desplaza hacia arriba simulando un comando `INTRO`.
- **Contenedor:** Estilo Mac OS con controles de ventana (rojo, amarillo, verde) y fondo con `backdrop-blur-3xl`.

### 2. Bento Grids (Servicios)
- **Asimetría:** Evitar grids de 2x2. Usar columnas de 8/4 o 7/5 para crear interés visual.
- **Bordes:** `border-white/5` (casi invisibles).
- **Hover:** El borde se ilumina en naranja (`accent-orange/30`) y los iconos rotan de `-45deg` a `0deg`.

## Sistema de Animación (Framer Motion)
- **Transiciones:** Usar `ease: [0.16, 1, 0.3, 1]` (custom bezier) para movimientos elegantes.
- **Layout Animations:** Usar la prop `layout` de Framer Motion para asegurar que los saltos de contenido sean fluidos al inyectar logs o textos.

## Reglas de Oro
- **No Placeholders:** Usar imágenes reales o gráficos técnicos SVGs limpios.
- **No Genérico:** Si parece una plantilla de WordPress, está MAL. Debe parecer una herramienta de software propietaria.
- **Micro-interacciones:** Todo clic o hover debe tener un `active:scale-95` o similar para dar feedback físico.

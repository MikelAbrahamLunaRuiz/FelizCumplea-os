
        // JavaScript para la interactividad
        const pastel = document.getElementById('pastel');
        const mensaje = document.getElementById('mensaje');
        const resplandor = document.getElementById('resplandor');
        
        // Función para crear confeti
        function crearConfeti() {
            const colores = ['#ff66b3', '#66b3ff', '#b3ff66', '#ffb366', '#b366ff', '#66ffb3', '#f8d56f', '#f67280'];
            const formas = ['circle', 'square', 'triangle'];
            
            for (let i = 0; i < 150; i++) {
                const confeti = document.createElement('div');
                confeti.classList.add('confeti');
                
                // Posición aleatoria
                const x = Math.random() * window.innerWidth;
                const y = -20 - (Math.random() * 200);
                
                // Forma aleatoria
                const forma = formas[Math.floor(Math.random() * formas.length)];
                
                // Estilo del confeti
                confeti.style.left = x + 'px';
                confeti.style.top = y + 'px';
                confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
                confeti.style.width = (Math.random() * 10 + 5) + 'px';
                confeti.style.height = (Math.random() * 10 + 5) + 'px';
                confeti.style.opacity = '1';
                
                if (forma === 'circle') {
                    confeti.style.borderRadius = '50%';
                } else if (forma === 'triangle') {
                    confeti.style.width = '0';
                    confeti.style.height = '0';
                    confeti.style.backgroundColor = 'transparent';
                    confeti.style.borderLeft = (Math.random() * 10 + 5) + 'px solid transparent';
                    confeti.style.borderRight = (Math.random() * 10 + 5) + 'px solid transparent';
                    confeti.style.borderBottom = (Math.random() * 10 + 5) + 'px solid ' + colores[Math.floor(Math.random() * colores.length)];
                }
                
                confeti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                
                document.body.appendChild(confeti);
                
                // Animación de caída
                let velocidadY = 1 + Math.random() * 5;
                let velocidadX = (Math.random() - 0.5) * 3;
                let rotacion = Math.random() * 10 - 5;
                
                const animar = () => {
                    const top = parseFloat(confeti.style.top);
                    const left = parseFloat(confeti.style.left);
                    const rot = parseFloat(confeti.style.transform.replace('rotate(', '').replace('deg)', ''));
                    
                    confeti.style.top = (top + velocidadY) + 'px';
                    confeti.style.left = (left + velocidadX) + 'px';
                    confeti.style.transform = 'rotate(' + (rot + rotacion) + 'deg)';
                    
                    if (top < window.innerHeight) {
                        requestAnimationFrame(animar);
                    } else {
                        confeti.remove();
                    }
                };
                
                setTimeout(() => {
                    animar();
                }, Math.random() * 1500);
            }
        }
        
        // Evento de clic en el pastel
        pastel.addEventListener('click', activarCelebracion);
        
        // Añadir el evento al botón también
        document.getElementById('botonFelicitar').addEventListener('click', activarCelebracion);
        
        // Función para activar la celebración
        function activarCelebracion() {
            // Mostrar mensaje
            mensaje.style.opacity = '1';
            mensaje.style.transform = 'translateY(0)';
            
            // Mostrar resplandor
            resplandor.style.opacity = '1';
            
            // Crear confeti
            crearConfeti();
            
            // Reproducir sonido (opcional)
            const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
            audio.play().catch(e => console.log("Auto-play no permitido"));
            
            // Mensaje emergente
            setTimeout(() => {
                alert("¡FELIZ CUMPLEAÑOS DIANA! 🎂✨🎉");
            }, 600);
            
            // Animación del pastel
            pastel.style.transform = 'scale(1.15)';
            setTimeout(() => {
                pastel.style.transform = 'scale(1)';
            }, 400);
            
            // Ocultar resplandor después de un tiempo
            setTimeout(() => {
                resplandor.style.opacity = '0';
            }, 2000);
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                mensaje.style.opacity = '0';
                mensaje.style.transform = 'translateY(-100px)';
            }, 5000);
        }
        
        // Eliminar el evento anterior
        // pastel.addEventListener('click', function() { ... });
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'happy bir.html' : req.url);
    
    // Obtener la extensión del archivo
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Tipos MIME para diferentes extensiones de archivo
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    }[extname] || 'application/octet-stream';
    
    // Leer el archivo
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code);
            }
        } else {
            // Enviar el contenido con el tipo MIME correcto
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Abre tu navegador y visita: http://localhost:${PORT}`);
});
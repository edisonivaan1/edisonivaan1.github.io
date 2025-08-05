import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

try {
  // Leer el contenido del index.html
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Escribir el mismo contenido en 404.html
  fs.writeFileSync(notFoundPath, indexContent);
  
  console.log('✅ 404.html actualizado correctamente');
} catch (error) {
  console.error('❌ Error al copiar index.html a 404.html:', error);
  process.exit(1);
} 
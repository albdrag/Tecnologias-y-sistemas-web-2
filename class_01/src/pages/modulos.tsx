const Modulos = () => {
  return (
    <div className="container">
      <h3>Módulos</h3>
      <p>
        React permite separar el código en diferentes archivos o módulos para organizar mejor los componentes
        de una aplicación. Esta funcionalidad se logra mediante el uso de <code>export</code> e <code>import</code>.
      </p>
      <h5>Ejemplo de uso:</h5>
      <pre>
{`// Archivo: mensajes.ts
export const mensaje = 'Hola mundo';
export const despedida = 'Adiós mundo';
`}
      </pre>
      <pre>
{`// Archivo: app.tsx
import { mensaje, despedida } from './mensajes';

console.log(mensaje);
console.log(despedida);
`}
      </pre>
    </div>
  );
};

export default Modulos;

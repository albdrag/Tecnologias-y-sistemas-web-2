// Funciones básicas
function sumar(a: number, b: number): number {
  return a + b;
}

const restar = (a: number, b: number): number => {
  return a - b;
};

const multiplicar = (a: number, b: number): number => a * b;

const dividir = (a: number, b: number): number => b !== 0 ? a / b : NaN;

const Funciones = () => {
  const a = 10;
  const b = 5;

  return (
    <div className="container">
      <h3>Funciones</h3>
      <p><b>Valores base:</b> a = {a}, b = {b}</p>
      <ul>
        <li><b>Suma:</b> {sumar(a, b)}</li>
        <li><b>Resta:</b> {restar(a, b)}</li>
        <li><b>Multiplicación:</b> {multiplicar(a, b)}</li>
        <li><b>División:</b> {dividir(a, b)}</li>
      </ul>
    </div>
  );
};

export default Funciones;

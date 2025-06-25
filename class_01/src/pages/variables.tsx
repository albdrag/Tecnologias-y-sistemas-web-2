// Declaring variables and constants
const nombre = 'Merlina Addams';
const pi = 3.1416;

const entero = 45;
const precio = 45.99;
const booleano = true;

let nombre2 : string = '¿?';
nombre2 = 'Morticia Addams';

const fecha = new Date();

// Declaring arrays
const nombres : string[] = ['Merlina Addams', 'Morticia Addams', 'Homero Addams', 'Tío Cosa Addams'];
nombres.push('Tío Lucas Addams');
nombres.push('Pericles Addams');

// Declaring associative arrays
const familia = [
	{nombre: 'Merlina Addams', edad: 18},
	{nombre: 'Morticia Addams', edad: 45},
	{nombre: 'Homero Addams', edad: 50}
];

const matriz = [
	[{nombre: 'Merlina Addams', edad: 18},{nombre: 'Morticia Addams', edad: 45},{nombre: 'Homero Addams', edad: 50}],
	[{nombre: 'Herman Munster', edad: 48},{nombre: 'Lily Munster',    edad: 43},{nombre: 'Eddie Munster', edad: 12}]
];

const Variables = () => {
	return (
		<div className="container">
			<h3>Variables y Constantes</h3>
			<br/>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Epresión</th>
						<th>Definición</th>
						<th>Tipo</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Nombre</td>
						<td>Constante</td>
						<td>{typeof nombre}</td>
						<td>{nombre}</td>
					</tr>
					<tr>
						<td>pi</td>
						<td>Constante</td>
						<td>{typeof pi}</td>
						<td>{pi}</td>
					</tr>
					<tr>
						<td>entero</td>
						<td>Variable</td>
						<td>{typeof entero}</td>
						<td>{entero}</td>
					</tr>
					<tr>
						<td>precio</td>
						<td>Variable</td>
						<td>{typeof precio}</td>
						<td>{precio}</td>
					</tr>
					<tr>
						<td>booleano</td>
						<td>Variable</td>
						<td>{typeof booleano}</td>
						<td>{booleano.toString()}</td>
					</tr>
					<tr>
						<td>nombre2</td>
						<td>Variable (let)</td>
						<td>{typeof nombre2}</td>
						<td>{nombre2}</td>
					</tr>
					<tr>
						<td>fecha</td>
						<td>Variable (let)</td>
						<td>{typeof fecha}</td>
						<td>{fecha.toString()}</td>
					</tr>
				</tbody>
			</table>

			<br/>
			<h4>Usando expresiones de tipo Fecha:</h4>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Formato</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Fecha corta</td>
						<td>{fecha.toLocaleDateString()}</td>
					</tr>
					<tr>
						<td>Fecha larga</td>
						<td>{fecha.toLocaleString()}</td>
					</tr>
					<tr>
						<td>Fecha ISO</td>
						<td>{fecha.toISOString()}</td>
					</tr>
					<tr>
						<td>Hora</td>
						<td>{fecha.toLocaleTimeString()}</td>
					</tr>
					<tr>
						<td>Fecha UTC</td>
						<td>{fecha.toUTCString()}</td>
					</tr>
				</tbody>
			</table>

			<br/>
			<h4>Usando Vectores:</h4>
			<p>El vector nombres de tipo String, contiene {nombres.length} elementos.</p>

			{nombres.map((nombre, index) => (
				<p key={index}>
					{index + 1 + '. ' + nombre + ' '}
				</p>
			))}

			<br/>
			<p>El vector familia de tipo compuesto, contiene {familia.length} elementos.</p>

			{familia.map((miembro, index) => (
				<p key={index}>
					{index + 1 + '. ' + miembro.nombre + ' - ' + miembro.edad + ' años'}
				</p>
			))}

			<br/>
			<h4>Usando Matrices:</h4>
			<p>La matriz de series de TV tiene {matriz.length} filas y {matriz[0].length} columnas posibles.</p>

			{matriz.map((fila, i) => (
				fila.map((miembro, j) => (
					<p key={`${i}-${j}`}>
						{j + 1 + '. ' + miembro.nombre + ' - ' + miembro.edad + ' años'}
					</p>
				))
			))}
		</div>
	);
}

export default Variables;

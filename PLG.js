let inputA, inputB, inputAC, inputBC, inputParticion;
let botonUnion, botonInterseccion, botonDiferencia, botonDiferencia2, botonClasificarReflexiva, botonClasificarSimetrica, botonClasificarTransitiva, botonVerificarParticion;
let resultado, resultado1, resultado2;
let A = [];
let B = [];
let AC = [];
let relacion = [];

// Función para convertir la entrada en un conjunto (array sin duplicados)
function obtenerConjunto() {
    let valueA = inputA.value();
    let valueB = inputB.value();

    if (valueA.length === 0 || valueB.length === 0) {
        return false; // Si los conjuntos están vacíos, no continuar
    }

    A = Array.from(new Set(valueA.split(',').map(x => x.trim())));
    B = Array.from(new Set(valueB.split(',').map(x => x.trim())));
    return true;
}

// Función para mostrar el resultado para operaciones de conjuntos
function mostrarResultado(texto) {
    if (texto.length === 0) {
        texto = "Por favor, ingrese valores en ambos conjuntos.";
    }
    resultado.html(texto);
}

// Resolver Unión de A y B
function resolverUnion() {
    if (!obtenerConjunto()) return;
    const union = [...new Set([...A, ...B])];
    mostrarResultado('Unión: {' + union.join(', ') + '}');
}

// Resolver Intersección de A y B
function resolverInterseccion() {
    if (!obtenerConjunto()) return;
    const interseccion = A.filter(x => B.includes(x));
    mostrarResultado('Intersección: {' + interseccion.join(', ') + '}');
}

// Resolver Diferencia A - B
function resolverDiferencia() {
    if (!obtenerConjunto()) return;
    const diferencia = A.filter(x => !B.includes(x));
    mostrarResultado('Diferencia (A - B): {' + diferencia.join(', ') + '}');
}

// Resolver Diferencia B - A
function resolverDiferencia2() {
    if (!obtenerConjunto()) return;
    const diferencia = B.filter(x => !A.includes(x));
    mostrarResultado('Diferencia (B - A): {' + diferencia.join(', ') + '}');
}

// Función para obtener y procesar la relación en la clasificación de relaciones
function obtenerConjuntoC() {
    let valueA = inputAC.value();
    let valueB = inputBC.value();

    if (valueA.length === 0 || valueB.length === 0) {
        return false;
    }

    // Conjunto A para clasificación de relaciones
    AC = Array.from(new Set(valueA.split(',').map(x => x.trim())));

    // Relación en B: pares ordenados
    relacion = valueB.split(',').map(pair => {
        let [a, b] = pair.trim().split(' ');
        return [a, b];
    });
    return true;
}

// Función para mostrar el resultado para clasificación de relaciones
function mostrarResultadoClasificacion(texto) {
    if (texto.length === 0) {
        texto = "Por favor, ingrese valores en ambos conjuntos.";
    }
    resultado1.html(texto);
}

// Función para clasificar una relación como Reflexiva
function clasificarReflexiva() {
    if (!obtenerConjuntoC()) return;
    
    // Verificar Reflexividad
    const esReflexiva = AC.every(el => relacion.some(([a, b]) => a === el && b === el));
    
    mostrarResultadoClasificacion(esReflexiva ? "La relación es Reflexiva." : "La relación NO es Reflexiva.");
}

// Función para clasificar una relación como Simétrica
function clasificarSimetrica() {
    if (!obtenerConjuntoC()) return;

    // Verificar Simetría
    let paresSimetricos = new Set(relacion.map(([a, b]) => `${a},${b}`));
    const esSimetrica = relacion.every(([a, b]) => paresSimetricos.has(`${b},${a}`));
    
    mostrarResultadoClasificacion(esSimetrica ? "La relación es Simétrica." : "La relación NO es Simétrica.");
}

// Función para clasificar una relación como Transitiva
function clasificarTransitiva() {
    if (!obtenerConjuntoC()) return;

    // Verificar Transitividad
    let paresRelacion = new Set(relacion.map(([a, b]) => `${a},${b}`));
    const esTransitiva = relacion.every(([a, b]) => {
        return relacion.every(([c, d]) => b === c && paresRelacion.has(`${a},${d}`));
    });

    mostrarResultadoClasificacion(esTransitiva ? "La relación es Transitiva." : "La relación NO es Transitiva.");
}

// Función para verificar si los subconjuntos forman una partición
function verificarParticion() {
    let valueA = inputAP.value();
    let valueParticiones = inputParticion.value();

    // Convertir conjunto A a un array
    let A = Array.from(new Set(valueA.split(',').map(x => x.trim())));

    // Convertir los subconjuntos a un array de arrays
    let subconjuntos = valueParticiones.split(';').map(sub => 
        Array.from(new Set(sub.split(',').map(x => x.trim()))));
    
    // Verificar si los subconjuntos cubren todo el conjunto A y son disjuntos
    let unionSubconjuntos = [];
    let esDisjunto = true;

    for (let sub of subconjuntos) {
        // Verificar que los subconjuntos no se repitan
        if (sub.some(el => unionSubconjuntos.includes(el))) {
            esDisjunto = false;
        }
        unionSubconjuntos = [...new Set([...unionSubconjuntos, ...sub])];
    }

    // Verificar que la unión de los subconjuntos sea igual a A
    let esParticion = unionSubconjuntos.length === A.length && esDisjunto;

    if (esParticion) {
        mostrarResultadoP('Es una partición válida del conjunto A.');
    } else {
        mostrarResultadoP('No es una partición, ya sea porque los subconjuntos no cubren todo A o no son disjuntos.');
    }
}

function mostrarResultadoP(texto) {
    resultado2.html(texto);
}

// Configuración de la interfaz
function setup() {
    noCanvas();

    // Operaciones de conjuntos
    createElement('h1', 'Resolver Operaciones de Conjuntos');
    createElement('label', 'Conjunto A (separado por comas): ');
    inputA = createInput().attribute('placeholder', 'Ejemplo: 1,2,3');
    inputA.attribute('style', 'width: 400px;');
    createElement('br'); 

    createElement('label', 'Conjunto B (separado por comas): ');
    inputB = createInput().attribute('placeholder', 'Ejemplo: 3,4,5');
    inputB.attribute('style', 'width: 400px;');
    createElement('br');
    createElement('br');

    botonUnion = createButton('Unión');
    botonUnion.mousePressed(resolverUnion);

    botonInterseccion = createButton('Intersección');
    botonInterseccion.mousePressed(resolverInterseccion);

    botonDiferencia = createButton('Diferencia (A - B)');
    botonDiferencia.mousePressed(resolverDiferencia);

    botonDiferencia2 = createButton('Diferencia (B - A)');
    botonDiferencia2.mousePressed(resolverDiferencia2);

    createElement('h2', 'Resultado:');
    resultado = createDiv();

    // Clasificación de Relaciones
    createElement('h1', 'Clasificación de Relaciones');
    
    createElement('label', 'Conjunto A (elementos separados por comas): ');
    inputAC = createInput().attribute('placeholder', 'Ejemplo: 1,2,3');
    inputAC.attribute('style', 'width: 400px;');
    createElement('br'); 

    createElement('label', 'Relación en formato "a b": ');
    inputBC = createInput().attribute('placeholder', 'Ejemplo: 1 2, 2 3');
    inputBC.attribute('style', 'width: 400px;');
    createElement('br');
    createElement('br');

    botonClasificarReflexiva = createButton('Clasificar como Reflexiva');
    botonClasificarReflexiva.mousePressed(clasificarReflexiva);

    botonClasificarSimetrica = createButton('Clasificar como Simétrica');
    botonClasificarSimetrica.mousePressed(clasificarSimetrica);

    botonClasificarTransitiva = createButton('Clasificar como Transitiva');
    botonClasificarTransitiva.mousePressed(clasificarTransitiva);

    createElement('h2', 'Resultado de la Clasificación:');
    resultado1 = createDiv();

    // Verificación de partición
    createElement('h1', 'Verificación de Partición');
    
    createElement('label', 'Conjunto A (elementos separados por comas): ');
    inputAP = createInput().attribute('placeholder', 'Ejemplo: 1,2,3');
    inputAP.attribute('style', 'width: 400px;');
    createElement('br'); 

    createElement('label', 'Subconjuntos separados por punto y coma: ');
    inputParticion = createInput().attribute('placeholder', 'Ejemplo: 1,2; 3');
    inputParticion.attribute('style', 'width: 400px;');
    createElement('br');
    createElement('br');

    botonVerificarParticion = createButton('Verificar Partición');
    botonVerificarParticion.mousePressed(verificarParticion);

    createElement('h2', 'Resultado de la Partición:');
    resultado2 = createDiv();
}

const resistenciaValue = document.querySelector('#resistencia-value');

const selectorBandas = document.querySelector("#num-bandas");
const banda3 = document.querySelector("#ocultar-banda");

const optionSelectedBanda1 = document.querySelector('#optionSelected1');
const optionSelectedBanda2 = document.querySelector('#optionSelected2');
const optionSelectedBanda3 = document.querySelector('#optionSelected3');
const optionSelectedMulti = document.querySelector('#optionSelected4');
const optionSelectedTol = document.querySelector('#optionSelected5');

const optionsSelected = [
    document.querySelector('#optionSelected1'),
    document.querySelector('#optionSelected2'),
    document.querySelector('#optionSelected3'),
]

const options1 = document.querySelector('#options1');
const options2 = document.querySelector('#options2');
const options3 = document.querySelector('#options3');
const options4 = document.querySelector('#options4');
const options5 = document.querySelector('#options5');

const bandas = [
    document.querySelector('#banda1'),
    document.querySelector('#banda2'),
    document.querySelector('#banda3'),
    document.querySelector('#multiplicador'),
    document.querySelector('#tolerancia'),
]

const optionsBanda1 = options1.children;
const optionsBanda2 = options2.children;
const optionsBanda3 = options3.children;
const optionsBanda4 = options4.children;
const optionsBanda5 = options5.children;
const bandasValues = [1, 0, 0, 1, 10];

let numBandas = 5;

const values = [
    {value: 0, multi: '1', multiValue: 1, tol: 'none', color: 'black', name: 'Negro'},
    {value: 1, multi: '10', multiValue: 10, tol: '±1%', color: 'brown', name: 'Marrón'},
    {value: 2, multi: '100', multiValue: 100, tol: '±2%', color: 'red', name: 'Rojo'},
    {value: 3, multi: '1k', multiValue: 1000, tol: '±0.05%', color: 'orange', name: 'Naranja'},
    {value: 4, multi: '10k', multiValue: 10000, tol: '±0.02%', color: 'yellow', name: 'Amarillo'},
    {value: 5, multi: '100k', multiValue: 100000, tol: '±0.5%', color: 'green', name: 'Verde'},
    {value: 6, multi: '1M', multiValue: 1000000, tol: '±0.25%', color: 'blue', name: 'Azul'},
    {value: 7, multi: '10M', multiValue: 10000000, tol: '±0.1%', color: 'violet', name: 'Violeta'},
    {value: 8, multi: '100M', multiValue: 100000000, tol: '±0.01%', color: 'gray', name: 'Gris'},
    {value: 9, multi: '1G', multiValue: 1000000000, tol: '', color: 'white', name: 'Blanco'},
    {value: 10, multi: '0.1', multiValue: 0.1, tol: '±5%', color: 'gold', name: 'Oro'},
    {value: 11, multi: '0.01', multiValue: 0.01, tol: '±10%', color: 'silver', name: 'Plata'},
    {value: 12, multi: '', multiValue: 0, tol: '±20%', color: 'default', name: 'Ninguno'},
    {value: 13, multi: '', multiValue: 0, tol: 'none', color: 'default', name: 'Ninguno'},
]

const pintarResistencia = () => {
    switch(numBandas){
        case 4:
            for(let i = 0; i < 5; i++){
                bandas[i].classList = "";
                bandas[i].classList.add('resistencia-elemento');
                if(i === 2){                                        
                    bandas[i].classList.add(values[bandasValues[i+1]].color);
                }
                else if(i === 3){                                        
                    bandas[i].classList.add('default');
                }
                else{
                    bandas[i].classList.add(values[bandasValues[i]].color);
                }
        
            }
            break;
        case 5:
            for(let i = 0; i < 5; i++){
                bandas[i].classList = "";
                bandas[i].classList.add('resistencia-elemento');
                bandas[i].classList.add(values[bandasValues[i]].color);
            }
            break; 
    }
}

const formatNumber = (num) => {
    const text = num.toString();
    let value = "";
    let contadorCifras = 0;
    let contadorDigitos = 0;
    
    for(let i = text.length-1; i>=0; i--){
        contadorDigitos++;
        if(i!== 0 && contadorDigitos===3){
            contadorCifras++;
            contadorDigitos=0;
        }
    }

    if(contadorCifras===0){
        return text;
    }

    for(let i = 0; i<contadorDigitos; i++){
        value+=text[i];
    }

    if(text[contadorDigitos] !== '0'){
        value+=('.'+text[contadorDigitos]);
    }

    switch(contadorCifras){
        case 1:
            value+='k';
            break;
        case 2:
            value+='M';
            break;
        case 3:
            value+='G';
            break;
    }

    return value;
} 

const calcularResistencia = () => {    
    let value = '';
    value += values[bandasValues[0]].value;
    value += values[bandasValues[1]].value;
    if(numBandas > 4){
        value += values[bandasValues[2]].value;
    }

    let numericValue = parseInt(value);

    numericValue*=values[bandasValues[3]].multiValue;
    const tolerancia = values[bandasValues[4]].tol;

    resistenciaValue.innerHTML = `${formatNumber(numericValue)}Ω  ${tolerancia}`
    //console.log(formatNumber(numericValue), 'Ω ', tolerancia)
}

const cambiarOpcionBanda = (event, index, banda) => {
    //console.log(index);
    //options1.classList.toggle('active');

    optionsSelected[banda-1].querySelector('.option-item').classList.replace(values[bandasValues[banda-1]].color, values[index].color);
    optionsSelected[banda-1].querySelector('.option-title').innerHTML = values[index].name;
    optionsSelected[banda-1].querySelector('.option-value').innerHTML = values[index].value;

    bandasValues[banda-1] = index;
    pintarResistencia();
    calcularResistencia();
}

const cambiarMultiplicador = (event, index) => {
    optionSelectedMulti.querySelector('.option-item').classList.replace(values[bandasValues[3]].color, values[index].color);
    optionSelectedMulti.querySelector('.option-title').innerHTML = values[index].name;
    optionSelectedMulti.querySelector('.option-value').innerHTML = values[index].multi;

    console.log('multi', index)
    bandasValues[3] = index;
    pintarResistencia();
    calcularResistencia();
}

const cambiarTolerancia = (event, index) => {
    if(index>=9)
        index++;
    optionSelectedTol.querySelector('.option-item').classList.replace(values[bandasValues[4]].color, values[index].color);
    optionSelectedTol.querySelector('.option-title').innerHTML = values[index].name;
    optionSelectedTol.querySelector('.option-value').innerHTML = values[index].tol;

    console.log('tol', index);
    bandasValues[4] = index;
    console.log(bandasValues)
    pintarResistencia();
    calcularResistencia();
}

const numBandasSelected = () => {
    const index = selectorBandas.selectedIndex;
    switch(index){
        case 0:
            numBandas = 4;
            banda3.style.display = "none";
            break;
        case 1:
            numBandas = 5;
            banda3.style.display = "grid";
            break;
    }
}

optionSelectedBanda1.addEventListener('click', (event) => {
    options1.classList.toggle('active');
    options2.classList.remove('active');
    options3.classList.remove('active');
    options4.classList.remove('active');
    options5.classList.remove('active');

    event.stopPropagation();
});

optionSelectedBanda2.addEventListener('click', (event) => {
    options2.classList.toggle('active');
    options1.classList.remove('active');
    options3.classList.remove('active');
    options4.classList.remove('active');
    options5.classList.remove('active');

    event.stopPropagation();
});

optionSelectedBanda3.addEventListener('click', (event) => {
    options3.classList.toggle('active');
    options1.classList.remove('active');
    options2.classList.remove('active');
    options4.classList.remove('active');
    options5.classList.remove('active');

    event.stopPropagation();
});

optionSelectedMulti.addEventListener('click', (event) => {
    options4.classList.toggle('active');
    options1.classList.remove('active');
    options2.classList.remove('active');
    options3.classList.remove('active');
    options5.classList.remove('active');

    event.stopPropagation();
});

optionSelectedTol.addEventListener('click', (event) => {
    options5.classList.toggle('active');
    options1.classList.remove('active');
    options2.classList.remove('active');
    options3.classList.remove('active');
    options4.classList.remove('active');

    event.stopPropagation();
});

selectorBandas.addEventListener("change", (event) => {
    numBandasSelected();
    calcularResistencia();
    pintarResistencia();
})

document.body.addEventListener('click',() => {
    options1.classList.remove('active');
    options2.classList.remove('active');
    options3.classList.remove('active');
    options4.classList.remove('active');
    options5.classList.remove('active');
})



for (let i = 0; i < optionsBanda1.length; i++) {
    optionsBanda1[i].addEventListener('click',(event) => cambiarOpcionBanda(event, i+1, 1))
}

for (let i = 0; i < optionsBanda2.length; i++) {
    optionsBanda2[i].addEventListener('click',(event) => cambiarOpcionBanda(event, i, 2))
}

for (let i = 0; i < optionsBanda3.length; i++) {
    optionsBanda3[i].addEventListener('click',(event) => cambiarOpcionBanda(event, i, 3))
}

for (let i = 0; i < optionsBanda4.length; i++) {
    optionsBanda4[i].addEventListener('click',(event) => cambiarMultiplicador(event, i))
}

for (let i = 0; i < optionsBanda5.length; i++) {
    optionsBanda5[i].addEventListener('click',(event) => cambiarTolerancia(event, i+1))
}

numBandasSelected();
pintarResistencia();
calcularResistencia();
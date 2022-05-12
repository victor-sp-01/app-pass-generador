//valores_encerrados:
const generador = {
    letras_minuscululas : 'abcdefghijklmnopqrstuvwxyz',
    letras_mayusculas   : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numeros             : '0123456789',
    caracteres          : '({[@/¡?¿!]})'
}
const generadori = { 
    letra   : generador.letras_minuscululas.length ,
    numero  : generador.numeros.length,
    caracter: generador.caracteres.length,
    aleario : 0
}

const valores = {
    contador            : 0,
    palabra_final       : '',
    palabra_aleatorio   : [],
    copiar              : false,
    tiempo              : ''
}

const formulario = document.getElementById('frm_generador');
formulario.addEventListener('click', (e)=>{
    if(e.target && e.target.tagName === 'INPUT' && e.target.className === 'ipt_generador_itm copy')    { generador_copiar(); }
    if(e.target && e.target.tagName === 'INPUT' && e.target.className === 'ipt_generador_itm slt')    { validar_generador(); }
    if(e.target && e.target.tagName === 'BUTTON' && e.target.className === 'btn_generador_itm change')  { e.preventDefault(); validar_generador(); }
    if(e.target && e.target.tagName === 'BUTTON' && e.target.className === 'btn_generador_itm copy')    { e.preventDefault(); generador_copiar(); } 
})

formulario.ipt_rango.addEventListener('input', ()=>{ span_cantidad.innerText = ipt_rango.value; validar_generador(); })


//funciones:
const validar_generador =()=>{
    if  ((!formulario.ipt_mayusculas.checked) && (!formulario.ipt_minusculas.checked) &&
        (!formulario.ipt_numeros.checked) && (!formulario.ipt_caracteres.checked)){ return }
    else{ 
        if(formulario.ipt_rango.value < 4){ formulario.ipt_rango.value = 4 }
        else if(formulario.ipt_rango.value > 40){ formulario.ipt_rango.value = 40 }          
    }
    generador_aleatorio();
}

const generador_copiar = () =>{ 
    formulario.ipt_generado_copy.select(); document.execCommand('copy'); 
    console.log('copiado')
}

const generador_aleatorio =()=>{
    while(valores.contador < formulario.ipt_rango.value){
        let letra_i                 = generador.letras_mayusculas[Math.floor(Math.random()*generadori.letra)];
        let letra_ii                = generador.letras_minuscululas[Math.floor(Math.random()*generadori.letra)];
        let numero_i                = generador.numeros[Math.floor(Math.random()*generadori.numero)];
        let caracter_i              = generador.caracteres[Math.floor(Math.random()*generadori.caracter)];
        
        if(formulario.ipt_mayusculas.checked)  { valores.palabra_aleatorio.push(letra_i); }
        if(formulario.ipt_minusculas.checked) { valores.palabra_aleatorio.push(letra_ii); }
        if(formulario.ipt_numeros.checked)   { valores.palabra_aleatorio.push(numero_i); }
        if(formulario.ipt_caracteres.checked) { valores.palabra_aleatorio.push(caracter_i); }

        generadori.aleario = valores.palabra_aleatorio.length;
        valores.palabra_final +=valores.palabra_aleatorio[Math.floor(Math.random()*generadori.aleario)];
        valores.palabra_aleatorio   = []; valores.contador+=1;        
    }
    restablecer_valores();   
}

const restablecer_valores =()=>{
    valores.contador = 0;
    formulario.ipt_generado_copy.value = valores.palabra_final ; valores.palabra_final  = '' ;
    span_cantidad.innerText = formulario.ipt_rango.value; 
}

validar_generador();


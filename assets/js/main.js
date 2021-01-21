button = document.getElementById('button');
button.addEventListener('click', validateForm);

let nameFunc = document.querySelector('#name');
let cpf = document.querySelector('#cpf');
let rg = document.querySelector('#rg');
let dataNasc = document.querySelector('#datanasc');
let estCivil = document.querySelector('#est-civil');
let cep = document.querySelector('#cep');
let address = document.querySelector('#endereco');
let neighborhood = document.querySelector('#bairro');
let city = document.querySelector('#cidade');
let state = document.querySelector('#estado');
let number = document.querySelector('#numero');
let complement = document.querySelector('#complemento');

/*CNH*/
function getMarked() {
    var listMarked = document.getElementsByClassName('checkbox');
    for (i = 0; i < listMarked.length; i++) {
        var item = listMarked[i];
        if (item.checked) {

            console.log(item.name);

        }
    }
}

function clearInput() {
    nameFunc.value = '';
    cpf.value = '';
    rg.value = '';
    dataNasc.value = '';
    estCivil.value = '';
    address.value = '';
    neighborhood.value = '';
    city.value = '';
    state.value = '';
    number.value = '';
    complement.value = '';

    nameFunc.focus();//Foco ficar no primeiro campo de cadastro!

    return;
}

cpf.addEventListener('focusout', function validateCPF() {
    let cpf = document.querySelector('#cpf');
    let cpfValid = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
    if (cpfValid.test(cpf.value) == false) {
        alert('CPF Inválido');
    }
    
});

function maskCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}


cpf.setAttribute('onkeydown', 'fMasc(this, maskCPF)');
function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout('fMascEx()', 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

rg.addEventListener('focusout', function validateRg() {
    let rg = document.querySelector('#rg').value;
    if (rg.length === 12) {
        alert('RG Válido!')
    } else {
        alert('RG Inválido!')
    }
});

function validateCep() {
    let cep = document.querySelector('#cep').value;

    if (cep.length === 9) {
        alert('CEP Válido!')
    } else {
        alert('CEP Inválido!')
    }
}

function mascara(t, mask){
    var i = t.value.length;
    var saida = mask.substring(1,0);
    var texto = mask.substring(i)
    if (texto.substring(0,1) != saida){
    t.value += texto.substring(0,1);
    }
    }

function validateForm() {
    let nameFunc = document.querySelector('#name').value;
    if (nameFunc === '') {
        alert('Preencha o campo Nome do Funcionário.');
        nameFunc.focus();
        return false;
    }

    let cpf = document.querySelector('#cpf').value;
    if (cpf ==='') {
        alert('Preencha o campo CPF');
        cpf.focus();
        return false;
    }


    let rg = document.querySelector('#rg').value;
    if (rg === '') {
        alert('Preencha o campo RG');
        rg.focus();
        return false;
    }

    let dataNasc = document.querySelector('#datanasc').value;
    if (dataNasc === '') {
        alert('Preencha o campo data de Nascimento');
        dataNasc.focus();
        return false;
    }

    let cep = document.querySelector('#cep').value;
    if (cep === '') {
        alert('Preencha o campo CEP');
        cep.focus();
        return false;
    }

    let address = document.querySelector('#endereco').value;
    if (address === '') {
        alert('Preencha o campo Endereço');
        address.focus();
        return false;
    }

    let neighborhood = document.querySelector('#bairro').value;
    if (neighborhood === '') {
        alert('Preencha o campo Bairro');
        neighborhood.focus();
        return false;
    }

    let city = document.querySelector('#cidade').value;
    if (city === '') {
        alert('Preencha o campo Cidade');
        city.focus();
        return false;
    }

    let state = document.querySelector('#estado').value;
    if (state === '') {
        alert('Preencha o campo Estado');
        state.focus();
        return false;
    }

    let number = document.querySelector('#numero').value;
    if (number === '') {
        alert('Preencha o campo Número');
        number.focus();
        return false;
    }

const fields = {
    "nome": document.querySelector('#name').value,
    "cpf": document.querySelector('#cpf').value,
    "rg": document.querySelector('#rg').value,
    "dataNasc": document.querySelector('#datanasc').value,
    "estCivil": document.querySelector('#est-civil').value,
    "cep": document.querySelector('#cep').value,
    "address": document.querySelector('#endereco').value,
    "neighborhood": document.querySelector('#bairro').value,
    "city": document.querySelector('#cidade').value,
    "state": document.querySelector('#estado').value,
    "number": document.querySelector('#numero').value,
    "complement": document.querySelector('#complemento').value
};

console.log(fields);

const objetojson = JSON.stringify(fields)

console.log(objetojson);

const xhr = new XMLHttpRequest();

xhr.open("POST", "https://beginner-api.herokuapp.com/save");

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
        const objetosalvo = JSON.parse(xhr.responseText);
        if (objetosalvo.Sucesso != undefined) {
            alert("Cadastro Efetuado!");
        } else {
            alert("Erro de Formulário!");
        }
    }
}
xhr.send(objetojson);
    
}

/* Get CEP */
cepG =  document.querySelector('#cep').value;

function getDataAddressCEP(cepG) {

let xhr = new XMLHttpRequest()

let url = 'https://viacep.com.br/ws/' + cepG + '/json/unicode/'

xhr.open('GET', url, true)

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            let dadosJSONText = xhr.responseText
            let dadosJSONObj = JSON.parse(dadosJSONText)

            document.getElementById('endereco').value = dadosJSONObj.logradouro
            document.getElementById('bairro').value = dadosJSONObj.bairro
            document.getElementById('cidade').value = dadosJSONObj.localidade
            document.getElementById('estado').value = dadosJSONObj.uf
        }
    }
}
xhr.send();
}
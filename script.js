const inputRange = document.querySelector('.len')
const charLen = document.querySelector('.pass-len h2')
const input = document.querySelector('form.options')
const bars = document.querySelectorAll('.status-bar')
const generateBtn = document.querySelector('.btn')
const copyBtn = document.getElementById("copy")
let passLength = 8;
let lower = false
let upper = false
let numbers = false
let symbols = false
inputRange.addEventListener('input', (e)=>{
    charLen.innerText = e.target.value 
    passLength = e.target.value
})
let password = ''
generateBtn.addEventListener('click' , ()=>{
    const getrandChioce = () =>  shuffle(passChoices)[0]; 
    let pass = []
    if (!lower && !upper && !numbers && !symbols) {
        return
    }
    for (let index = 0; index < passLength; index++) {
            pass.push(choice(getrandChioce())())
    }
    password = pass.join('');
    document.querySelector('.pass div').innerHTML= `<p>${password}</p>`
})
copyBtn.addEventListener('click', ()=> {
    if (password === '') return
    navigator.clipboard.writeText(password);
    document.querySelector('.pass').classList.add('active')
    setTimeout(()=>document.querySelector('.pass').classList.remove('active'), 2000)
})
input.addEventListener('change' , checkInput)

let choices = new Set()
let passChoices = []
function checkInput() {
const lowerInput = document.getElementById('lower')
const upperInput = document.getElementById('upper')
const numbersInput = document.getElementById('numbers')
const symbolsInput = document.getElementById('symbols')
    if (lowerInput.checked) {
        lower = true
        choices.add(1)
    }
    else{
        lower = false
        choices.delete(1)
    } 
        
    if (upperInput.checked) {

        upper = true
        choices.add(2)

    }
    else{

        upper = false
        choices.delete(2)

    } 
        
    if (numbersInput.checked) {

        numbers = true
        choices.add(3)

    }
    else{

        numbers = false
        choices.delete(3)

    } 
    
        
    if (symbolsInput.checked) {

        symbols = true
        choices.add(4)

    }
    else{

        symbols = false
        choices.delete(4)

    } 
    passChoices = Array.from(choices)        
    activeBars()
}


function activeBars() {
    let idx = 0 ; 
    const options = document.querySelectorAll('.option input')
    options.forEach(i => {
        if (i.checked) {
            idx++;
        }        
    })
    let state = document.querySelector('.status-group span')
    switch (idx) {
        case 1:
            state.innerText = "WEAK"
            break;
        case 2:
            state.innerText = "OK"
            break;
        case 3:
            state.innerText = "MEDIUM"
            break;
        case 4:
            state.innerText = "STRONG"
            break;
        default:
            break;
    }
    bars.forEach(b => b.classList.remove('active'))
    for (let index = 0; index < idx ; index++) {
        bars[index].classList.add('active')
    }
    
}



const lowerLetters = "abcdefghijklmnopqrstuvwxyz"
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allnumbers = "123456789"
const allSymbols = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/"

function choice(num) {
    switch (num) {
        case 1:
        return generateLowers
        
        case 2:
        return generateUpper
        
        case 3:
        return generateNumbers
        
        case 4:
        return generateSymbols
        default:
            break;
    }
}

function generateLowers() {
    return shuffle(lowerLetters.split(''))[0]
}
function generateUpper() {
    return shuffle(upperLetters.split(''))[0]
}
function generateNumbers() {
    return shuffle(allnumbers.split(''))[0]
}
function generateSymbols() {
    return shuffle(allSymbols.split(''))[0]
}

function shuffle(els) {
    return els.sort((a, b) => 0.5 - Math.random())
}
let words = [
    {
        imgSrc:'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2013/August/130808/6C8560752-34628450-63ac-0450-b9d3-f4075ef2312b-bbs5b-gallery-0858-rgb-v1.jpg',
        word:'heisenberg'
    },
    {
        imgSrc:'https://upload.wikimedia.org/wikipedia/tr/c/c6/Jesse_Pinkman_S5B.png',
        word:'pinkman'
    }
]
let win = document.querySelector('.win-counter')
let lose = document.querySelector('.lose-counter')
let  guessesLeft = document.querySelector('.guesses-counter')
let guesses = document.querySelector('.guesses')
let wordDom = document.querySelector('.word')
let image = document.querySelector('.image')

function getRandomWord(){
    if(words.length > 0){
        let word = words[Math.floor(Math.random() * words.length)]
        return word
    }
    else{
        return false
    }
}
let word = getRandomWord()
function getLine(){
    let lines = '';
    if(words.length >0){
        for(i=0;i<word.word.length;i++){
            lines += '-'
        }
        return lines
    }
    else{
        return ""
    }
}
let lines = getLine()
console.log(word,getLine())
getDom=()=>{
    win.innerHTML = game.win;
    lose.innerHTML = game.lose;
    guessesLeft.innerHTML = game.guessesLeft;
    guesses.innerHTML = game.guesses
    wordDom.innerHTML = lines
    if(words.length === 0) {
        image.src ='https://pbs.twimg.com/media/BsD0g7lIAAA3xjI.jpg';
    }
    else{

        image.src = word.imgSrc
    }
}

const game = {
    word : word.word,
    src: word.imgSrc,
    win:0,
    lose:0,
    guessesLeft:13,
    guesses:[],
    getInfo:function(){
        this.word = word.word
        this.src = word.imgSrc
    },
    checkguess:function(letter){
        if(this.word.includes(letter)){
            lines = this.word.split('').map(item=>item === letter ? letter:!lines.includes(item)? '-':item).join('')
            if(lines===this.word){
                this.win += 1;
                this.guesses = [];
                this.guessesLeft = 13;
                words.splice(words.indexOf(word),1)
                word = getRandomWord()
                console.log(this.word)
                lines = getLine()
                this.getInfo()
            }
        }
        else{
            if(!this.guesses.includes(letter)){
                this.guesses.push(letter)
                this.guessesLeft -=1
                if(this.guessesLeft === 0){
                    this.lose +=1
                    this.guessesLeft = 13
                    lines = getLine()
                    this.guesses = [];
                }
            }
        }
    }
}
window.onkeyup = function(e){
    game.checkguess(e.key)
    getDom()
}
getDom()
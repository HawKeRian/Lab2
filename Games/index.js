
let n = Math.floor(Math.random()*100 +1)
var l = new Array()
document.querySelector('.button').addEventListener('click', () => {
    if(document.querySelector('.count').textContent >= 0){
        var ans = document.getElementById("answer").value;

        if(n == ans){
            document.querySelector('#check').textContent = 'YES! Good job!'
            document.getElementById("check").style.backgroundColor = "green";
            document.getElementById("img").style.backgroundImage = "url('https://safebooru.org//images/2372/5ed1c36aa92142181c6bf8806d34777ac69d4f93.jpg?2481361')";
            return this.escape
        }else if(n > ans){
            document.querySelector('#check').textContent = 'Nope! Too low!'
            document.getElementById("check").style.backgroundColor = "tomato";
            document.getElementById("img").style.backgroundImage = "url('https://i.pinimg.com/564x/2f/fa/de/2ffadeb707ecfc569235095f08193421.jpg')";
            // document.getElementById("img").style.backgroundPosition = "center bottom";
            // document.getElementById("img").style.backgroundSize = "auto";
        }else if(n < ans){
            document.querySelector('#check').textContent = 'Nope! Too high!'
            document.getElementById("check").style.backgroundColor = "tomato";
            document.getElementById("img").style.backgroundImage = "url('https://i.pinimg.com/564x/2f/fa/de/2ffadeb707ecfc569235095f08193421.jpg')";
            // document.getElementById("img").style.backgroundPosition = "center bottom";
            // document.getElementById("img").style.backgroundSize = "auto";
        }else {
            document.querySelector('.playerAns').textContent = 'Please input a number'
            return this.escape
        }

        if(document.querySelector('.count').textContent == 0 ) {
            document.querySelector('#check').textContent = 'Gameover!'
            document.getElementById("img").style.backgroundImage = "url('https://i.pinimg.com/564x/fc/6c/ce/fc6cceb9cef3ecdc17bb6e91dd8bc561.jpg')";
            throw new Error('Gamover!')        
        }
        document.querySelector('.count').textContent--
        l.push(ans);
        document.getElementById("last").innerHTML = "Last number: "+l;
        document.querySelector('.playerAns').textContent = "Your answer is [" +ans+ "] "

    }else return this.Error

})
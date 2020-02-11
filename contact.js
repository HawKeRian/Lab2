let firebaseConfig = {
    apiKey: "AIzaSyAWqBOlJVWfSJK1DKKp1PJhOuTjIpetHbk",
    authDomain: "localhost",
    projectId: "cpe-lab-4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let Male = 0;
let Fmale = 0;
let sumM =0;
let sumF=0;
let udf =0;
let sumU =0;


$('#save').on('click', () => {
    if($('#name').val() == ''){
        $('#name').focus()
        return this.Error}
    else if($('#messege').val() == ''){
        $('#messege').focus()
        return this.Error}

        const email = $('#email').val();
        //ASCII check
        const asciiCheck = (email.split('')).every((char)=>{ 
            return char.charCodeAt(0) >= 0 && char.charCodeAt(0) <= 127
        });
        if (!asciiCheck) return false;

        //Number of @ check
        function findAllElem(src, elem) {
            let result = [];
            for (i in src) {
                if (src[i] == elem) result.push(i);
            }
            return result;
        }        
        const atList = findAllElem(email,'@');
        if (atList.length != 1) return alert('your email is invalid!');



    db.collection("users").add({
        name: $('#name').val(),
        mail: $('#email').val(),
        gender: $('input[name="gender"]:checked').val(),
        messege: $('#messege').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#name').val('')
        $('#email').val('')
        $('#messege').val('')
        $('#gender').val('unknow')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    
})
$('#reset').on('click', () => {
    db.collection("users").add({
        name: $('#name').val(''),
        mail: $('#email').val(''),
        gender: $('input[name="gender"]:checked').val(''),
        messege: $('#messege').val(''),
    })
})


db.collection('users').orderBy('name').onSnapshot(doc => {
    let table = $('tbody')[0]
    // document.querySelectorAll("tbody tr").forEach(item => item.remove())
    console.log(doc.id)
    $('tbody tr').remove()
    Male = 0;
    Fmale = 0;
    udf = 0;
    sumM = 0;
    sumF = 0;
    sumU =0;


    doc.forEach(item => {
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)
        let fouthCell = row.insertCell(3)
        switch(item.data().gender){
            case 'male':
                Male++
                break;
            case 'female':
                Fmale++
                break;
            default:
                udf++
        }


        firstCell.textContent = item.data().name
        secondCell.textContent = censor(item.data().mail)
        thirdCell.textContent = item.data().gender
        // fouthCell.textContent = "DelBtn"
        let btn = $('<button class="btn btn-danger"><i class="fa fa-trash"></i></button>');
        btn.click( () => db.collection("users").doc(item.id).delete())
        btn.appendTo(fouthCell)

        sumM = ((Male/(Male+Fmale+udf))*100).toFixed(2)
        sumF = ((Fmale/(Male+Fmale+udf))*100).toFixed(2)
        sumU = ((udf/(Male+Fmale+udf))*100).toFixed(2)
        // myChart.data.datasets[0].data = [parseFloat(sumF),parseFloat(sumM),parseFloat(sumU)]
        myChart.data.datasets[0].data = [Fmale,Male,udf]
        myChart.update()


    })
    // if(gender =='undefined') {
    //     $('.male').text("Male: "+ '')
    //     $('.female').text("Female: "+ '')
    //     $('.udf').text("Undefined: "+ '')
    // }
    // else {
    //     $('.male').text("Male: " + sumM)
    //     $('.female').text("Female: " + sumF)
    //     $('.udf').text("Undefined: " + sumU)
    // }
})

function censor(email){
    let newEmail =''
    for(i=0; i< email.length; i++){
        if(email[i]=='@' || email[i]=='.' || i==0){
            newEmail += email[i]
        }else newEmail += 'x'
    }
    return newEmail
}

var myChart = new Chart($('#myChart'), {
    type: 'pie',
    data: {
        labels: ['Female', 'Male', 'Undefined'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: ['#FF3366','#336699','#C0C0C0'],
            borderColor: 'black',
            data: [0, 0, 0]
        }]
    },

    // Configuration options go here
    options: {}
});

// myChart.data.datasets[0].data = [parseInt(sumF),parseInt(sumM),parseInt(udf)]
// myChart.data.datasets[0].data = [Fmale,Male,udf]
// myChart.update()

console.log(myChart.data.datasets)
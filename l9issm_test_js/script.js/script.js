//recuperer les elements
const refInput=document.getElementById("refInput")//n9der nder doc.queryselectoor('#refinput') bjuj khedamin hadi w geteltbyid
const intituleInput=document.getElementById("intituleInput")
const prixInput=document.getElementById("prixInput")
const effacerBtn=document.getElementById("effacerBtn")
const ajouterBtn=document.getElementById("ajouterBtn")
const tbody=document.getElementById("tbody")

//fonctions
//creer fct qui accepte en param un produit et le rajoute dans le tbody

//let produit={ref:'c01',intitule:'souris',prix:20}//object hit produit endu bzadf d mealoumat fih
//addProduct(produit)
//let produit2={ref:'c02',intitule:'clavier',prix:60}
//addProduct(produit2)
//let produit3={ref:'c03',intitule:'pc',prix:2000}
//addProduct(produit3)

const effacer=()=>{
    refInput.value=""//les input kanderou value mashy innertext wla innerhtml sf effacer sahla atakhed kula input w t3ewdou b khewya
    intituleInput.value=""
    prixInput.value=""
}
effacerBtn.addEventListener("click",()=>effacer())

const ajouter=()=>{
    //RéCUPéRER LES VALEURS
    let ref= refInput.value//khdina lvalue d kula input 
    let intitule=intituleInput.value
    let prix=prixInput.value
    //VéRIFIEZ LES VALEURS
    if(!ref||!intitule||!prix){
        return alert("Veuillez Remplire les champs")
    }
    //remplir produit par ces valeurs
    let produit={ref:ref,intitule:intitule,prix:prix}
    let data=JSON.stringify(produit)//produit en objet json
    //send data todb_js.json
    let xhr=new XMLHttpRequest()
    xhr.open("post","http://localhost:3000/gestion",true)
    //open true+headers+handleresponse(evtlistenerload),send(data) te7t event listener hadshy f post f get open+eventlistener load+send
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.addEventListener("load",()=> {
        console.log('Response Status:', xhr.status);
    if (xhr.status === 201 && xhr.readyState === 4) {//kanteste b200(ok) f get w 201(created) f post dik 4 donc req dzaet(2) tprocessat(3) w salat(4) 
        console.log('Response Text:', xhr.responseText);
       }
       else  {alert('Error')}


      //retrieve data khassha tkun nefs eventlistener dyal post
      let getxhr=new XMLHttpRequest() //new xhr for get bash tsena post taaa tsali
      getxhr.open("get","http://localhost:3000/gestion",true)
      getxhr.addEventListener("load",()=>{
        if(getxhr.status!=200)
       return alert("error")
    console.log(getxhr.status)
    console.log('response:',getxhr.response)
       let getdata=JSON.parse(getxhr.response)
       getdata.forEach(getd => {
        const tr=document.createElement("tr")
        const td2=document.createElement("td")
        const td3=document.createElement("td")
        const td4=document.createElement("td")
        const td5=document.createElement("button")

        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)

        let ref=getd.ref//object distracting
        let intitule=getd.intitule
        let prix=getd.prix
     
        td2.innerText = ref;
        td3.innerText = intitule;
        td4.innerText = prix;
        td5.innerText = 'X';

        td5.addEventListener("click",()=>tr.remove())

        tbody.appendChild(tr)

        
    })
    })
    getxhr.send()
      //fin retreive data
    })
    xhr.send(data)//fget kndirou ghe send db hit post passena shnou anpostew ldakhel

    

    
    effacer()//ghe nclicker ajouter aytmse7 òformulaire witajouta f tableau
    
}
ajouterBtn.addEventListener("click",()=>ajouter())
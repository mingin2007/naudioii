window.onload = ()=>{
var elem = document.getElementById("file-select");

elem.onchange = (evt)=>{
    console.log(evt.target.selectedIndex);
    
}


}
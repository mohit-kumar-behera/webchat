const d = document;
const copyBtn = d.getElementsByClassName("copy-btn")[0];
const classID = d.getElementById("c__class_id");
const copyIcon = d.getElementsByClassName("copy-icon")[0];
copyBtn.onclick = function() {
    uniqueID = classID.getAttribute("value");
    navigator.clipboard.writeText(uniqueID).then(function(){
        classID.select();
        copyIcon.classList.remove("fa-clipboard");
        copyIcon.classList.add("fa-check")
        setTimeout(function(){
            copyIcon.classList.remove("fa-check");
            copyIcon.classList.add("fa-clipboard");
        },1000)
    })
}
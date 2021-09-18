window.onload = initPage;


function initPage(){
    let thumbnailPaneElements = document.getElementById("thumbnailPane").querySelectorAll('.img')
    let itemDetail = document.getElementById("itemDetail")
    thumbnailPaneElements.forEach(element => {
        element.addEventListener("click",()=>{
            itemDetail.setAttribute("src",element.getAttribute('src'));
            item = element.getAttribute('src').split('/')[1].split('.')[0]
            getDetails(item);
        })
    });
}

function createRequest(){
    try{
        request = new XMLHttpRequest();
    } catch (tryMS){
        try{
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(otherMS){
            try{
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(failed){
                request = null;
            } 
        }
        }
    return request;
    }
function getDetails(itemName){
    request = createRequest();
    if (request === null){
        alert("unable to create request");
        return;
    }
    
    var url = "getDetails.php?ImageID="+escape(itemName)

    request.open("GET",url,true);
    request.onreadystatechange = displayDetails;
    request.send(null);
}

function displayDetails(){
    if (request.readyState == 4){
        if(request.status == 200) {
            detailDiv = document.getElementById("description");
            detailDiv.innerHTML = request.responseText;
        }
    }
}

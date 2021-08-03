var imagePoss = []

var images = [
	document.getElementById("clickImage1"),
	document.getElementById("clickImage2"),
	document.getElementById("clickImage3"),
	document.getElementById("clickImage4"),
	document.getElementById("clickImage5")
]

var inventory = [
	document.getElementById("inv1"),
	document.getElementById("inv2"),
	document.getElementById("inv3"),
	document.getElementById("inv4"),
	document.getElementById("inv5")
]

//create an empty array
var imageClicked = new Array(5);

//populate with false boolean values
for(i = 0; i < imageClicked.length; i++){
	imageClicked[i] = false;
}

//pull buttons into the script
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");

//Getting the width of the page
var windowWidth = window.innerWidth;

//functions	

function randomizePosition(){
	var background = document.getElementById("background");
	var backgroundPostion = background.getBoundingClientRect();

	for(z = 0; z < 5; z++){

		var picture = images[z];
		var picturePosition = picture.getBoundingClientRect();
		var x = Math.floor(Math.random()*(backgroundPostion.width-picturePosition.width));
		var y = Math.floor(Math.random()*(backgroundPostion.height-picturePosition.height));

		while(x < picturePosition.width/1.8){
			x = Math.floor(Math.random()*(backgroundPostion.width-picturePosition.width));
		}
		while(y < picturePosition.height/1.5){
			y = Math.floor(Math.random()*(backgroundPostion.height-picturePosition.height));
		}
		if(!isOverlap(x,y)){
			picture.style.top = y + 'px';
			picture.style.left = x + 'px';
			imagePoss.push({x, y});
			console.log(imagePoss);
		}
		else{
			while(!isOverlap(x,y)){
				while(x < picturePosition.width/1.8){
					x = Math.floor(Math.random()*(backgroundPostion.width-picturePosition.width));
				}
				while(y < picturePosition.height/1.5){
					y = Math.floor(Math.random()*(backgroundPostion.height-picturePosition.height));
				}
			}
		}
	}
}

// return true if overlapping
function isOverlap(x, y) { 
    var img = {x: images[0].getBoundingClientRect().width, y: images[0].getBoundingClientRect().height};
    
    for(var imgPos of imagePoss) {
        if( x>imgPos.x-img.x && x<imgPos.x+img.x &&
            y>imgPos.y-img.y && y<imgPos.y+img.y ) return true;
        console.log(imgPos)
    }
    return false;
}

//takes Object Image ID, Inventory Image ID, and an int representing a position on the image clicked boolean array

function clickImage(imgID,invID,imgClick){

	console.log(imgID + " clicked");
	document.getElementById(imgID).style.border = "10px solid #00a4e4";
	document.getElementById(imgID).style.borderRadius = "10px";
	document.getElementById(invID).style.filter = "brightness(1)";
	imageClicked[imgClick] = true;
	console.log([imgClick]);

};

function check(){
	document.getElementById("checkImageAlert").style.display = "unset";
	if(imageClicked.includes(false)){
		//Set text to still looking
		document.getElementById("gameLoseText").style.display = "block";
		document.getElementById("gameWinText").style.display = "none";
	}
	else{
		//Set text to game win
		document.getElementById("gameLoseText").style.display = "none";
		document.getElementById("gameWinText").style.display = "block";
	}
}

function checkImageAlertDismiss() {
	document.getElementById("checkImageAlert").style.display = "none";
}

function reset(){
	imagePoss = []
	for(i = 0; i < imageClicked.length; i++){
		imageClicked[i] = false;
		images[i].style.border ="";
		images[i].style.borderRadius ="";
		inventory[i].style.filter = "brightness(0)";
	}
	randomizePosition();
}

 function setImage(newImage, imgID, invID){
 	document.getElementById(imgID).src = newImage;
 	document.getElementById(invID).src = newImage;

 }

 function setBackground(newImage, imgID){
 	document.getElementById(imgID).src = newImage;
 }

function resize() {
	var newWindowWidth = window.innerWidth;
	var percentageChange = (windowWidth/newWindowWidth);

	for(x = 0; x < 5; x++){
		var picture = images[x];
		var picturePosition = picture.getBoundingClientRect();
		console.log(percentageChange);
		picture.style.top = parseInt(picture.style.top) / percentageChange + 'px';
		picture.style.left = parseInt(picture.style.left) / percentageChange + 'px';
	}
	windowWidth = window.innerWidth;
}

var resizeTimer;

window.addEventListener("resize", function() {
    
    clearTimeout(resizeTimer);
    
    resizeTimer = setTimeout(resize, 1);
});
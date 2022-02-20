alert("this is an updated content script");

chrome.runtime.onMessage.addListener((message) => {
    const image = document.createElement('img');
    image.src = message.imageUri;
    image.style.width = 100;
    document.body.appendChild(image);
});

//from: https://jsfiddle.net/artk7b4g/
const rectangle = document.createElement("div");
rectangle.style.position = "absolute";
//rectangle.style.backgroundColor = "";
rectangle.style.border = "1px dashed black";
document.body.appendChild(rectangle);

let isDragged = false;
let rectangleCoords = [];

const clearRectangleCoords = () => {
	rectangleCoords = [];
};

const addFirstRectangleCoords = coords => {
	rectangleCoords[0] = coords;
};

const addSecondRectangleCoords = coords => {
	rectangleCoords[1] = coords;
};

const redrawRectangle = () => {
	const top = Math.min(rectangleCoords[0].y, rectangleCoords[1].y);
	const height = Math.max(rectangleCoords[0].y, rectangleCoords[1].y) - top;
	const left = Math.min(rectangleCoords[0].x, rectangleCoords[1].x);
	const width = Math.max(rectangleCoords[0].x, rectangleCoords[1].x) - left;
  rectangle.style.top = top + "px";
  rectangle.style.height = height + "px";
  rectangle.style.left = left + "px";
  rectangle.style.width = width + "px";
};

window.addEventListener("mousedown", e => {
	isDragged = true;
  clearRectangleCoords();
  addFirstRectangleCoords({x: e.pageX, y: e.pageY});
  addSecondRectangleCoords({x: e.pageX, y: e.pageY});
  redrawRectangle();
});

window.addEventListener("mousemove", e => {
	if (isDragged) {
  	addSecondRectangleCoords({x: e.pageX, y: e.pageY});
  	redrawRectangle();
  }
});

window.addEventListener("mouseup", e => {
	if (isDragged) {
    addSecondRectangleCoords({x: e.pageX, y: e.pageY});
    redrawRectangle();
		isDragged = false;
  }
});
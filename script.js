let filters = [
  {
    name: "Brightness",
    value: 100,
    max: 200,
    min: 0,
    unit: "%",
  },
  {
    name: "Contrast",
    value: 100,
    max: 200,
    min: 0,
    unit: "%",
  },
  {
    name: "Saturation",
    value: 100,
    max: 200,
    min: 0,
    unit: "%",
  },
  {
    name: "Hue Rotation",
    value: 0,
    max: 200,
    min: 0,
    unit: "deg",
  },
  {
    name: "Blur",
    value: 0,
    max: 200,
    min: 0,
    unit: "px",
  },
  {
    name: "Grayscale",
    value: 0,
    max: 200,
    min: 0,
    unit: "%",
  },
  {
    name: "Sepia",
    value: 0,
    max: 200,
    min: 0,
    unit: "%",
  },
  {
    name: "Opacity",
    value: 100,
    max: 100,
    min: 0,
    unit: "%",
  },
  {
    name: "Invert",
    value: 0,
    max: 200,
    min: 0,
    unit: "%",
  },
];
let defaultFilters = filters.map(f=>({...f}));
let right = document.querySelector(".right");
let imgInput = document.querySelector("#img-inp");
let canvas = document.querySelector(".imgCanvas");
const ctx = canvas.getContext("2d");
let placeHolder = document.querySelector(".plc");
let reset = document.querySelector(".rst-btn");
let download = document.querySelector(".dwn-btn");

let currentImage = null;

function createFilters() {
  filters.forEach(function (filter) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("filter");
    let name = document.createElement("p");
    name.textContent = filter.name;
    let input = document.createElement("input");
    input.type = "Range";
    input.name = filter.name;
    input.value = filter.value;
    input.min = filter.min;
    input.max = filter.max;

    newDiv.appendChild(name);
    newDiv.appendChild(input);
    right.appendChild(newDiv);
  });
}
createFilters();

imgInput.addEventListener("change", function (e) {
  file = e.target.files[0];

  placeHolder.style.display = "none";
  canvas.style.display = "block";

  let img = new Image();
  img.src = URL.createObjectURL(file);

  currentImage = img;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage();

    URL.revokeObjectURL(img.src);
  };
});

function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.filter = `
    brightness(${filters[0].value}%)
    contrast(${filters[1].value}%)
    saturate(${filters[2].value}%)
    hue-rotate(${filters[3].value}deg)
    blur(${filters[4].value}px)
    grayscale(${filters[5].value}%)
    sepia(${filters[6].value}%)
    opacity(${filters[7].value}%)
    invert(${filters[8].value}%)
    `;

  ctx.drawImage(currentImage, 0, 0);
}

right.addEventListener('input',function(e){
    if(e.target.type!=="range") return;

    const filter = filters.find(f=> f.name === e.target.name);
    filter.value = e.target.value;

    drawImage();

});

reset.addEventListener('click',function(){
    filters.forEach((filter,index)=>{
      filter.value=defaultFilters[index].value;
      
    })

    document.querySelectorAll(".filter input").forEach((input,index)=>{
      input.value=defaultFilters[index].value;
    })

    drawImage();
});

function downloadImage(){
  let imageURL = canvas.toDataURL("image/png");
  let link = document.createElement("a");
  link.href = imageURL;
  link.download = "edited-image.png";
  link.click();
}
download.addEventListener('click',function(){
  downloadImage();
})
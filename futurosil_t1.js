
// COLOR BUTTON, BACKGROUND, HOVER, SELECTED //
var colorGUIBackground = [29,29,29]
var colorCanvasBackground =[202,202,202]
var colorButtons =[44,44,44]
var colorButtonsHover =[66,66,68]
var colorButtonsSelected =[61, 125, 254]

//RDCA RATES
var grid;
var next;
var feed = 0.18;
var k = 0.0001;
var t = 1;
var pA = 50;
var n;
var dt = 0.01;
var kt = 0.00001;
var text04;
var dt = 0.001;
var kfmap = [0.00429,0.01448];
var kRate = [0.0001,0.001];
var fRate = [0.001,0.18];

// RENDER SETTINGS //
var SubEx = [];
var circleArray = []
let cubes = [];
var w = 100;
var size = 12
var widthC = 720;
var W = widthC/size + 1;
var f = 0
var radiusPosition = 10;

//Convolution Matrix
var matrixCon = [
  [0.05, 0.2, 0.05],
  [0.2,  -1, 0.2],
  [0.05, 0.2, 0.05]
];
//Postion Convilution Matrix
var matrixNew = [
  [{x: -1, y: -1}, {x: 0, y: -1}, {x: +1, y: -1}],
  [{x: -1, y: 0},  {x: 0, y: 0}, {x: +1, y: 0}],
  [{x: -1, y: +1}, {x: 0, y: +1}, {x: +1, y: +1}]
];

// CUSTOM VARIABLES
var exportGrid = [];
var exportPy = [];
var button;
var reactivness = false;
var nreactivness = true;
var colorPickerMain;
let animationCanvas;
let displayCanvas;
let circleX;
let framesToSave = 1000;
let savedFrames = 0;
let frameArray = [];
var startAnimation = false;
var activation = true;
var mainCanvas = true;
var sizeSelection;
var matrixsize = 3;
var choice = 1;
var sorty = 0;

//GRAPH Substances
p5.disableFriendlyErrors = true;
mainCanvas = true;


// BEGGINING//
d3.selectAll("body").style("background-color","rgb("+colorCanvasBackground+")")

// MAIN FUTUROSIL SKETCH //
var MainCanvasSketch = function(p){
  p.setup = function(){
    p.noLoop();
    ///////////////////////////////// PREPARATION ///////////////////////////////////
    content.unshift({D:1,R:0}) //Remove the first element from system
    
    //CANVAS//
    animationCanvas = p.createCanvas(widthC,widthC);
    animationCanvas.style("border-style","solid")
    animationCanvas.style("border-color","rgb("+colorButtons+")")
    animationCanvas.style("border-radius","25px")
    animationCanvas.parent("Test");
    //Main-Buttons
    button2 = p.createButton("play_arrow").class("material-symbols-outlined").parent("MB essentials")
    button2.mouseClicked(p.NoLooping)
    button2 = document.getElementById("CloseButton")
    button2.addEventListener("click", p.NoLooping)
    button2 = document.getElementById("XButton")
    button2.addEventListener("click", p.NoLooping)
    button2 = document.getElementById("TutorialButtonMainMenu")
    button2.addEventListener("click", p.NoLooping)

    button = p.createButton("SAVE").class("TextButtons").parent("MB essentials")
    button.mousePressed(mouseNew)

    //button1 = p.createButton("react").parent("ModelGui 0system")
    // button1.mouseClicked(Reactivate)

    //DENSITY-BUTTON
    sizeSelection = p.createSelect().attribute("id","Density").parent("ModelGui 0system")
    colorPickerMain = p.createDiv().id("Swatchy").class("SwatchyGlobal").parent("ModelGui 0system")
    colorPickerMain  = p.createP("#FFFFFF").id("SwatchyName").class("NameSwatchyGlobal").parent("Swatchy")
    colorPickerMain = p.createColorPicker("rgb(0,0,0)").parent("Swatchy").attribute("class","mColor")


    var mySelect = document.getElementById('Density')
    mySelect.addEventListener('change', function () {
    var selectedValue = mySelect.value;
    localStorage.setItem('Density', selectedValue);
    window.location.reload()
    });
    
   window.onload = (event) => {
      console.log("page is fully loaded");
      if (!('hasCodeRunBefore' in localStorage)) {
        localStorage.setItem('Density', 10);
        console.log("HALO")
        d = d+1;
        localStorage.setItem("hasCodeRunBefore", true);
    }else{console.log("WRONG")}
    };
    window.onload() 
    
    sizeSelection.option(16)
    sizeSelection.option(10)
    sizeSelection.option(8)
    sizeSelection.option(5)
    sizeSelection.option(4)
    sizeSelection.option(2)
    sizeSelection.selected(localStorage.getItem('Density'))
     
    size = Number(sizeSelection.selected());

    //STYLING-BUTTON
    var buttons = p.selectAll("button")
    buttons.forEach(function(btn){
        btn.style("background-color","rgb("+colorButtons+")")
        .style("color","white")
        .style("border-style","none")
        .style("border-bottom-style","solid")
        .style("border-width","0.5px")
        .style("border-radius","5px")
        .style("border-color","rgb("+colorButtonsHover+")")
        .style("padding","5px")
        .style("margin-left","10px")
        btn.mouseOver(function(){
          var check = this.style("background-color")
          check = check.replace(" ","")
          check = check.replace(" ","")
          if (check == "rgb("+colorButtonsSelected+")"){
          } else if ((check != "rgb("+colorButtonsSelected+")")){
            this.style("background-color","rgb("+colorButtonsHover+")")
          }
        })
        btn.mouseOut(function(){
        var check = this.style("background-color")
        check = check.replace(" ","")
        check = check.replace(" ","")
        if(check == "rgb("+colorButtonsSelected+")"){
         // console.log("TRUE TRUE")
        } else if ((check != "rgb("+colorButtonsSelected+")")) {
          this.style("background-color","rgb("+colorButtons+")")
        }
        })
      })

    //COLOR-PICKERS
    colorPickerMain.style("border-width","1px")
                    .style("border-radius","50px")
                    .style("width","30px")
                    .style("height","30px")
                    .style("margin-left","10px")
                    .style("padding","none")
    
    
    //////////////////////// MAIN PROGRAM ///////////////////////////////
    grid  = [];
    next  = [];
    console.log(content)
    for  (var x = 0; x<p.width; x=x+size){
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y<p.height; y=y+size){
          grid [x][y] = Array(content.length).fill(0);
          next [x][y] = Array(content.length).fill(0);
        }
    }
    for(var i = 0; i<=p.width;i=i+size){
        for(var j = 0; j<=p.height;j=j+size){
            cubes.push(new Krug(j,i,0));
        }
    }
  }
  ////////////////////////// REPETATIVE FUNCTION //////////////////////////
  p.draw = function(){
  if (startAnimation==true){
    sorty = sorty + 1;
    exportGrid.push(new Object({"e":[]}))
  }
    if (reactivness == true){
      for (var i = 1; i < content.length; i++){
        if (content[i].R <= 2 && content[i].R != 0){
          content[i].R += dt
      }}}

    if (p.keyIsDown("87")){
      if (radiusPosition > widthC/2){ }else {
        radiusPosition = radiusPosition + 1;
      }
    } else if (p.keyIsDown("83")){
      if (radiusPosition == 0){ }else {
        radiusPosition = radiusPosition - 1;
      }}
    p.background(colorPickerMain.value());
    p.noFill();
    p.stroke(60)
    var selection = p.selectAll("#Test")[0].elt.style.display
    if (p.mouseX>size && p.mouseY>size && p.mouseX<widthC && p.mouseY<widthC && selection == "flex"){
      p.ellipse(p.mouseX,p.mouseY,radiusPosition*size,radiusPosition*size);
      if(p.mouseIsPressed === true){
        var xP = Math.floor(p.mouseX)
        var yP = Math.floor(p.mouseY)
        var modulusX = xP%size
        var modulusY = yP%size
        xP = xP - modulusX
        yP = yP - modulusY
        
        for(var i = -radiusPosition; i<=radiusPosition; i++){
          for(var j = -radiusPosition; j<=radiusPosition; j++){
            if(i*i + j*j < radiusPosition*radiusPosition ){
              var XP = (xP+(i*size))/size
              var YP = (yP+(j*size))/size
              grid[XP*size][YP*size][choice] = 0.6; 
              if (XP < 0 && YP<0 && X*size > widthC-size && Y*size>widthC-size){ 
              } else {}
            } else {}
          }
        }
      }
    }
    c = math.complex("i")
      for  (var x = size; x<p.width-size; x=x+size){
          for (var y = size; y<p.height-size; y=y+size){
          var Y = y/size
          var X = x/size
          var W = p.width/size
         next[x][y][0] = grid[x][y][0]
                          + ((content[0].D * laplaceNew(x,y,0)) 
                          - sumInitalReactions(x,y,content)
                          + (kfmap[1]*(1-grid[x][y][0])))*t;
  
          for (let particleType = 1; particleType < content.length; particleType++) {
                            AutomataNewParticle(x, y, particleType, MappedDataAutomata, PowerAutomata);
                            next[x][y][particleType] = p.constrain(next[x][y][particleType], 0, 1)
          }
         
          next[x][y][0] = p.constrain(next[x][y][0], 0, 1)
            var index = (X)+(Y)*(W+1)

            var a = next[x][y][0];
            var c = p.floor((a));
            cubes[index].size = c+sumSize(x,y,content,size)
            if (cubes[index].size == 0.6 * size /*cubes[index].size<7 && cubes[index].size>4 */&& startAnimation == true){
              cubes[index].c = [p.random(200),p.random(255),200]
              cubes[index].z = sorty;
              exportGrid[sorty-1].e.push(cubes[index].x, cubes[index].y, cubes[index].z)
              exportPy.push(new Array (cubes[index].x, cubes[index].y, cubes[index].z))
            } else{
              cubes[index].c = [c + sumColorR(x,y,content),c + sumColorG(x,y,content),c + sumColorB(x,y,content)];
            }  
            cubes[index].update();
          }
      }
      swap(); 
      for (var i = 1; i < content.length; i++){
        if (content[i].D != 0){
          startAnimation = true;
        }
       }
      if (savedFrames < framesToSave && startAnimation == true) {
        let currentFrame = animationCanvas.get(); // Get the current frame as an image from the animation canvas
        frameArray.push(currentFrame);
        savedFrames++;
      } else {
      }

      d3.selectAll("#SwatchyName").text(colorPickerMain.value())
  }
  p.NoLooping = function(){
    if (p.isLooping()){
      activation = false;
      p.noLoop();
    } else if(p.isLooping() == false){
      activation = true;
      p.loop();
    }
  }
  class Krug {
      constructor(x,y,s){
          this.x = x;
          this.y = y;
          this.z = 0;
          this.density = 0;
          this.size = s;
          this.c = [255,255,255];
      }
      update(){
          this.shape();
      }
      shape(){
          p.push();
          p.noStroke();
          p.fill(this.c)
          p.ellipse(this.x,this.y,this.size)
          p.pop();
      }
  }
} 
function swap(){
    var temp = grid;
    grid = next;
    next = temp; 
}
function mouseNew(){
  console.log(exportGrid)
  d3.select("body").selectAll("svg").selectAll("#testsvg")
    .data(cubes)
    .enter()
    .append("circle")
    .attr("cx", function(d){return d.x+size/2})
    .attr("cy", function(d){return d.y+size/2})
    .attr("r", function(d){return d.size/2})
    .attr("num",function(d,i){return i })
    .attr("fill",function(d,i){return "rgb("+d.c[0]+","+d.c[1]+","+d.c[2]+")"})

   /* d3.select("body").selectAll("svg").selectAll("#testsvg")
    .data(cubes)
    .enter()
    .append("rect")
    .attr("x", function(d){return d.x+size/2})
    .attr("y", function(d){return d.y+size/2})
    .attr("width", function(d){return 8})
    .attr("height", function(d){return 8})
    .attr("num",function(d,i){return i })
    .attr("fill",function(d,i){return "rgb("+d.c[0]+","+d.c[1]+","+d.c[2]+")"})*/


  var divContent = d3.select("body").selectAll("svg").selectAll("#testsvg")._parents[0].innerHTML
  //console.log(divContent)
  var data = "<svg width='"+widthC+"' height='"+widthC+"' xmlns='http://www.w3.org/2000/svg'>" + 
  "<g>" +
  divContent +
  "</g>" +
  "</svg>";
  var img = data;
  console.log(data)
  var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(data);
  console.log(url)
  var d1 = document.createElement("a");
  document.body.appendChild(d1);
  d1.setAttribute("href",url);
  d1.setAttribute("download","Untitled.svg");
  d1.click()

console.log(zMargin,bMargin)
  var exportCsv = []
for(var i = bMargin; i<zMargin; i++){
  exportCsv.push(exportGrid[i])
}
  const csvContent = convertJsonToCsv(exportCsv);
 // const jsonString = JSON.stringify(exportGrid);
  const blob = new Blob([csvContent], { type: 'text/csv' });

  // Create a link element
  const link = document.createElement('a');

  // Set the download attribute and create a URL for the Blob
  link.download = 'export.csv';
  link.href = URL.createObjectURL(blob);

  // Append the link to the body and trigger a click to start the download
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);

 // save(d1)
 //saveGif('mySketch', 2);
 // save("mySVG.svg"); // give file name
 // print("saved svg");
 // print(cellular)
}
function Reactivate (){
  var tempreactivness = reactivness;
  reactivness = nreactivness;
  nreactivness = tempreactivness;
}
function convertJsonToCsv(jsonData) {
  const csvRows = [];

  // Extract headers from the first object
  const headers = Object.keys(jsonData[0]);
  csvRows.push(headers.join(','));

  // Iterate over the JSON data and convert each object to a CSV row
  jsonData.forEach(item => {
    const values = headers.map(header => item[header]);
    csvRows.push(values.join(','));
  });

  // Join all CSV rows into a single string
  return csvRows.join('\n');
}




var myp5 = new p5(MainCanvasSketch)

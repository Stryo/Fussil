var colorGUIBackground = [20,21,24]
var colorCanvasBackground =[202,202,202]
var colorButtons =[33,34,37]
var colorButtonsHover =[66,66,68]
var colorButtonsSelected =[61, 125, 254]
var grid;
var next;
var feed = 0.18;
var k = 0.0001;
var t = 1;
var pA = 50;
var n;
var dt = 0.001;
var kt = 0.00001;
var text04;
var dt = 0.001;
var kfmap = [0.00429,0.01448];
var kRate = [0.0001,0.001]
var fRate = [0.001,0.18]

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

var exportGrid = [];

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

d3.selectAll("body").style("background-color","rgb("+colorCanvasBackground+")")

//GRAPH Substances
p5.disableFriendlyErrors = true;
mainCanvas = true;
var sketch1 = function(p){
  p.setup = function(){
    content.unshift({D:1,R:0})
    animationCanvas = p.createCanvas(widthC,widthC);
    animationCanvas.style("border-style","solid")
    animationCanvas.style("border-color","rgb("+colorButtons+")")
    button = p.createButton("save me").parent("ModelGui 0system")
    button.mousePressed(mouseNew)
    animationCanvas.parent("Test");
    button1 = p.createButton("react").parent("ModelGui 0system")
    button1.mouseClicked(Reactivate)
    sizeSelection = p.createSelect().attribute("id","Density").parent("ModelGui 0system")
    colorPickerMain = p.createColorPicker("rgb(0,0,0)").parent("ModelGui 0system").attribute("class","mColor")
    button1 = p.createButton("animate").parent("ModelGui 1system")
    button1.mouseClicked(ActiveCan)

    colorPickerMain.style("border-width","1px")
                    .style("border-radius","50px")
                    .style("width","30px")
                    .style("height","30px")
                    .style("margin-left","10px")
                    .style("padding","none")
                   
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
      //  .style("width","10px")
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

   /* var buttons = d3.selectAll("button")
    buttons.on("mouseover",function(){
      d3.selectAll("button")
        .style("background-color","rgb("+colorButtonsHover+")")
      
      
    })*/
    var mySelect = document.getElementById('Density')
    mySelect.addEventListener('change', function () {
      // Reset the content or perform any other actions
      var selectedValue = mySelect.value;
      localStorage.setItem('Density', selectedValue);
    //var check =  localStorage.getItem('Density');
   // console.log(check)
    window.location.reload()
  });
    
    sizeSelection.option(10)
    sizeSelection.option(8)
    sizeSelection.option(5)
    sizeSelection.option(4)
    sizeSelection.option(2)
    sizeSelection.selected(localStorage.getItem('Density'))
   // localStorage.setItem('selectedValue', selectedValue);
    size = Number(sizeSelection.selected());

    grid  = [];
    next  = [];
    console.log(content)
    for (var f = 100; f<=400; f++){
      exportGrid.push(new Exp())
    }
    for  (var x = 0; x<p.width; x=x+size){
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y<p.height; y=y+size){
          grid [x][y] = Array(content.length).fill(0);
          next [x][y] = Array(content.length).fill(0);
          //print(x,y)
        }
    }

    for(var i = 0; i<=p.width;i=i+size){
        for(var j = 0; j<=p.height;j=j+size){
            cubes.push(new Krug(j,i,0));
        }
    }
  
    
  }
  p.draw = function(){
   
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
    //console.log(selection)
    if (p.mouseX>size && p.mouseY>size && p.mouseX<widthC && p.mouseY<widthC && selection == "flex"){
      p.ellipse(p.mouseX,p.mouseY,radiusPosition*size,radiusPosition*size);
      if(p.mouseIsPressed === true){
       //startAnimation = true;
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
                            AutomataNewParticle(x, y, particleType);
                            next[x][y][particleType] = p.constrain(next[x][y][particleType], 0, 1)
          }
         
          next[x][y][0] = p.constrain(next[x][y][0], 0, 1)
            var index = (X)+(Y)*(W+1)

            var a = next[x][y][0];
            var c = p.floor((a));
            cubes[index].size = c + sumSize(x,y,content,size)
            cubes[index].c = [c + sumColorR(x,y,content),c + sumColorG(x,y,content),c + sumColorB(x,y,content)];
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
  }
  class Exp {
    constructor(){
      this.e = [];
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
 // save(d1)
 saveGif('mySketch', 2);
  noLoop();
 // save("mySVG.svg"); // give file name
 // print("saved svg");
 // print(cellular)
}
function Reactivate (){
  var tempreactivness = reactivness;
  reactivness = nreactivness;
  nreactivness = tempreactivness;
}






var myp5 = new p5(sketch1)


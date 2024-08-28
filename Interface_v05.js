let circles = [];
let gridSize = 2;
let circleSize = 50;
var sub = [];
var sliderR, sliderD;
var Reaction = [];
var Diffusion = [];
var Execution = [];
var initialR = 20;
var ColorSub = [];
var count = 0;
var LineData = [];
var content = [];
var degrading = 0;
var AGui = true;

for (var i = 0; i<gridSize*gridSize; i++){
  sub.push(i)
  content.push(new Object({D:0, R:0, E:[], C:{r:255 - degrading,g:255, b:255}, S: 4}))
  degrading = degrading + 50
}
console.log(sub)
console.log(content)

var gui = d3.select("#TestGUI").append("div").attr("class","GuiAll").attr("id","GI")
    
var sketch2 = function(p){
  p.setup = function (){
    var p1 = p.createCanvas(300, 300);
    p1.parent("GI")
     p.noStroke();
     gui.selectAll(".GuiAll")
     .data(sub)
       .enter()
       .append("div")
       .attr("id",function(d){return "gui" + d})
       .style("width","300px" )
       .style("height","200px")
       .style("background-color","rgb("+colorGUIBackground+")")
       .style("position","relative")
       .style("margin-left","0px")
       .style("margin-top","0px")
       .style("display","none")
       .style("color","white")
gui.selectAll("#gui0").style("display","block")
     // Create a grid of circles
     for (let i = 0; i < gridSize; i++) {
       for (let j = 0; j < gridSize; j++) {
         let x = j * p.width / gridSize + p.width / (2 * gridSize);
         let y = i * p.height / gridSize + p.height / (2 * gridSize);
         count = count + 1;
         circles.push(new DraggableCircle(x, y, circleSize, count));
       }
     }
     for (var i = 0; i<sub.length; i++){
       sliderR = p.createSlider(0,1,0).parent("gui" + i)
       sliderR.class("D" + i)
       sliderR.attribute("data-target","outputTextR" + i)
       sliderR.attribute("step","0.001")
       let pR = p.createP(sliderR.value()).parent("gui" + i)
       pR.style("color","white")
       pR.class("outputTextR" + i)
     
       sliderD = p.createSlider(0,1,0).parent("gui" + i)
       sliderD.class("R" + i)
       sliderD.attribute("data-target","outputTextD" + i)
       sliderD.attribute("step","0.001")
       let pD = p.createP(sliderD.value()).parent("gui" + i)
       pD.class("outputTextD" + i)

       sliderS = p.createSlider(3,20,0).parent("gui" + i)
       sliderS.class("S" + i)
       sliderS.attribute("data-target","outputTextS" + i)
       sliderS.attribute("step","1")
       let pS = p.createP(sliderS.value()).parent("gui" + i)
       pS.class("outputTextS" + i)
     
       myPicker = p.createColorPicker('white').parent("gui" + i)
       myPicker.class("C" + i)
     
       let pE = p.createP(circles[i].targets).parent("gui" + i)
       pE.class("Exe" + i)
   
       Reaction.push(0)
       Diffusion.push(0)
       //Execution.push(0)
       ColorSub.push("rgb("+Math.random(255)+","+Math.random(255)+","+Math.random(255)+")")
     }
   // var sliders = p.selectAll("input")

     circles[0].selectedCircle = true;
     p.frameRate(30)
     var texts = p.selectAll("p")
     texts.forEach(btn => {
      btn.style("font-size","8pt")
      btn.style("margin-left","150px")
    });
  }
  p.draw = function(){
    p.background(colorGUIBackground);

    for (let circle of circles) {
      circle.show();
      for (let connectedCircle of circle.connectedCircles) {
        drawArrow(circle.x, circle.y, connectedCircle.x, connectedCircle.y);
      }
    }
  
    for (var i = 0; i < circles.length; i++){
      circles[i].r = initialR + (Reaction[i] * 20);
      circles[i].stroke = Diffusion[i] * 10;
      circles[i].color = ColorSub[i]
    }
  }
  class DraggableCircle {
    constructor(x, y, r,n) {
      this.originalX = x;
      this.originalY = y;
      this.x = x;
      this.y = y;
      this.r = r;
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
      this.targetCircle = null;
      this.selectedCircle = false;
      this.connectedCircles = [];
      this.color = [0,0,0]
      this.diffusionRate = 0.1;
      this.reactionRate = 0.1;
      this.targets = [];
      this.reciever = [];
      this.stroke = 1;
      this.colorStroke = colorButtonsHover
      this.num = n;
    }
  
    show() {
      p.fill(this.color)
      p.strokeWeight(this.stroke)
      p.stroke(255,0,0)
      p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
      p.noFill()
      if (this.selectedCircle == true){
        p.stroke(colorButtonsSelected)
      } else if (this.selectedCircle == false){
        p.stroke(this.colorStroke)
      }
      p.strokeWeight(1);
      p.ellipse(this.x, this.y, this.r * 3, this.r * 3);
      p.fill(255)
      p.noStroke();
      p.textSize(8)
      p.text("D" + ((this.r/20 - 1)).toFixed(2), this.x + this.r + 20, this.y + this.r - 20)
      p.text("R" + (this.stroke/10).toFixed(2), this.x + this.r + 20, this.y + this.r - 8)
    }
  
    contains(px, py) {
      let d = p.dist(px, py, this.x, this.y);
      return d < this.r;
    }
  }
  p.mousePressed = function (){
    // Check if the mouse is over any circle
    for (let circle of circles) {
      if (circle.contains(p.mouseX, p.mouseY)) {
        circle.dragging = true;
        circle.offsetX = p.mouseX - circle.x;
        circle.offsetY = p.mouseY - circle.y;
      }
    }
  }
  
  p.mouseClicked = function (){
    // Check if the mouse is over any circle
    for (let circle of circles) {
      if (circle.contains(p.mouseX, p.mouseY)) {
        console.log(circle.num)
        choice = circle.num
        for (var i = 0; i<circles.length; i++){
          d3.selectAll("#gui" + i).style("display","none")
          circles[i].selectedCircle = false;
        }
      circle.selectedCircle = true;
       var selection = d3.selectAll("#gui" + (Number(circle.num) - 1))
       selection.style("display","block")
      } else if (circle.contains(p.mouseX, p.mouseY) == false)
      {}
    }
    var rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(function(input) {
      input.addEventListener('input', function(event) {
        var value = event.target.value;
        var classValue = event.target.className;
        determinate = classValue.slice(0,1)
        
        var targetId = event.target.getAttribute("data-target")
  
        if (determinate == "D"){
          classValue = classValue.replace("D","")
          Reaction[classValue] = Number(value);
          d3.selectAll("." + targetId).text("D: " + value)
         content[Number(classValue)+1].D = Number(value);
          //console.log(content)
        } else if (determinate == "R"){
          classValue = classValue.replace("R","")
          Diffusion[classValue] = Number(value);
          d3.selectAll("." + targetId).text("R: " + value)
          content[Number(classValue)+1].R = Number(value);
        }else if (determinate == "S"){
          classValue = classValue.replace("S","")
          d3.selectAll("." + targetId).text("S: " + value)
          content[Number(classValue)+1].S = Number(value);
        }
      });
    });
  
    var rangeInputs = document.querySelectorAll('input[type="color"]');
    rangeInputs.forEach(function(input) {
      input.addEventListener('input', function(event) {
        var value = event.target.value;
        var classValue = event.target.className;
        determinate = classValue.slice(0,1)

        if (determinate == "C"){
          classValue = classValue.replace("C","")
          ColorSub[classValue] = value;
          value = hexToRgb(value);
          content[Number(classValue)+1].C = value;
        }
        
      });
    });
  
  }
  
  p.mouseReleased = function() {
    // Check if the dragged circle is dropped onto another circle
    for (let circle of circles) {
      if (circle.dragging) {
        for (let targetCircle of circles) {
          if (targetCircle !== circle && targetCircle.contains(p.mouseX, p.mouseY)) {
            // Check if the circles are already connected
            let isConnected = circle.connectedCircles.includes(targetCircle);
            
            if (isConnected) {
              // If already connected, remove the connection
              circle.connectedCircles = circle.connectedCircles.filter(c => c !== targetCircle);
              targetCircle.connectedCircles = targetCircle.connectedCircles.filter(c => c !== circle);
            } else {
              // If not connected, add the connection
              circle.connectedCircles.push(targetCircle);
              targetCircle.connectedCircles.push(circle);
              
            }
            circle.color = [0,0,0]
            circle.targetCircle = targetCircle;
            
            if (circle.targets.includes(targetCircle.num) && targetCircle.targets.includes(circle.num)){
              var findNum = (element) => element == targetCircle.num;
              var c1 = circle.targets.findIndex(findNum)
              findNum = (element) => element == circle.num;
              var c2 = targetCircle.targets.findIndex(findNum)
  
              circle.targets.splice(c1,1)
              targetCircle.targets.splice(c2,1)
              //console.log(targetCircle.reciever)
             // console.log("INCLUDES")
  
            } else if (targetCircle.targets.includes(circle.num) && circle.targets.includes(targetCircle.num)){
              var findNum = (element) => element == targetCircle.num;
              var c1 = circle.targets.findIndex(findNum)
              findNum = (element) => element == circle.num;
              var c2 = targetCircle.targets.findIndex(findNum)
            
              circle.targets.splice(c1,1)
              targetCircle.targets.splice(c2,1)
  
            //console.log("INCLUDES")
            }
            else {
              circle.targets.push(targetCircle.num)
              targetCircle.reciever.push(circle.num)
             
            }
          }
          
        }
        // Always return the dragged circle to its original grid position
        circle.x = circle.originalX;
        circle.y = circle.originalY;
        circle.dragging = false;
      }
    }
    for (var i = 0; i < circles.length; i ++){
      for (var j = 0; j < circles[i].reciever.length; j++){
       var k = circles[i].reciever[j]
  
       if (circles[i].targets.includes(k)){
       } else if (circles[i].targets.includes(k) == false)
       {
        circles[i].targets.push(k)
      }
      if (circles[i].reciever.includes(k)){
        var findNum = (element) => element == k;
        var k1 = circles[i].reciever.findIndex(findNum)
        circles[i].reciever.splice(k1,1);
      }
      }
     
     var sel = d3.selectAll(".Exe" + (circles[i].num-1)).text("E:" + circles[i].targets)
     content[circles[i].num].E = circles[i].targets;
     }
  }
  
  p.mouseDragged = function() {
    // Move the dragged circle along with the mouse
    for (let circle of circles) {
      if (circle.dragging) {
        circle.x = p.mouseX - circle.offsetX;
        circle.y = p.mouseY - circle.offsetY;
      }
    }
  }
  
  function drawArrow(x1, y1, x2, y2) {
    p.stroke(255);
    p.fill(0);
    p.line(x1, y1, x2, y2);
  }
  
  function hexToRgb(hex) {
    // Remove the hash character (#) if present
    hex = hex.replace(/^#/, '');
  
    // Parse the hex value into individual RGB components
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
  
    // Return the RGB values as an object
    return { r: r, g: g, b: b };
  }
  
  
}

d3.selectAll("#TestGUIRight").style("background-color","rgb("+colorGUIBackground+")")

var newp5 = new p5(sketch2)
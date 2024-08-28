//VARIATIONS
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
var MappedDataAutomata = [];
var PowerAutomata = [0,0];

// Create Circles
for (var i = 0; i<gridSize*gridSize; i++){
  sub.push(i)
  content.push(new Object({D:0, R:0, E:[], C:{r:255 - degrading,g:255, b:255}, S: 4}))
  degrading = degrading + 50
}
console.log(sub)
console.log(content)

var gui = d3.select("#TestGUI").append("div").attr("class","GuiAll").attr("id","GI")
var divgui = d3.select("#GI").append("div").attr("id","MultiAutomataSystem").attr("class","MultiAutomataWra")
//////////////////////// PREPARATION /////////////////////////    
var sketch2 = function(p){
  p.setup = function (){
    var NameTag = p.createP("Cellular Automata Control System").class("SubHeadName").parent("MultiAutomataSystem")
    var p1 = p.createCanvas(270, 270);
    p1.parent("MultiAutomataSystem")
    p.noStroke();
    gui.selectAll(".GuiAll")
    .data(sub)
       .enter()
       .append("div")
       .attr("id",function(d){return "gui" + d})
       .style("display","flex")
       .style("width","autopx" )
       .style("height","auto")
       .style("background-color","rgb("+colorGUIBackground+")")
       .style("position","relative")
       .style("margin-left","0px")
       .style("margin-top","0px")
       .style("display","none")
       .style("color","white")
       

    gui.selectAll("#gui0").style("display","flex").style("flex-direction","column")
     // Create a grid of circles
     for (let i = 0; i < gridSize; i++) {
       for (let j = 0; j < gridSize; j++) {
         let x = j * p.width / gridSize + p.width / (2 * gridSize);
         let y = i * p.height / gridSize + p.height / (2 * gridSize);
         count = count + 1;
         circles.push(new DraggableCircle(x, y, circleSize, count));
       }
     }
     // CREATE SLIDERS //
     for (var i = 0; i<sub.length; i++){
  let NameTag = p.createP("Reaction Diffusion Expansion Rates").class("SubHeadName").id("WrapName" + i).parent("gui" + i)
      
      let div = p.createDiv().id("KlasaDWrap" + i).class("SliderWrapGlobal").style("order","2").parent("gui" + i)
       div = p.createDiv().id("KlasaDgui" + i).class("SliderDivGlobal").parent("KlasaDWrap" + i)
        
      NameTag = p.createP("Diffusion").class("TextDesc").parent("KlasaDWrap" + i)
       sliderR = p.createSlider(0,1,0).parent("KlasaDgui" + i)
       sliderR.class("D" + i)
       sliderR.attribute("data-target","outputTextR" + i)
       sliderR.attribute("step","0.001")
       let pR = p.createP(sliderR.value()).parent("KlasaDgui" + i)
       pR.style("color","white")
       pR.class("outputTextR" + i).style("margin","0px").style("font-size","9pt")
      // DIFFUSION //
      
      div = p.createDiv().id("KlasaRWrap" + i).class("SliderWrapGlobal").style("order","3").parent("gui" + i)
      div = p.createDiv().id("KlasaRgui" + i).class("SliderDivGlobal").parent("KlasaRWrap" + i)

      NameTag = p.createP("Reaction").class("TextDesc").parent("KlasaRWrap" + i)
       sliderD = p.createSlider(0,1,0).parent("KlasaRgui" + i)
       sliderD.class("R" + i)
       sliderD.attribute("data-target","outputTextD" + i)
       sliderD.attribute("step","0.001")
       let pD = p.createP(sliderD.value()).parent("KlasaRgui" + i)
       pD.class("outputTextD" + i).style("margin","0px").style("font-size","9pt")
      // REACTION

      div = p.createDiv().id("KlasaEWrap" + i).class("SliderWrapGlobal").style("order","4").parent("gui" + i)
      div = p.createDiv().id("KlasaEgui" + i).class("SliderDivGlobal").parent("KlasaEWrap" + i)

      NameTag = p.createP("Expansion").class("TextDesc").parent("KlasaEWrap" + i)
       sliderS = p.createSlider(3,20,0).parent("KlasaEgui" + i)
       sliderS.class("S" + i)
       sliderS.attribute("data-target","outputTextS" + i)
       sliderS.attribute("step","1")
       let pS = p.createP(sliderS.value()).parent("KlasaEgui" + i)
       pS.class("outputTextS" + i).style("margin","0px").style("font-size","9pt")
      //COLOR PICKER ZA REAKTANTE

      div = p.createDiv().id("KlasaColorWrap" + i).class("ColorPickerWrapGlobal").style("order","0").parent("gui" + i)
      div = p.createDiv().id("KlasaUpColorWrap" + i).class("ColorPickerInsideUpWrap").parent("KlasaColorWrap" + i)
      div = p.createDiv().id("KlasaDownColorWrap" + i).class("ColorPickerInsideDownWrap").parent("KlasaColorWrap" + i)

      let pC = p.createP("Selected:").class("TextDescBold").parent("KlasaUpColorWrap" + i)
      pC = p.createP("Fussil" + i).class("TextDescBold").parent("KlasaUpColorWrap" + i)
      pC = p.createP("Color:").class("TextDescBold").parent("KlasaDownColorWrap" + i)

      dC = p.createDiv().id("Swatchy" + i).class("SwatchyGlobal").parent("KlasaDownColorWrap" + i)
      pc = p.createP("#FFFFFF").id("SwatchyName" + i).class("NameSwatchyGlobal").parent("Swatchy" + i)
       myPicker = p.createColorPicker('white').parent("Swatchy" + i)
       myPicker.class("C" + i)
       let pE = p.createP(circles[i].targets).parent("gui" + i)
       pE.class("Exe" + i)
       Reaction.push(0)
       Diffusion.push(0)
       //Execution.push(0)

       
       ColorSub.push("rgb("+Math.random(255)+","+Math.random(255)+","+Math.random(255)+")")
     }
      circles[0].selectedCircle = true;
      p.frameRate(30)
     /* var texts = p.selectAll("p")
      texts.forEach(btn => {
        btn.style("font-size","9pt")
      });*/
    }
  ////////////////////////// EXECUTION /////////////////
  p.draw = function(){
    p.background(0,0,0);
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
  //THE CIRCLE //
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
       selection.style("display","flex").style("flex-direction","column")
      } else if (circle.contains(p.mouseX, p.mouseY) == false)
      {}
    }
    //////////////// INPUT OPTIONS ////////////////
    var rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(function(input) {
      input.addEventListener('input', function(event) {
        var value = event.target.value;
        var classValue = event.target.className;
        determinate = classValue.slice(0,1)
        determinateInp = classValue.slice(0,14)
        determinateInpNum = classValue.slice(14,15)
        
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
        if (determinateInp == "AdvancedSlider"){
          d3.selectAll(".ControlTextSlider" + determinateInpNum).text(value)
          if (determinateInpNum == 0){
            PowerAutomata[determinateInpNum] = value;
          }
          if (determinateInpNum == 2){
            PowerAutomata[determinateInpNum - 1 ] = value;
          }
         // console.log(determinateInp,determinateInpNum)
        }
      });
    });
  
    var rangeInputs = document.querySelectorAll('input[type="color"]');
    rangeInputs.forEach(function(input) {
      input.addEventListener('input', function(event) {
        var value = event.target.value;
        var classValue = event.target.className;
        determinate = classValue.slice(0,1)
        determinateNum = classValue.slice(1,2)
        
        if (determinate == "C"){
          d3.selectAll("#SwatchyName"+ determinateNum).text(value)
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


////////////////////  ADVANCED AUTOMATA SYSTEM /////////////////
var sketchCon = function(p){
    let outerRadius = 50;
    let innerRadius = 100;
    let outerCircle, innerCircle;
    var ConGraphArray = [30,35,15,90];
    var ConGraphCircle = [];
    var ConGraphRadius = [];

    p.setup = function(){
      var d1 = p.createDiv()
      d1.attribute("id","AdvancedControl")
      d1.parent("TestGUIRight")

      d1 = p.createDiv().attribute("id","CellControlSystem").parent("AdvancedControl")
      var p1 = p.createP("Cell Control System").class("SubHeadName").parent("CellControlSystem")
      p1 = p.createCanvas(270, 270);
      p1.parent("CellControlSystem")
  
      p.noLoop();

      p1 = p.createDiv().id("ControlSystem").class("ControlSystemGlobal").parent("AdvancedControl")
      p1 = p.createP("Control System").class("SubHeadName").parent("ControlSystem")
      p1 = p.createDiv().id("ControlSystemOptions").class("ControlSystemOptionsGlobal").parent("ControlSystem")
      

        
       for (var i = 0; i < 4; i++){
        ConGraphCircle.push(new DraggableCircle(ConGraphArray[i], i*20, [255,255,255], i))
        ConGraphRadius.push(0)
        MappedDataAutomata.push(0)
        if (i % 2 == 0){

        d3.selectAll("#ControlSystemOptions").append("div").attr("id","Control" + i).attr("class","ControlWrapGlobal")
          

        d3.selectAll("#Control" + i)
          .append("div")
          .attr("id","KlasaAdvancedControlMinMax" + i)
          .attr("class","MinMaxDivGlobal")
        d3.selectAll("#Control" + i)
          .append("div")
          .attr("id","KlasaAdvancedControl" + i)
          .attr("class","SliderDivGlobal")

        d3.selectAll("#KlasaAdvancedControlMinMax" + i)
          .append("div")
          .attr("id","KlasaMinMax" + i)
          .attr("class","SliderDivGlobal")

        d3.selectAll("#KlasaAdvancedControlMinMax" + i)
          .append("div")
          .attr("id","ControlMinMaxText" + i)
          .attr("class","TextDesc")

        d3.selectAll("#KlasaMinMax" + i)  
          .append("div")
          .text("min")
          .attr("id","KlasaWrapMinMax" + i)
          .attr("class","MinMaxGlobal")
        d3.selectAll("#KlasaMinMax" + i)  
          .append("div")
          .text("max")
          .attr("id","KlasaWrapMinMax" + (i+1))
          .attr("class","MinMaxGlobal")

        d3.selectAll("#KlasaWrapMinMax" + i)
          .append("div")
          .attr("class","ControlTextWrap")
          .append("div")
          .attr("class","ControlText" + i)
          .text("BLA")
        d3.selectAll("#KlasaWrapMinMax" + (i+1))
          .append("div")
          .attr("class","ControlTextWrap")
          .append("div")
          .attr("class","ControlText" + (i + 1))
          .text("BLA")

      d1 = p.createSlider(0,1,0.4,0.01)
      var val = d1.value();
      PowerAutomata[0] = val;
      PowerAutomata[1] = val;
      d1.parent("KlasaAdvancedControl" + i).attribute("class","AdvancedSlider" + i)
      d3.selectAll("#KlasaAdvancedControl" + i)
          .append("div")
          .attr("class","ControlTextSlider" + i)
          .text(val)
        }
        d3.selectAll("#ControlMinMaxText0").text("Outer Ring")
        d3.selectAll("#ControlMinMaxText2").text("Inner Ring")

        d3.selectAll(".ControlText"+i)
            .style("color","white")
            .style("font-size","9pt")
        d3.selectAll(".ControlTextSlider"+i)
            .style("color","white")
            .style("font-size","9pt")
       }
      // var x = d3.selectAll(".ControlTextSlider").text()
      // p.print(x)
    }

    p.draw = function(){
        p.background(10);
        p.translate(p.width / 2, p.height / 2);

        outerRadius = p.dist(0, 0, ConGraphCircle[0].x, ConGraphCircle[0].y);
        innerRadius = p.dist(0, 0, ConGraphCircle[1].x, ConGraphCircle[1].y);
        for (var i=0; i<ConGraphCircle.length;i++){
          ConGraphRadius[i] = p.dist(0, 0, ConGraphCircle[i].x, ConGraphCircle[i].y)
          MappedDataAutomata[i] = p.map(ConGraphRadius[i], 0,125,0,1)
        }
        p.drawTorus(ConGraphRadius[0], ConGraphRadius[1], [255,255,0, PowerAutomata[0]*100]);
        p.drawTorus(ConGraphRadius[2], ConGraphRadius[3], [255,255,255, PowerAutomata[1]*100]);

      for (var i =0; i<ConGraphCircle.length;i++){
        ConGraphCircle[i].display();
        d3.selectAll(".ControlText"+i).text(MappedDataAutomata[i].toFixed(2))
      }
      //p.print(MappedDataAutomata)
    }

    p.drawTorus = function(outerRadius, innerRadius, color) {
        let numVertices = 100;
        p.fill(color)
        p.beginShape();
        // Draw outer circle
        for (let i = 0; i <= numVertices; i++) {
            let theta = p.TWO_PI * i / numVertices;
            let x = outerRadius * p.cos(theta);
            let y = outerRadius * p.sin(theta);
            p.vertex(x, y);
        }
        // Draw inner circle (in reverse)
        for (let i = numVertices; i >= 0; i--) {
            let theta = p.TWO_PI * i / numVertices;
            let x = innerRadius * p.cos(theta);
            let y = innerRadius * p.sin(theta);
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
    }

     p.mousePressed = function() {
      for (var i =0; i<ConGraphCircle.length;i++){
        ConGraphCircle[i].pressed();
      }
      p.print(MappedDataAutomata)
    }

    p.mouseDragged = function(){
      for (var i =0; i<ConGraphCircle.length;i++){
        ConGraphCircle[i].dragged();
      }
        p.redraw();
    }

    p.mouseReleased = function() {
      for (var i =0; i<ConGraphCircle.length;i++){
        ConGraphCircle[i].released();
      }
    }
    p.mouseHover

    class DraggableCircle {
        constructor(x, y, color, n) {
            this.x = x;
            this.y = y;
            this.diameter = 5;
            this.color = color;
            this.dragging = false;
            this.rollover = false;
            this.num = n;
        }

        display() {
            p.fill([255,255,255]);
            p.noStroke();
            p.ellipse(this.x, this.y, this.diameter, this.diameter);
        }

        pressed() {
            let d = p.dist(p.mouseX - p.width / 2, p.mouseY - p.height / 2, this.x, this.y);
            if (d < this.diameter / 2) {
                this.dragging = true;
            }
        }

        dragged() {
            if (this.dragging) {
              if (p.mouseX > p.width || p.mouseX < 0 ){
              } else {
                this.x = p.mouseX - p.width / 2;
               // this.y = p.mouseY - p.height / 2;
              }
             /* if (this.num == 0){
                if (p.mouseX > p.width || p.mouseX < 0 || p.mouseX- p.width/2 >= ConGraphCircle[this.num + 1].x){
                } else {
                  this.x = p.mouseX - p.width / 2;
                }
              } else if (this.num == ConGraphCircle.length - 1){
                if (p.mouseX > p.width || p.mouseX < 0 || p.mouseX- p.width/2 <= ConGraphCircle[this.num - 1].x){
                } else {
                  this.x = p.mouseX - p.width / 2;
                }
              } else {
                if (p.mouseX > p.width || p.mouseX < 0 || p.mouseX- p.width/2 <= ConGraphCircle[this.num - 1].x || p.mouseX- p.width/2 >= ConGraphCircle[this.num + 1].x){
                } else {
                  this.x = p.mouseX - p.width / 2;
                }
              }*/
            }
        }

        released() {
            this.dragging = false;
        }
        hover(){
          this.diameter = 10;
        }
    }
  /*var c1 = 200;
  p.setup = function(){
    var p1 = p.createCanvas(250,250)
    p1.parent("TestGUIRight")
    p1.style("margin-top","100px")
    p.background(10,0,0)
    p.noFill();
    p.stroke(255);
    //p.ellipse(p.width/2,p.height/2,c1)
   // p.ellipse(p.width/2 - (c1/2),p.height/2,20)
   p.translate(p.width / 2, p.height / 2);

   let outerRadius = 30;  // Outer radius of the donut
   let innerRadius = 60;  // Inner radius of the donut
   let numVertices = 100;  // Number of vertices for smoothness

   p.beginShape();
   // Draw outer circle
   for (let i = 0; i <= numVertices; i++) {
       let theta = p.TWO_PI * i / numVertices;
       let x = outerRadius * p.cos(theta);
       let y = outerRadius * p.sin(theta);
       p.vertex(x, y);
   }
   // Draw inner circle (in reverse)
   for (let i = numVertices; i >= 0; i--) {
       let theta = p.TWO_PI * i / numVertices;
       let x = innerRadius * p.cos(theta);
       let y = innerRadius * p.sin(theta);
       p.vertex(x, y);
   }
   p.endShape(p.CLOSE);
  }*/
  
}
d3.selectAll("#TestGUIRight").style("background-color","rgb("+colorGUIBackground+")")

var newp5 = new p5(sketch2)
var newp6 = new p5(sketchCon)
//console.log(MappedDataAutomata)
var System2D = function (p){
    var cols = 6;
    var rows = 12;
    var canvasSize = 100;
    const rotationSpeed = 90;
    var odmik = 50;
    let gridCanvases;
    let rotationAngles = [];
    let selectedCanvasIndex = -1;
    let selectedCanvasIndexC = -1;
    let openCanvas = false;
    var xHtemp;
    var yHtemp;
    var gridArrayPattern = [];
    var slider1;
    var slider2;
    var button1;
    mainCanvas = false;
    var buttonCols, buttonRows;
    var ColsActive = false;
    var RowsActive = false;
p.setup = function(){
   var  can =  p.createCanvas(p.windowWidth, p.windowHeight)
   rows = Math.round(p.windowWidth / 100) - 3;
   cols = Math.round(p.windowHeight / 100) - 3
    can.parent("TestGrid")
    buttonCols = p.createButton("+").parent("TestGrid").attribute("class","ScrollButton")
    buttonRows = p.createButton("+").parent("TestGrid").attribute("class","ScrollButton")
    var buttons = p.selectAll(".ScrollButton")
    buttons.forEach(btn => {
      btn.style('background-color', 'rgba(30,30,30)');
      btn.style('color', 'rgb(255,255,255)');
      btn.style('border-radius', '20px');
      btn.style('border-style', 'none');
    });
    console.log(buttons)
     // p.background(255)
    gridCanvases = Array.from({ length: cols * rows }, () => newC = p.createGraphics(canvasSize, canvasSize).parent("TestGrid"));
    var div = p.createDiv().id("IdFrameBuffer").class("SliderDivGlobal").parent("ModelGui 1system")
    div = p.createDiv().id("IdFrames").class("SliderDivGlobal").parent("ModelGui 1system")
    var par = p.createDiv("Frames").class("GeneralTextSlider").id("TextFrameBuffer").parent("IdFrameBuffer")
    par = p.createDiv("Zoom").class("GeneralTextSlider").id("TextFrameBuffer").parent("IdFrames")

      slider1 = p.createSlider(0,1,1,1).parent("IdFrameBuffer").attribute("class","FrameBuffer")
      slider2 = p.createSlider(0,1000,canvasSize,1).parent("IdFrames").attribute("class","Frames")
    par = p.createDiv("0").class("GeneralTextSlider").id("TextFrameBuffer").parent("IdFrameBuffer")
    par = p.createDiv("0").class("GeneralTextSlider").id("TextFrames").parent("IdFrames")
    

     for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = j * canvasSize + canvasSize / 2 + odmik;
        const y = i * canvasSize + canvasSize / 2 + odmik;  
        gridArrayPattern.push(new Object ({X: x, Y: y, F: [255,20,20,255], R: -90, hover: false, active: false})) 
        }}
      console.log(gridArrayPattern)
     
      buttonCols.position(0,0,"absolute")
      buttonCols.style("height",(canvasSize*cols) + "px")
      buttonCols.style("margin-top",gridArrayPattern[1].Y - canvasSize/2  + "px")
      buttonCols.style("margin-left",gridArrayPattern[rows-1].X + canvasSize/2 + "px")
      //buttonCols.mouseClicked(p.HCols)
      buttonCols.mousePressed(p.HColsW)
      buttonRows.position(0,0,"absolute")
      buttonRows.style("width",(canvasSize*rows) + "px")
      buttonRows.style("margin-top",gridArrayPattern[gridArrayPattern.length - 1].Y + canvasSize/2  + "px")
      buttonRows.style("margin-left",gridArrayPattern[1].X - canvasSize - canvasSize/2 + "px")
      buttonRows.mousePressed(p.HRowsW)
      }
    p.draw = function(){

      p.background(colorCanvasBackground)
    if (p.mouseIsPressed && ColsActive == true){
      p.HColsTest();
    }else if(p.mouseIsPressed && RowsActive == true) {
      p.VRowsTest();
    }else {
      ColsActive = false;
      RowsActive = false;
    }
    var indexC 
      const xC = p.mouseX % p.width;
      const yC = p.mouseY % p.height;
      if (xC < odmik || yC < odmik || xC > (odmik + canvasSize*rows) || yC > (odmik + canvasSize*cols)){
      } else {
        indexC = (p.floor((xC-(canvasSize + odmik))/canvasSize)+1) + (p.floor((yC-(canvasSize + odmik))/canvasSize)+1) * rows;
        selectedCanvasIndexC = indexC;
      }
  
      var xH = p.floor(xC / (canvasSize)) * canvasSize + canvasSize/2 + odmik;
      var yH = p.floor(yC / (canvasSize)) * canvasSize + canvasSize/2 + odmik;
  
      if (xHtemp != xH || yHtemp != yH){
        for (var i = 0; i < gridArrayPattern.length; i++){
          gridArrayPattern[i].F = [20,20,20]
          if(indexC < 0 || indexC > gridArrayPattern.length){
            
          } else if (indexC >= 0 && indexC < gridArrayPattern.length)
          { gridArrayPattern[indexC].F = [255,255,255]}
         
        }
      }
      for (var i = 0; i < gridArrayPattern.length; i++){
        p.push();
          p.translate(gridArrayPattern[i].X, gridArrayPattern[i].Y);
          p.fill(255)
          if(gridArrayPattern[i].Y == (odmik + canvasSize/2)){
            p.text(((gridArrayPattern[i].X - (canvasSize/2 + odmik))/canvasSize),-canvasSize / 2, -canvasSize / 2 - 10,)
          }
          if(gridArrayPattern[i].X ==  (odmik + canvasSize/2)){
            p.text((gridArrayPattern[i].Y - (canvasSize/2 + odmik))/canvasSize, -canvasSize / 2- 10, -canvasSize / 2 ,)
          }
            p.rotate(p.radians(gridArrayPattern[i].R))
            if (gridArrayPattern[i].active == true){
              p.image(gridCanvases[0], -canvasSize / 2, -canvasSize / 2, canvasSize, canvasSize);
            } else if (gridArrayPattern[i].active == false) {
              p.fill(0)
              p.rect( -canvasSize / 2, -canvasSize / 2,canvasSize-0.5, canvasSize-0.5)
            }
            p.stroke(gridArrayPattern[i].F)
            p.noFill();
            p.rect( -canvasSize / 2, -canvasSize / 2,canvasSize-0.5, canvasSize-0.5)
        p.pop();
      }
          xHtemp = xH;
          yHtemp = yH;
  
      if (frameArray.length > 2){
        for (let i = 0; i < gridCanvases.length; i++) {
          gridCanvases[i].width = slider2.value()
          gridCanvases[i].height = slider2.value()
          gridCanvases[i].resizeCanvas(slider2.value(),slider2.value())
          canvasSize = slider2.value()
          if (activation == true){
            gridCanvases[i].image(frameArray[frameArray.length-1], 0, 0, canvasSize, canvasSize);
            slider1.elt.max = frameArray.length-1
            slider1.elt.value = frameArray.length-1
          } 
          if (activation == false){
            gridCanvases[i].image(frameArray[slider1.value()], 0, 0, canvasSize, canvasSize);
          }
        }
  
      }
    }
  
    p.mouseClicked = function(){
      var index = -1;
      const x = p.mouseX % p.width;
      const y = p.mouseY % p.height; 
      if (x < odmik || y < odmik || x > (odmik + canvasSize*rows) || y > (odmik + canvasSize*cols)){
       } else {
        index = (p.floor((x-(canvasSize + odmik))/canvasSize)+1) + (p.floor((y-(canvasSize + odmik))/canvasSize)+1) * rows;
       }
     if(index < 0 || index > gridArrayPattern.length){
  
     } else { gridArrayPattern[index].R += rotationSpeed;
      if (gridArrayPattern[index].active == true && p.keyIsDown(68)){
        gridArrayPattern[index].active = false;
      } else if (gridArrayPattern[index].active == false){
        gridArrayPattern[index].active = true;
      }
      var rangeInputs = document.querySelectorAll('input[type="range"]');
      rangeInputs.forEach(function(input) {
        input.addEventListener('input', function(event) {
          var value = event.target.value;
          var classValue = event.target.className;
  
         if (classValue == "Frames"){
          d3.selectAll("#TextFrames").text(value)
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              const x = j * canvasSize + canvasSize / 2 + odmik;
              const y = i * canvasSize + canvasSize / 2 + odmik; 
              var indexC = j + i * rows;
              gridArrayPattern[indexC].X = x
              gridArrayPattern[indexC].Y = y
            }}
            buttonCols.style("height",(canvasSize*cols) + "px")
            buttonCols.style("margin-top",gridArrayPattern[1].Y - canvasSize/2  + "px")
            buttonCols.style("margin-left",gridArrayPattern[rows-1].X + canvasSize/2 + "px")
            buttonRows.style("width",(canvasSize*rows) + "px")
            buttonRows.style("margin-top",gridArrayPattern[gridArrayPattern.length - 1].Y + canvasSize/2  + "px")
            buttonRows.style("margin-left",gridArrayPattern[1].X - canvasSize - canvasSize/2 + "px")
        }

        if(classValue == "FrameBuffer"){
          d3.selectAll("#TextFrameBuffer").text(value)
        }
        })})
    }}
    p.HColsT = function(){
      var tempGrid = gridArrayPattern
      gridArrayPattern = []
      p.background(20)
      rows = rows - 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = j * canvasSize + canvasSize / 2 + odmik;
          const y = i * canvasSize + canvasSize / 2 + odmik; 
            var indexC = j + i * rows;
          gridArrayPattern.push(new Object ({X: x, Y: y, F: [0,0,0,0], R: -90, hover: false, active: false})) 
        }}
        var count = 1;
        for (var i = 0; i<tempGrid.length; i++){
          var slice = i % (rows+1);
          
          if (slice === 0){
            count = count - 1;
          }
          console.log(i, i + count, slice, count)
          if (slice != rows){
            gridArrayPattern[i + count].active = tempGrid[i].active
          }
        }
    }
    p.HColsTest = function(){
      const xV = p.mouseX % p.width;
      const yV = p.mouseY % p.height;
      var checkBx = buttonCols.style("margin-left")
      checkBx = Number(checkBx.replace("px",""))
  
      if (xV < checkBx - 100){
        var tempGrid = gridArrayPattern
        gridArrayPattern = []
        p.background(20)
        rows = rows - 1;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = j * canvasSize + canvasSize / 2 + odmik;
            const y = i * canvasSize + canvasSize / 2 + odmik; 
            var indexC = j + i * rows;
            gridArrayPattern.push(new Object ({X: x, Y: y, F: [0,0,0,0], R: -90, hover: false, active: false})) 
          }}
          var count = 1;
          for (var i = 0; i<tempGrid.length; i++){
            var slice = i % (rows+1);
            if (slice === 0){
              count = count - 1;
            }
            if (slice != rows){
            gridArrayPattern[i + count].active = tempGrid[i].active
            gridArrayPattern[i + count].R = tempGrid[i].R
            }
          }
      } else if (xV > checkBx + 100){
        var tempGrid = gridArrayPattern
        gridArrayPattern = []
        rows = rows + 1;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = j * canvasSize + canvasSize / 2 + odmik;
            const y = i * canvasSize + canvasSize / 2 + odmik; 
            var indexC = j + i * rows;
            gridArrayPattern.push(new Object ({X: x, Y: y, F: [0,0,0,0], R: -90, hover: false, active: false})) 
            }}
            var count = -1;
            for (var i = 0; i<tempGrid.length; i++){
            var slice = i % (rows-1);
            if (slice === 0){
              count = count + 1;
            }
            gridArrayPattern[i + count].active = tempGrid[i].active
            gridArrayPattern[i + count].R = tempGrid[i].R
          }
      }
      buttonCols.style("height",(canvasSize*cols) + "px")
      buttonCols.style("margin-top",gridArrayPattern[1].Y - canvasSize/2  + "px")
      buttonCols.style("margin-left",gridArrayPattern[rows-1].X + canvasSize/2 + "px")
      buttonRows.style("width",(canvasSize*rows) + "px")
      buttonRows.style("margin-top",gridArrayPattern[gridArrayPattern.length - 1].Y + canvasSize/2  + "px")
      buttonRows.style("margin-left",gridArrayPattern[1].X - canvasSize - canvasSize/2 + "px")
    }
    p.HColsW = function(){
      ColsActive = true;
    }
    p.HRowsW = function(){
      RowsActive = true;
    }
    p.VRowsTest = function(){
      const xV = p.mouseX % p.width;
      const yV = p.mouseY % p.height;
      var checkBx = buttonRows.style("margin-top")
      checkBx = Number(checkBx.replace("px",""))
      if (yV  < checkBx - 100){
        var tempGrid = gridArrayPattern
        gridArrayPattern = []
        p.background(20)
        cols = cols - 1;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = j * canvasSize + canvasSize / 2 + odmik;
            const y = i * canvasSize + canvasSize / 2 + odmik; 
            var indexC = j + i * rows;
            gridArrayPattern.push(new Object ({X: x, Y: y, F: [0,0,0,0], R: -90, hover: false, active: false})) 
          }}
          for (var i = 0; i<tempGrid.length - rows; i++){
            gridArrayPattern[i].active = tempGrid[i].active
            gridArrayPattern[i].R = tempGrid[i].R
          }
          
      } else if (yV  > checkBx + 100){
        var tempGrid = gridArrayPattern
        gridArrayPattern = []
        cols = cols + 1;
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = j * canvasSize + canvasSize / 2 + odmik;
            const y = i * canvasSize + canvasSize / 2 + odmik; 
            var indexC = j + i * rows;
            gridArrayPattern.push(new Object ({X: x, Y: y, F: [0,0,0,0], R: -90, hover: false, active: false})) 
          }}
          for (var i = 0; i<tempGrid.length; i++){
            gridArrayPattern[i].active = tempGrid[i].active
            gridArrayPattern[i].R = tempGrid[i].R
          }
      }
      buttonCols.style("height",(canvasSize*cols) + "px")
      buttonCols.style("margin-top",gridArrayPattern[1].Y - canvasSize/2  + "px")
      buttonCols.style("margin-left",gridArrayPattern[rows-1].X + canvasSize/2 + "px")
      buttonRows.style("width",(canvasSize*rows) + "px")
      buttonRows.style("margin-top",gridArrayPattern[gridArrayPattern.length - 1].Y + canvasSize/2  + "px")
      buttonRows.style("margin-left",gridArrayPattern[1].X - canvasSize - canvasSize/2 + "px")
      
    }
  }

  var myp52 = new p5(System2D)
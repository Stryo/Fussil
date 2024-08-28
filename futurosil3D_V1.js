var render3D = []
var tempCheck; 
var Remapped = []
var sliderRect;
var zMargin;
var bMargin; 
var sliderRectDown;
var colorSys = [255,255,255]

var System3D = function(p){
    p.setup = function(){
      processCanvas = p.createCanvas(p.windowWidth - 400,p.windowHeight-200,p.WEBGL);
      processCanvas.parent("Test3D")
      var div = p.createDiv().id("IdRectUp").class("SliderDivGlobal").parent("ModelGui 2system")
      div = p.createDiv().id("IdRectDown").class("SliderDivGlobal").parent("ModelGui 2system")

      div = p.createDiv("RectUp").id("TextIdRectUpName").class("GeneralTextSlider").parent("IdRectUp")
      div = p.createDiv("RectDown").id("TextIdRectDownName").class("GeneralTextSlider").parent("IdRectDown")

      sliderRect = p.createSlider(-100,100,-100,3).parent("IdRectUp")
      sliderRectDown = p.createSlider(-100,100,-100,3).parent("IdRectDown")

      div = p.createDiv("0").id("TextIdRectUp").class("GeneralTextSlider").parent("IdRectUp")
      div = p.createDiv("0").id("TextIdRectDown").class("GeneralTextSlider").parent("IdRectDown")

      p.camera(0, -500, (p.height), -100, -300, 0, 0, 1, 0)
    }
    p.draw = function(){
    // console.log(frameArray.length)
    sliderRect.elt.max = ((frameArray.length - 1)*3)-100;
    if (activation == true){
     // sliderRect.elt.value = ((frameArray.length - 1)*3)-100;
    } else if (activation == false){

    }
    if (p.keyIsPressed === true){
      colorSys = [0,0,0]
    } else if (p.keyIsPressed === false){
      colorSys = [255,255,255]
    }
    sliderRectDown.elt.max = sliderRect.value();
    zMargin = Math.round(sliderRect.value()+100)/3;
    bMargin = Math.round(sliderRectDown.value()+100)/3;


      p.background(0);
      p.orbitControl();
      p.blendMode(p.LIGHTEST);
  p.push()
      p.scale(0.5)
      p.stroke(30)
      p.noFill()
      p.translate(-600, 100, 0);
      p.rotateZ(0);
      p.rotateX(p.PI - p.PI / 2);
      p.rect(0,0,900,900)
  p.pop()
  p.push()
      p.scale(0.5)
      p.strokeWeight(0.5)
      p.stroke(colorButtonsSelected)
      p.noFill()
      p.translate(-600, -sliderRect.value(), 0);
      p.rotateZ(0);
      p.rotateX(p.PI - p.PI / 2);
      p.rect(0,0,900,900)
  p.pop()

  p.push()
  p.scale(0.5)
  p.strokeWeight(0.5)
  p.stroke(colorButtonsSelected)
  p.noFill()
  p.translate(-600, -sliderRectDown.value(), 0);
  p.rotateZ(0);
  p.rotateX(p.PI - p.PI / 2);
  p.rect(0,0,900,900)
p.pop()
      
    d3.selectAll("#TextIdRectUp").text(Math.round(sliderRect.value()+100)/3)
    d3.selectAll("#TextIdRectDown").text(Math.round(sliderRectDown.value()+100)/3)

      for (var i = 0; i < frameArray.length-1; i++) {
        var z = i * 3;
        p.push()
          p.scale(0.5)
          p.translate(-600, -z+100, 0);
          p.rotateZ(0);
          p.rotateX(p.PI - p.PI / 2);
          if (i < zMargin || i >bMargin){
            p.stroke(colorButtonsSelected)
          } if (i > zMargin || i<bMargin){
            p.stroke(colorSys)
          }
         
          p.strokeWeight(0.1)
          p.beginShape(p.POINTS)
          for (var j = 0; j<exportGrid[i].e.length;j++){
            if(j % 3 == 0){
            var xs = exportGrid[i].e[j]
            } else if (j % 3 == 1){
              var ys = exportGrid[i].e[j]
            }else if(j % 3 == 2){
              p.vertex(xs,ys)

            }
          }
          p.endShape();
        p.pop()
      }
     if (activation == false){

      } else if (activation == true && frameArray.length != tempCheck){
        tempCheck = frameArray.length
        if ((exportGrid[(frameArray.length-2)] + "") === "undefined"){

        } else{
          for (var j = 0; j<exportGrid[frameArray.length-2].e.length;j++){
            if(j % 3 == 0){
            var xs = exportGrid[frameArray.length-2].e[j]
            } else if (j % 3 == 1){
              var ys = exportGrid[frameArray.length-2].e[j]
            }else if(j % 3 == 2){
              var zs = exportGrid[frameArray.length-2].e[j]
              render3D.push(xs,ys,zs)
            }
            
          }
        }
      }
      
    }
  }
  
  function ActiveCan(){
      if (activation == false){
        activation = true;
      } else if (activation == true){
        activation = false;
      }
  }

  var myp51 = new p5(System3D)
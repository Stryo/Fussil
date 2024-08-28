

var System3D = function(p){
    p.setup = function(){
      processCanvas = p.createCanvas(1500,900,p.WEBGL);
      processCanvas.parent("Test3D")
      processCanvas.style("position","absolute")
      p.camera(0, -500, (p.height), -100, -300, 0, 0, 1, 0)
    }
    p.draw = function(){

      p.background(0);
      p.orbitControl();
      p.blendMode(p.LIGHTEST);
  p.push()
      p.scale(0.5)
      p.stroke(30)
      p.noFill()
      p.translate(-600, 0, 0);
      p.rotateZ(0);
      p.rotateX(p.PI - p.PI / 2);
      p.rect(0,0,900,900)
  p.pop()
      for (var i = 0; i < frameArray.length-1; i++) {
        var z = i * 3;
        
      p.blendMode(p.DIFFERENCE);
        p.push()
          p.scale(0.5)
          p.stroke(255,0,0)
          p.translate(-600, -z+100, 0);
         // p.rotateY(PI/2)
          p.rotateZ(0);
          p.rotateX(p.PI - p.PI / 2);
          p.image(frameArray[i],0,0)
        p.pop()
      }
    }
  }
  
  function ActiveCan(){
      if (activation == false){
        activation = true;
      } else if (activation == true){
        activation = false;
      }
    //console.log(activation)
  }

  var myp51 = new p5(System3D)
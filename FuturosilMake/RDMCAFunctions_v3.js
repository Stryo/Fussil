function InitialReaction(x,y,particle1, particle2){
  return (grid[x][y][particle1] * grid[x][y][particle2] * grid[x][y][particle2]);
}
function ParticleReaction(x,y,Diffusion, Reaction, particle1, particle2){
  c = math.complex("i")
  return (math.re(math.pow(c,Reaction)))*((Diffusion*laplaceNewR(x,y,particle1,particle2)));
}
function laplaceNew(X,Y,particle){
var sumA =0;
var count;
for(var i = 0; i<matrixsize; i++){
    for (var j = 0; j<matrixsize; j++){
      var col = X+(matrixNew[i][j].x*size)
      var row = Y+(matrixNew[i][j].y*size)
      count = grid[col][row][particle] * matrixCon[i][j]
      sumA += count;
    }
 }
 return sumA;
}
function laplaceNewR(X,Y,particle1, particle2){
var sumA =0;
var count;
for(var i = 0; i<matrixsize; i++){
    for (var j = 0; j<matrixsize; j++){
      var col = X+(matrixNew[i][j].x*size)
      var row = Y+(matrixNew[i][j].y*size)
      count = grid[col][row][particle1] * grid[col][row][particle2]* (matrixCon[i][j]+Math.abs(matrixCon[i][j]))
      sumA += count;
    }
 }
 return sumA;
}
function Automata(particle){
for  (var x = size; x<width-size; x=x+size){
      for (var y = size; y<height-size; y=y+size){
        let state = grid[x][y][particle];
        // Count live neighbors!
        
        let neighbors = countNeighborsNewX(x, y,particle);
  
        if (state == 0  && neighbors == 3) {
          next[x][y][particle] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[x][y][particle] = 0;
        } else {
          next[x][y][particle] = state;
        }
  
      }
    }
}
function countNeighborsNewX(X,Y,particle){
var sumA =0;
var count;
for(var i = 0; i<matrixsize; i++){
  for (var j = 0; j<matrixsize; j++){
    var col = X+(matrixNew[i][j].x*size)
    var row = Y+(matrixNew[i][j].y*size)
    count = grid[col][row][particle]
    sumA += count;
    
  }
}
sumA = sumA - grid[X][Y][particle]
return sumA;
}

function isPointInStar(x, y, radius, numPoints, i, j) {
  var angle = Math.atan2(j, i);
  var r = Math.sqrt(i * i + j * j);
  var starAngle = (2 * Math.PI) / numPoints;
  var distToArm = Math.cos(Math.floor((angle + Math.PI) / starAngle) * starAngle - angle) * radius;

  return r < distToArm;
}

function convolutionStarT(x, y, radius, numPoints, particle) {
  var sumKout = 0;
  var sumKin = 0;
  var sumFout = 0;
  var sumFin = 0;
  var size = 1; // Assuming size is 1 for simplicity, update as needed
  var widthC = grid.length; // Assuming grid is a square

  // Function to check if the coordinates are within grid bounds
  function isInBounds(X, Y) {
    return X >= 0 && Y >= 0 && X * size < widthC - size && Y * size < widthC - size;
  }

  // Outer loop for outside the inner circle but within the outer circle
  for (var i = -radius; i <= radius; i++) {
    for (var j = -radius; j <= radius; j++) {
      if (isPointInStar(0, 0, radius, numPoints, i, j) && Math.sqrt(i * i + j * j) >= 4) {
        var X = (x + (i * size)) / size;
        var Y = (y + (j * size)) / size;
        if (isInBounds(X, Y)) {
          var count = grid[X * size][Y * size][particle];
          sumKout += count;
          sumFout += 1;
        }
      }
    }
  }

  // Inner loop for inside the small circle of radius 2
  for (var i = -radius; i <= radius; i++) {
    for (var j = -radius; j <= radius; j++) {
      if (Math.sqrt(i * i + j * j) < 4) {
        var X = (x + (i * size)) / size;
        var Y = (y + (j * size)) / size;
        if (isInBounds(X, Y)) {
          var count = grid[X + (i * size)][Y + (j * size)][particle];
          sumKin += count;
          sumFin += 1;
        }
      }
    }
  }

  sumFin = sumFin > 0 ? sumKin / sumFin : 0;
  sumFout = sumFout > 0 ? sumKout / sumFout : 0;
  return [sumFout, sumFin];
}


function convolutionCircleT(x,y,radius, particle){
  var sumKout = 0;
  var sumKin = 0;
  var sumFout = 0;
  var sumFin = 0;
  for(var i = -radius; i<=radius; i++){
    for(var j = -radius; j<=radius; j++){
      if(i*i + j*j < radius*radius && i*i + j*j >= 4){
        var X = (x+(i*size))/size
        var Y = (y+(j*size))/size
        if (X > 0 && Y>0 && X*size < widthC-size && Y*size<widthC-size){
            count = grid[X*size][Y*size][particle]
            sumKout += count;
            sumFout += 1;
        } else {sumKout += 0;}
      } else {}
    }
  }

 
  

  for(var i = -radius; i<=radius; i++){
      for(var j = -radius; j<=radius; j++){
        if(i*i + j*j < 4){
          var X = (x+(i*size))/size
          var Y = (y+(j*size))/size
          if (X > 0 && Y>0 && X*size < widthC-size && Y*size<widthC-size){
            count = grid[x+(i*size)][y+(j*size)][particle]
            sumKin += count;
            sumFin += 1;
          }
          
        } else {}
      }
    }

  sumFin = sumKin / sumFin;
  sumFout = sumKout / sumFout;
  return [sumFout,sumFin]

} 
function AutomataNewParticle(x,y,particle,maped, power){
//console.log(particle)
//console.log(maped)
         // let neighbors = convolutionCircleT(x,y,content[particle].S,particle)
         let neighbors = convolutionStarT(x,y,4,content[particle].S,particle)
          if (neighbors[1]>= power[0] && neighbors[0] >= maped[2] && neighbors[0] <= maped[3]) {

          next[x][y][particle] = grid[x][y][particle] 
           + ((content[particle].D * laplaceNew(x,y,particle))
            + InitialReaction(x,y,0,particle)
            + sumParticleReactions(x,y,particle,content)
            - ((kfmap[0] + kfmap[1])*grid[x][y][particle]))*t;

           // next[x][y][particle] = map_range(neighbors[1],0,power[1],0,1)

          } else if (neighbors[1]<power[1] && neighbors[0] >= maped[0] && neighbors[0] <= maped[1]) {
            next[x][y][particle] = map_range(neighbors[1],0,0.4,0,1)
            
          } else {
            next[x][y][particle] = map_range(neighbors[1],0,0.3,0,0.01)
          }
}
function sumInitalReactions(x,y,content){
let sum = 0;
  for (let i = 1; i < content.length; i++) {
      sum += InitialReaction(x, y, 0, i);
  }
  return sum;
}
function sumParticleReactions(x,y,particle,content){
let sum = 0;
for (let i = 0; i < content[particle].E.length; i++) {
  sum += ParticleReaction(x,y,content[particle].D,content[particle].R,particle,content[particle].E[i])
}
return sum;
}
function sumSize (x,y,content,size){
let sum = 0;
for (let i = 1; i < content.length; i++) {
  sum += next[x][y][i]*size;
}
return sum;
}
function sumColorR(x,y,content){
let sum = 0;
for (let i = 1; i < content.length; i++) {
  sum += Math.floor(next[x][y][i]*content[i].C.r)
}
return sum;
}
function sumColorG(x,y,content){
let sum = 0;
for (let i = 1; i < content.length; i++) {
  sum += Math.floor(next[x][y][i]*content[i].C.g)
}
return sum;
}
function sumColorB(x,y,content){
let sum = 0;
for (let i = 1; i < content.length; i++) {
  sum += Math.floor(next[x][y][i]*content[i].C.b)
}
return sum;
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
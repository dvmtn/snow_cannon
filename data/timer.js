var time = 0;
var running = false;

var get = function(url, complete, error){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = request.responseText;
      complete(data);
    }
  };

  request.onerror = function() {
    if(error){
      error(request);
    }
  };

  request.send();
};

var emit = function(){
  self.postMessage(time);
};

var stop = function(){
  running = false;
  time = 0;
};

var start = function(){
  stop();
  running = true;
  get('https://gist.githubusercontent.com/atleastimtrying/aa72080418331c7306dd/raw/371be9b02004ca8ef2d9d9c8071ce1ab4ae816a7/sample.json', function(json_string){
    emit();
    stop();
  });
  loop();
};

var loop = function(){
  time += 1;
  if(running){
    setTimeout(loop,10);
  }
};

self.addEventListener('message', function(e) {
  if(e.data === 'start'){
    start();
  }
}, false);

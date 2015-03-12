(function(){

  var log_time = function(number, time){
    console.log(number, time);
  };

  var thing = function(t, callback){
    return function(e){
      callback(t, e.data);
    };
  };

  var make_timers = function(amount, callback){
    
    for(var i = 0, l = amount; i < l; ++i){
      var timer = new Worker('timer.js');
      var t = i;
      timer.addEventListener('message', thing(t, callback), false);
      timer.postMessage('start');
    }
 
  };

  window.SnowCannon = function(options){
    make_timers(8, log_time);
  };

})();

/* This file is included after libraries and before your src code */

(function(){

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

  var add_stylesheet = function(){
    var link_tag = document.createElement('link');
    link_tag.rel = 'stylesheet';
    link_tag.href = 'http://dvmtn.github.io/snow_cannon/snow_cannon.min.css';
    document.head.appendChild(link_tag);
  };

  var build_wrapper = function(options){
    var className = options.theme || 'light';
    var element = document.getElementById(options.element_id);
    var wrapper = document.createElement('div');
    wrapper.className = 'snow_cannon ' + className;
    element.appendChild(wrapper);
    return wrapper;
  };

  var json_to_html = function(json){
    return '<ul>' + json.values.map(function(cat){
      return '<li>' + cat + '</li>';
    }).join("\n") + '</ul>';
  };

  window.SnowCannon = function(options){
    var wrapper = build_wrapper(options);
    wrapper.innerHTML = '<p class="loading">Loading</p>';
    get('https://gist.githubusercontent.com/atleastimtrying/aa72080418331c7306dd/raw/371be9b02004ca8ef2d9d9c8071ce1ab4ae816a7/sample.json', function(json_string){
      var json = JSON.parse(json_string);
      wrapper.innerHTML = json_to_html(json);
    });
    add_stylesheet();
  };

})();

/* This file is included after your src code */

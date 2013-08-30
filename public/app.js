function Cookie(type,bakeTime,timeBaked,status){
  this.type = type,
  this.bakeTime = bakeTime,
  this.timeBaked = timeBaked,
  this.status = status
};

Cookie.prototype = {
  bake : function(){
    console.log("inside cookie bake");
    this.timeBaked++;
    if ( this.timeBaked < this.bakeTime ) {
      this.status = "still_gooey"
    } else if ( this.timeBaked === this.bakeTime ) {
      this.status = "just_right"
    } else { 
      this.status = "crispy"
    }
  }
};


function updateRedisWithOvenData(ovenCookiesArray){
  var jsonDataOvenCookiesArray = JSON.stringify(ovenCookiesArray);

  $.ajax({
    url: '/update-redis',
    type: "POST",
    data: jsonDataOvenCookiesArray,
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(response){
      console.log(response)
    }
  });
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


var Oven = {
  init: function(){
    
    var that = this;

    $.get('/oven-data',function(response){
      
      var jsonResponse = JSON.parse(response);


      if (Object.size(jsonResponse) === 0 ) { 
        that.cookies = [] 
      } 
      else {
        var jsonResponseAsCookies = []
        jsonResponse.forEach(function(element){
            jsonResponseAsCookies.push(new Cookie(element.type, element.bakeTime, element.timeBaked, element.status))

        })
        that.cookies = jsonResponseAsCookies;
      };

      renderOven();

    });

  },
  bake: function(){
    this.cookies.forEach(function(cookieItem){ 
      cookieItem.bake();          
    }
  )},
  addCookie: function(cookie){
    this.cookies.push(cookie);
  }
};

function renderOven(){
  if (Oven.cookies != []) {
    Oven.cookies.forEach(function(cookieItem,index){
      $('#rack_'+index.toString()).html(cookieItem.type+"<span class='status'>["+cookieItem.status+"]</span>" ).addClass(cookieItem.status);
    });
  }
};

var my_cookies = [];
// Oven.init();

$(document).ready(function(){
  Oven.init();
  $('form').submit(function(event){
    event.preventDefault();
    var form_data = $(this).serialize();

    var json_data = JSON.parse('{"' + form_data.replace(/&/g, "\",\"").replace(/=/g,"\":\"") + '"}')

    my_cookies.push( new Cookie(json_data.batch_type, json_data.bake_time, 0, "raw") )
    $(this).find("input[type=text]").val("");
    $(this).find("input[type=number]").val(null);
    $("#prep_batches").append("<li>" + json_data.batch_type + " <button class='sendToOven'>Add to oven</button></li>");
  });

  $("body").on("click", ".sendToOven", function(event){
    event.preventDefault();
    index = ($(this).parent().index());
    var ovenCookie = my_cookies[($(this).parent().index())];
    Oven.addCookie(ovenCookie);

    $(this).parent().remove();
    my_cookies.splice(index, 1);
    renderOven();
    var ovenCookiesArray = Oven.cookies;    
    updateRedisWithOvenData(ovenCookiesArray);
  });

  $("#bake").on("click",function(event){
    event.preventDefault();
    Oven.bake();
    renderOven();
    var ovenCookiesArray = Oven.cookies;
    updateRedisWithOvenData(ovenCookiesArray);
  });
});
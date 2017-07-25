var myKey = config.token;

var model = {
  sourceNames: []
};

//#2 first call is made here, getting all sources, and putting them into a form
//all names & ids (value) are pushed into model
//user clicks and form is submitted
//second api call is made with the id (value number that corresponds) that was selected

function apiCallOne() {
  var url = "https://newsapi.org/v1/sources";
  var data = {
    language: "en",
    country: "us"
  };
  $.ajax({
    url: url,
    data: data,
    type: "GET",
    success: function(response) {
      var sources = response.sources;
      var html = "<select class='form-control' id='slectedName'>";
      $.each(sources, function(index, source) {
        model.sourceNames.push(source.id);
        html += "<option value=" + index + ">" + source.name + "</option>";
      });
      html += "</select>";
      $(".form-group").html(html);
    }
  });

  $("#source").submit(function(evt) {
    evt.preventDefault();
    var mediaIndex = $('#slectedName option:selected').val();

    apiCallTwo(mediaIndex);
  })
};

function apiCallTwo(name){
  var url = "https://newsapi.org/v1/articles";
  var data = {
    source: model.sourceNames[name],
    apiKey: myKey
  };
  $.ajax({
    url: url,
    data: data,
    type: "GET",
    success: function(response) {
      var articles = response.articles;
      var html = "<ul id='list'>";
      $.each(articles, function(index, article) {
        var title = article.title;
        var description = article.description;
        var link = article.url;
        html += "<li class='items'>" + "<h3>" + title + "</h3>" + "<p>" + description + "</p>" + link + "</li>";
      });
      html += "</ul>";
      $(".article-list").html(html);
      $("#about").text(model.sourceNames[name].toUpperCase());
    }
  })

}

//#1 WHEN DOM LOADS, FIRST CALL IS MADE

$(document).ready(function() {
  apiCallOne();
});



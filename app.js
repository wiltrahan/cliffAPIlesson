var myKey = config.token;

var model = {
  sourceNames: []
};

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
    }
  })

}

$(document).ready(function() {
  apiCallOne();
});



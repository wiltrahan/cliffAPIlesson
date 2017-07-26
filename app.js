$(document).ready(function() {
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
      var html = "<select class='form-control' id='sourceOption'>";
      $.each(sources, function(index, source) {
        html += "<option value='" + source.id + "'>" + source.name + "</option>";
      })
      html += "</select>";
      $(".form-group").html(html);
    }
  });

  $("#source").submit(function(event) {
    event.preventDefault();
    var id = $("#sourceOption").val();
    var url = "https://newsapi.org/v1/articles";
    var data = {
        apiKey: "ce9645ec5df84064aa5200fb2087c255",
        source: id
      };
    $.ajax({
      url: url,
      data: data,
      type: "GET",
      success: function(response) {
        var articles = response.articles;
        var html = "<ul class='list-group'>";

        $.each(articles, function(index, article) {
          html += "<li class='list-item'>" + article.title + "</li>";
        })
        html += "</ul>";
        $("#articles").html(html);
      }
    });
  })

});


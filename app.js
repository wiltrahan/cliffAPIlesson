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
      // console.log(response);
      // console.log(response.sources[2]);
      var sources = response.sources;
      // console.log(sources[2]);
      var html = "<select class='form-control' id='source'>";
      $.each(sources, function(index, source) {
        // console.log(source.id);
        html += "<option value=" + index + ">" + source.name + "</option>";
      })
      html += "</select>";
      $(".form-group").html(html);
    }
  });


  var articleUrl = "https://newsapi.org/v1/articles";
  var articleData = {
    source: ""
  }
});

// $('input:button').click(function() {
//     alert($(this).val());
// });​

//after user selects newsSource
//have list of links from source show up on page
//going to need second API call
//send ID
//git init this
//branch off master

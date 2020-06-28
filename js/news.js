function showHighlight(){
  $.ajax({
    url: 'https://newsapi.org/v2/top-headlines',
    type: 'GET',
    dataType: 'JSON',
    context: document.body,
    data: {
      'country': 'id',
      'pageSize': 4,
      'category': 'sports',
      'apiKey' : '8e587192c63149c4bdcd57968743db3a'
    },
    success: function(result){
      let article = result.articles;
      // console.log(article)
      $.each(article, function(i, data){
        $('#news-list').append(`<div class="col-3">
        <div class="card mb-3" style="width: 100%;">
          <img src="`+ data.urlToImage +`" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">`+ data.title +`</h5>
              <h6 class="card-subtitle mb-2 text-muted">`+ data.source['name'] +`</h6>
              <p class="card-text">`+ data.description +`...</p>
              <p class="card-subtitle mb-3">`+ data.publishedAt +`</p>
              <a href="#" class="btn btn-primary">Read now</a>
            </div>
          </div>
        </div>`);
      });
    }
  })
}

function searchNews(){
  $('#news-list').html('')

  $.ajax({
    url: 'https://newsapi.org/v2/everything',
    type: 'GET',
    dataType: 'JSON',
    data: {
      'q': $('#input-search').val(),
      'apiKey' : '8e587192c63149c4bdcd57968743db3a'      
    },
    success: function(result){
      if(result.totalResults == 0){
        $('#news-list').html(`<h1 class="text-center mt-3">Article not found</h1>`)
      }else{
        let article = result.articles;
        // console.log(article)
        $.each(article, function(i, data){
          $('#news-list').append(`<div class="col-3">
          <div class="card mb-3" style="width: 100%;">
            <img src="`+ data.urlToImage +`" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">`+ data.title +`</h5>
                <h6 class="card-subtitle mb-2 text-muted">`+ data.source['name'] +`</h6>
                <p class="card-subtitle mb-3">`+ data.publishedAt.substring(0,10) +`</p>
                <a href="#" class="btn btn-primary">Read now</a>
              </div>
            </div>
          </div>`);
        });
      }
    }
  })
}

$(document).ready(function(){
  showHighlight()
})

$('#button-search').on('click', function(e){
    searchNews()
})

$('#input-search').on('keyup', function(e){
  if(e.which == 13){
    searchNews()
  }
})



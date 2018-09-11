$(function () {
  // 公告轮播效果
  $lis = $(".news-carousel li");
  $(".news-carousel").append($lis[0].cloneNode(true));
  var index = 0;
  var timer = null;
  timer = setInterval(function () {
    $(".news-carousel").on("transitionend", function () {
      if (index >= $lis.length) {
        index = 0;
        $(".news-carousel").css("transition", "none");
        $(".news-carousel").css("transform", "translateY(" + 0);
      }
    })
    index++;
    $(".news-carousel").css("transition", "transform .5s");
    $(".news-carousel").css("transform", "translateY(" + (-index * $lis[0].offsetHeight) + "px)")
  }, 1000);
  
  
  var unSelected = "#ccc";
  var selected = "#000";
  $(".header .fr select").css("color", unSelected);
  $(".header .fr select option").css("color", selected);
  $(".header .fr select").change(function () {
    var selItem = $(this).val();
    if (selItem == $(this).find('option:first').val()) {
      $(this).css("color", unSelected);
    } else {
      $(this).css("color", selected);
    }
  });
  
  
  //ajax获取全部数据
  var id = $('.sale div').attr('data-adv');
  $.ajax({
    type: "GET",
    url: "http://www.86sb.com/adv/sbadvad",
    dataType: 'jsonp',
    jsonp: 'callback',
    data: {
      id: id,
      page:1
    },
    success: function (data) {
      console.log(data);
      //商品列表分页
      var MaxPageCount = Math.ceil(data.result.count / 20);
      var str = "";
      for (var i = 1; i <= MaxPageCount; i++) {
        str = str + "<span class='num'>" + i + "</span>";
      }
      $("#prev").after(str);
      
      
      // 商品列表数据渲染
      $(".sale .page span").eq(2).css("background-color", "#d72614").siblings().css("background-color", "#fff");
      $(".sale .page span").eq(2).css("color", "#fff").siblings().css("color", "#a6a6a6");
      $(".sale .page span").on("mouseover", function () {
        $(this).css({
          'border': '1px solid #d72614',
          "cursor": "pointer"
        }).siblings().css({
          'border': '1px solid #ededed'
        })
      })
      $(".sale .page span").on("mouseout", function () {
        $(".sale .page span").css({
          'border': '1px solid #ededed'
        })
      })
      
      var strs = '';
      $.each(data.result['data'], function (key, val) {
        strs += "<li><a href='/" + val['id'] + ".html'>";
        strs += "<img src='" + val['sbpic'] + "'>";
        strs += "<p>" + val['sbname'] + "</p>";
        strs += "<p class='bottomdes'>" + val['sbdetail'] + "</p>";
        strs += "</a>";
      });
      $('.sale .list ul').html(strs);
      
      
      var page = 1;
      //下一页
      $('#next').on('click', function () {
        page++;
        if (page > MaxPageCount) {
          page = MaxPageCount;
        }
        $(".sale .page span").eq(page).css("background-color", "#d72614").siblings().css("background-color", "#fff");
        $(".sale .page span").eq(page).css("color", "#fff").siblings().css("color", "#a6a6a6");
        myAjax(page);
      })
      
      
      // 上一页
      $('#prev').on('click', function () {
        page--;
        if (page < 1) {
          page = 1;
        }
        $(".sale .page span").eq(page).css("background-color", "#d72614").siblings().css("background-color", "#fff");
        $(".sale .page span").eq(page).css("color", "#fff").siblings().css("color", "#a6a6a6");
        myAjax(page);
      });
      
      // 点击页码
      $(".sale .page .num").on("click", function () {
        var pageNum = $(this).html();
        $(this).css("background-color", "#d72614").siblings().css("background-color", "#fff");
        $(this).css("color", "#fff").siblings().css("color", "#a6a6a6");
        myAjax(pageNum);
      })
    },
    error: function () {
      console.log("请求出错啦");
    }
  });
  
  
  function myAjax(page) {
    $.ajax({
      type: "GET",
      url: "http://www.86sb.com/adv/sbadvad",
      dataType: 'jsonp',
      jsonp: 'callback',
      data: {
        id: id,
        page:page
      },
      success: function (data) {
        console.log(data);
        //商品列表数据渲染
        var strs = '';
        $.each(data.result['data'], function (key, val) {
          strs += "<li><a href='/" + val['id'] + ".html'>";
          strs += "<img src='" + val['sbpic'] + "'>";
          strs += "<p>" + val['sbname'] + "</p>";
          strs += "<p class='bottomdes'>" + val['sbdetail'] + "</p>";
          strs += "</a>";
        });
        $('.sale .list ul').html(strs);
        $('body,html').animate({'scrollTop': 670}, 1000);
      }
    })
  }
  
})





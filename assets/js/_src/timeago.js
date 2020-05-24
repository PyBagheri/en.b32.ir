/*
 * Caculate the Timeago
 * v2.0
 * https://github.com/cotes2020/jekyll-theme-chirpy
 * © 2019 Cotes Chung
 * MIT Licensed
 */

$(function() {

  function enToFaNumbers(string) {
    return string.replace(/1/g, '۱')
                 .replace(/2/g, '۲')
                 .replace(/3/g, '۳')
                 .replace(/4/g, '۴')
                 .replace(/5/g, '۵')
                 .replace(/6/g, '۶')
                 .replace(/7/g, '۷')
                 .replace(/8/g, '۸')
                 .replace(/9/g, '۹')
                 .replace(/0/g, '۰')
  }

  function timeago(date, isLastmod) {
    var now = new Date();
    var past = new Date(date);
    var seconds = Math.floor((now - past) / 1000);

    var year = Math.floor(seconds / 31536000);
    if (year >= 1) {
      return year + " year" + (year > 1 ? "s" : "") + " ago";
    }

    var month = Math.floor(seconds / 2592000);
    if (month >= 1) {
      return month + " month" + (month > 1 ? "s" : "") + " ago";
    }

    var week = Math.floor(seconds / 604800);
    if (week >= 1) {
      return week + " week" + (week > 1 ? "s" : "") + " ago";
    }

    var day = Math.floor(seconds / 86400);
    if (day >= 1) {
      return day + " day" + (day > 1 ? "s" : "") + " ago";
    }

    var hour = Math.floor(seconds / 3600);
    if (hour >= 1) {
      return hour + " hour" + (hour > 1 ? "s" : "") + " ago";
    }

    var minute = Math.floor(seconds / 60);
    if (minute >= 1) {
      return minute + " minute" + (minute > 1 ? "s" : "") + " ago";
    }

    return (isLastmod? "just" : "Just") + " now";
  }

  function timeago_fa(date, isLastmod) {
    var now = new Date();
    var past = new Date(date);
    var seconds = Math.floor((now - past) / 1000);

    var year = Math.floor(seconds / 31536000);
    if (year >= 1) {
      return enToFaNumbers(year + " سال پیش");
    }

    var month = Math.floor(seconds / 2592000);
    if (month >= 1) {
      return enToFaNumbers(month + " ماه پیش");
    }

    var week = Math.floor(seconds / 604800);
    if (week >= 1) {
      return enToFaNumbers(week + " هفته پیش");
    }

    var day = Math.floor(seconds / 86400);
    if (day >= 1) {
      return enToFaNumbers(day + " روز پیش");
    }

    var hour = Math.floor(seconds / 3600);
    if (hour >= 1) {
      return enToFaNumbers(hour + " ساعت پیش");
    }

    var minute = Math.floor(seconds / 60);
    if (minute >= 1) {
      return enToFaNumbers(minute + " دقیقه پیش");
    }

    return 'لحظاتی پیش';
  }


  function updateTimeago() {
    $(".timeago").each(function() {
      if ($(this).children("i").length > 0) {
        var isLastmod = $(this).hasClass('lastmod');
        var node = $(this).children("i");
        var date = node.text();   /* ISO Dates: 'YYYY-MM-DDTHH:MM:SSZ' */
	if ($(this).hasClass('farsi')) {
	        $(this).text(timeago_fa(date, isLastmod));
	} else {
		$(this).text(timeago(date, isLastmod));
	}
        $(this).append(node);
      }
    });

    if (vote == 0 && intervalId != undefined) {
      clearInterval(intervalId);  /* stop interval */
    }
    return vote;
  }


  var vote = $(".timeago").length;
  if (vote == 0) {
    return;
  }

  if (updateTimeago() > 0) {      /* run immediately */
    vote = $(".timeago").length;  /* resume */
    var intervalId = setInterval(updateTimeago, 60000); /* loop every minutes */
  }

});

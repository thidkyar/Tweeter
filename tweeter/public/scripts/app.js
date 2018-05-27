/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Function to calculate time since post.
function tweetAgeTime(milliseconds) {
  var seconds = Math.floor((Date.now() - milliseconds) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

//function to handle the output of tweets
function createTweetElement(tweet) {
  const $tweet = $("<li>")
    .addClass("tweet_box")
    .data("id", tweet._id);

  const $header = $("<header>").appendTo($tweet);

  $("<img>")
    .attr("src", tweet.user.avatars.small)
    .appendTo($header);

  $("<span>")
    .addClass("name")
    .text(tweet.user.name)
    .appendTo($header);

  $("<p>")
    .addClass("handle")
    .text(tweet.user.handle)
    .appendTo($header);

  const $article = $("<article>").appendTo($tweet);

  $("<p>")
    .addClass("message")
    .text(tweet.content.text)
    .appendTo($article);

  const $footer = $("<footer>")
    .addClass("footer")
    .appendTo($article);

  $("<p>")
    .addClass("tweet-age")
    .text(tweetAgeTime(tweet.created_at))
    .appendTo($footer);
  const $fontDiv = $("<div>")
    .addClass("icons")
    .appendTo($footer);
  $("<i>")
    .addClass("fas fa-flag")
    .appendTo($fontDiv);
  $("<i>")
    .addClass("fas fa-retweet")
    .appendTo($fontDiv);
  $("<i>")
    .addClass("fas fa-heart")
    .appendTo($fontDiv);

  $(".tweets_list").append($tweet);

  return $tweet;
}

//Render data and add to end of tweets_list
function renderTweets(tweets) {
  $(".tweets_list").empty();
  tweets.forEach(function(tweet) {
    createTweetElement(tweet).prependTo(".tweets_list");
  });
}

$(document).ready(function() {
  loadTweets();
  $(".new-tweet").hide();
  $(".compose").on("click", function(event) {
    $(".new-tweet").toggle("slow");
    $(".textarea").focus();
  });

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(data) {
        renderTweets(data);
      },
      error: function(xhr) {
        console.log("error");
      }
    });
  }

  $("body").on("click", ".fa-heart", function(event) {
    $.ajax({
      url: "/tweets/likes",
      method: "POST",
      success: function() {}
    });
  });

  //handle form submit -- handle post request to post tweet
  $("form").submit(function(event) {
    event.preventDefault();
    let str = $("form").serialize();
    if ($("textarea").val().length > 140) {
      $(".counter").text("Message too long!");
    } else if (!$("textarea").val().length) {
      $(".counter").text("Please enter something!");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: str,
        success: function(data) {
          loadTweets();
          $("form")[0].reset();
          $(".counter").text("140");
        }
      });
    }
  });
  loadTweets();
});

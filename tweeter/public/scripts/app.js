/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

function createTweetElement(tweet) {
  const $tweet = $("<li>").addClass("tweet_box");

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

  const $footer = $("<footer>").appendTo($article);
  $("<p>")
    .addClass("tweet-age")
    .text(tweet.created_at)
    .appendTo($footer);
  const $fontDiv = $("<div>")
    .addClass("icons")
    .appendTo($footer)

  // $("<i>")
  //   .addClass("fas fa-flag")
  //   .appendTo($fontDiv);
  // $("<i>")
  //   .addClass("fas fa-retweet")
  //   .appendTo($fontDiv)
  // $("<i>")
  //   .addClass("fas fa-heart")
  //   .appendTo($fontDiv)


  $(".tweets_list").append($tweet);

  return $tweet;
}

function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    createTweetElement(tweet).appendTo(".tweets_list");
    // $("tweets_list").append(createTweetElement(tweet));
  });
}

$(document).ready(function() {
  // renderTweets(data);
  $(".compose").on('click', function(event) {
    $(".new-tweet").toggle("slow")
  })

  loadTweets();
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(data) {
        // console.log("Success: ");
        renderTweets(data);
      },
      error: function(xhr) {
        console.log("error");
      }
    });
  }
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
        success: function() {
          $.ajax({
            url: "/tweets",
            method: "GET",
            success: function(data) {
              createTweetElement(data[0]).prependTo(".tweets_list");
              $(".textarea").val('');
              $(".counter").val('');
            }
          });
        }
      });
    }
  });
});

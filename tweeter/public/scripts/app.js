/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: {
        small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368
  }
];

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

  $(".tweets_list").append($tweet);
  return $tweet;
}

function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    createTweetElement(tweet).appendTo("tweets_list")
    // $("tweets_list").append(createTweetElement(tweet));
  });
}

$(document).ready(function() {
  renderTweets(data);
  $('form').submit(function(event){
  event.preventDefault();
  var str = $("form").serialize();

  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: str,
    success: function () {
      console.log('Success: ');
  }
});
});
});

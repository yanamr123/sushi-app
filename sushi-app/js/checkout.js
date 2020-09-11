
'use strict';
{
  let total = 0;
  const history = JSON.parse(localStorage.getItem('ordered_items'));
  // 合計の計算
  if(history){
    for(let i=0;i<history.length;i++){
      total += history[i].num * history[i].cost;
    }
  }
  const total_fee = document.getElementById('total_fee');
  total_fee.innerHTML = total + '円です';

  localStorage.removeItem("ordered_items");

  // twitterに投稿
  const tweetDivided = document.getElementById('tweet-area');
  const anchor = document.createElement('a');
  const hrefValue =
  'https://twitter.com/share';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', '寿司屋で' + total + '円分食べた気になりました！');
  anchor.setAttribute('data-size','large');
  anchor.setAttribute('data-url','https://sushimulator.web.app/');
  anchor.setAttribute('data-hashtags','寿司mulator');

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
  tweetDivided.appendChild(anchor);
}

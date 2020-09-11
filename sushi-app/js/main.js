'use strict';

{
const menus = ['にぎり1', 'にぎり2','にぎり3','軍艦・巻物','麺類・汁物', 'デザート'];

const table_row_num = 6; //注文ターブルの列数(theadは除く)
const table_column_num = 4;

let ordering = [];   //現在検討中の注文
const ordered = [];    //注文済のスタック

//オブジェクトの要素
// image:画像, cost:値段
const items = [
  [
    {name:'まぐろ', image: 'img/nigiri01.jpg', cost: 100},
    {name:'びんとろ', image: 'img/nigiri02.jpg', cost: 150},
    {name:'中とろ', image: 'img/nigiri03.jpg', cost: 250},
    {name:'サーモン', image: 'img/nigiri04.jpg', cost: 100},
    {name:'たい', image: 'img/nigiri05.jpg', cost: 100},
    {name:'はまち', image: 'img/nigiri06.jpg', cost: 150},
  ], 

  [
    {name:'ほたて', image: 'img/nigiri07.jpg', cost: 150},
    {name:'甘えび', image: 'img/nigiri08.jpg', cost: 100},
    {name:'いか', image: 'img/nigiri09.jpg', cost: 100},
    {name:'さば', image: 'img/nigiri10.jpg', cost: 100},
    {name:'あなご', image: 'img/nigiri11.jpg', cost: 200},
    {name:'たまご', image: 'img/nigiri12.jpg', cost: 100},
  ], 
  [
    {name:'いかげそ', image: 'img/nigiri13.jpg', cost: 150},
    {name:'炙りえんがわ', image: 'img/nigiri14.jpg', cost: 100},
    {name:'かずのこ', image: 'img/nigiri15.jpg', cost: 100},
    {name:'いわし', image: 'img/nigiri16.jpg', cost: 100},
    {name:'ローストビーフ', image: 'img/nigiri17.jpg', cost: 150},
    {name:'松坂牛', image: 'img/nigiri18.jpg', cost: 200},
  ],
  [
    {name:'いくら', image: 'img/gunkan01.jpg', cost: 100},
    {name:'ねぎトロ', image: 'img/gunkan02.jpg', cost: 150},
    {name:'うに', image: 'img/gunkan03.jpg', cost: 200},
    {name:'かに', image: 'img/gunkan04.jpg', cost: 250},
    {name:'納豆まき', image: 'img/gunkan05.jpg', cost: 100},
    {name:'恵方まき', image: 'img/gunkan06.jpg', cost: 300},
  ],
  [
    {name:'茶碗蒸し', image: 'img/siru01.jpg', cost: 180},
    {name:'味噌汁', image: 'img/siru02.jpg', cost: 100},
    {name:'豚汁', image: 'img/siru03.jpg', cost: 150},
    {name:'醤油ラーメン', image: 'img/siru04.jpg', cost: 500},
    {name:'豚骨ラーメン', image: 'img/siru05.jpg', cost: 600},
    {name:'味噌ラーメン', image: 'img/siru06.jpg', cost: 600},
  ],
  [
    {name:'メロンケーキ', image: 'img/dessert01.jpg', cost: 250},
    {name:'アップルパイ',image: 'img/dessert02.jpg', cost: 300},
    {name:'ベリームース', image:'img/dessert03.jpg', cost: 300},
    {name:'スイカ', image: 'img/dessert04.jpg', cost: 200},
    {name:'オレンジジュース', image: 'img/dessert05.jpg', cost: 180},
    {name:'キウイジュース', image: 'img/dessert06.jpg', cost: 180}
  ]
];

//商品画像の描画
function add_item_image(menu_index){
  items[menu_index].forEach((item,image_index) =>{
    const img = document.createElement('img');
    img.src = item.image; 
    const li = document.createElement('li');
    li.appendChild(img);
    document.querySelector('.sushi').appendChild(li);
    const item_name = document.createElement('item_name');
    li.appendChild(item_name);
    item_name.textContent = items[menu_index][image_index].name;

    const item_cost = document.createElement('item_cost');
    li.appendChild(item_cost);
    item_cost.textContent = items[menu_index][image_index].cost+'円+税';
    
    //商品ボタンが押下されたときの処理
    li.addEventListener('click',()=>{
      let flag = true;   //既に表に入っているか？のフラグ
      const now_tap = items[menu_index][image_index].name;
      //既に表に入っていたら数を増やす
      for(let i=0;i<ordering.length;i++){
        if(now_tap === ordering[i].name){
          if(ordering[i].num<9)
            ordering[i].num++;
          flag = false;
          change_table(ordering);
        }
      }
      if(ordering.length<table_row_num && flag === true){
        let now_item = items[menu_index][image_index];
        ordering.push({name:now_item.name, cost:now_item.cost, num:1});
        change_table(ordering);
        // if(ordering.length===table_row_num)
          // change_order_bottun_to_push();  //あとで
      }
    });
  });
}

//直前の商品画像を消去
function remove_item_image(){
  for(let i=0;i<table_row_num;i++){
    const img2 = document.querySelector('.sushi > li');
    img2.remove();
  }
}

//商品画像の変更
function change_item_image(menu_index){
  remove_item_image();
  add_item_image(menu_index);
}

//表の描画
function add_table(ordering){
  for(let i=0;i<table_row_num;i++){
    const tr = document.createElement('tr');
    const now_tr_info = ordering[i];
    for(let j=0;j<table_column_num;j++){
      const td = document.createElement('td');
      tr.append(td);
      if(now_tr_info === undefined) continue;
      if(j===0)
          td.textContent = now_tr_info.name;
      if(j===1)
        td.textContent = now_tr_info.num;
      if(j==2){
        const inc = document.createElement('inc');  //増
        inc.textContent = '＋';
        inc.classList.add('inc_dec');
        td.appendChild(inc);
        inc.addEventListener('click',() =>{
          if(ordering[i].num<9)   //一回で頼める上限は9
            ordering[i].num++;
          change_table(ordering);
        });
      }
      if(j==3){
        const dec = document.createElement('dec');  //増
        dec.textContent = 'ー';
        dec.classList.add('inc_dec');
        td.appendChild(dec);
        dec.addEventListener('click',() =>{
          ordering[i].num--;
          if(ordering[i].num==0){
            ordering.splice(i,1);
          }
          change_table(ordering);
        });
      }
    }
    document.querySelector('tbody').appendChild(tr);
  }
}

//直前の表を削除
function remove_table(){
  for(let i=0;i<table_row_num;i++){
    const table = document.querySelector('tbody > tr');
    table.remove();
  }
}

//表の変更
function change_table(ordering){
  remove_table();
  add_table(ordering);
}

//現在のページ数の表記
function write_page_num(now_page_index){
  const now_page = document.createElement('now_page');
  // now_page.textContent = now_page_index+1 + '　/　6'
  now_page.textContent = `${now_page_index+1}　/　6`;
  document.querySelector('.main').appendChild(now_page);
}

//現在ページの消去
function erase_page_num(){
  const now_page = document.querySelector('now_page');
  now_page.remove();
}

//現在ページの変更
function change_page_num(now_page_index){
  erase_page_num();
  write_page_num(now_page_index);
}

//初期値
let current_menu_index = 0;
//商品画像の描画(初期)
add_item_image(current_menu_index);
//ページの描画(初期)
write_page_num(current_menu_index);
//表の描画(初期)
add_table(0);

//メニュータブの描画及び、メニュータブの遷移に応じて変化する要素
menus.forEach((menu,menu_index) =>{
  const me = document.createElement('me');
  me.src = menu;
  const li = document.createElement('li');
  if(menu_index === current_menu_index){
    li.classList.add('pushed')
  }

  li.addEventListener('click',()=>{
    const menu_buttons = document.querySelectorAll('.menu_buttons > li');
    menu_buttons[current_menu_index].classList.remove('pushed');
    current_menu_index = menu_index;
    menu_buttons[current_menu_index].classList.add('pushed')
    change_item_image(menu_index);
    const next = document.querySelector('#next');
    change_page_num(current_menu_index);
  });

  li.appendChild(me);
  document.querySelector('.menu_buttons').appendChild(li);
  li.textContent = menus[menu_index];

});

//次へ処理
const next = document.getElementById('next');
next.addEventListener('click',()=>{
  let target = current_menu_index + 1;
  if(target === menus.length){
    target = 0;
  }
  document.querySelectorAll('.menu_buttons > li')[target].click();
});

//前へ処理
const prev = document.getElementById('prev');
prev.addEventListener('click',()=>{
  let target = current_menu_index - 1;
  if(target < 0){
    target = menus.length-1;
  }
  document.querySelectorAll('.menu_buttons > li')[target].click();
});

//注文ボタンが押下されたときの処理
const order = document.getElementById('order');
order.addEventListener('click',()=>{
  alert('ご注文が完了しました!');
  const history = JSON.parse(localStorage.getItem('ordered_items'));
  const ordered = [];
  if(history){
    for(let i=0;i<history.length;i++){
      ordered.push(history[i]);
    }
  }
  for(let i=0;i<ordering.length;i++){
    ordered.push(ordering[i]);
  }
  ordering = [];
  change_table(ordering);
  localStorage.removeItem('ordered_items');
  localStorage.setItem('ordered_items',JSON.stringify(ordered))
});

//注文履歴ボタンが押下されたときの処理
const history = document.getElementById('history');
history.addEventListener('click',()=>{
  if(ordering){
    const answer = confirm('選択中の商品がある場合、取り消されますがよろしいですか?');
    if(answer){
      window.location.href = "history.html";
    }
  }
});

//ゲームボタンが押下されたときの処理
const game = document.getElementById('game');
game.addEventListener('click',()=>{
  if(ordering){
    const answer = confirm('選択中の商品がある場合、取り消されますがよろしいですか?');
    if(answer){
      window.location.href = "game.html";
    }
  }
});

//会計ボタンが押下されたときの処理
const check = document.getElementById('check');
check.addEventListener('click',()=>{
  if(ordering){
    const answer = confirm('お会計でよろしいですか?');
    if(answer){
      window.location.href = "checkout.html";
    }
  }
});

//注文スタックが一杯だったら注文を促す
//あとでアニメーション付きで
// function change_order_bottun_to_push(){
//   console.log('push!');
//   const order2 = document.getElementById('order')
//   // const test = order2.classList.remove('order_button');
//   const test = order2.classList.add('want_push');
//   console.log(test);
// }

}
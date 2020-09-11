'use strict';
{
  const table_column_num = 4;

  let ordered_items = JSON.parse(localStorage.getItem('ordered_items'));

  const table_row_num = ordered_items.length;
  // console.log(table_row_num);

  for(let i=0;i<table_row_num;i++){
    const tr = document.createElement('tr');
    const current = ordered_items[i];
    for(let j=0;j<table_column_num;j++){
      const td = document.createElement('td');
      tr.append(td);
      if(current === undefined) continue;
      if(j===0)
      td.textContent = i+1;
      if(j===1)
          td.textContent = current.name;
      if(j===2)
        td.textContent = current.num;
      if(j===3){
        td.textContent = current.cost;
      }
    }
    document.querySelector('tbody').appendChild(tr);
  }



}

    
function calculatePercentChange(currentDay, yesterday) {
  return ((currentDay - yesterday) / yesterday * 100).toFixed(2);
}


function showChart(indicator, currentDay, yesterday, dayOfWeek) {
 
  const percentChange = calculatePercentChange(currentDay, yesterday);
  
 
  const row = document.getElementById('row-' + indicator);
  const tdV = row.cells[2];
  tdV.innerHTML = `${yesterday} (${percentChange}%)`;

  let data;
  let title;

  switch(indicator) {
    case 'revenue':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Выручка';
      break;
    case 'cash':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Наличные';
      break;
    case 'card_payment':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Безналичный расчет';
      break;
    case 'credit_cards':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Кредитные карты';
      break;
    case 'avg_check':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Средний чек';
      break;
    case 'avg_guest':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Средний гость';
      break;
    case 'check_removal_after':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Удаление из чека (после оплаты)';
      break;
    case 'check_removal_before':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Удаление из чека (до оплаты)';
      break;
    case 'check_count':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Количество чеков';
      break;
    case 'guest_count':
      data = [currentDay, yesterday, dayOfWeek];
      title = 'Количество гостей';
      break;
  }

  Highcharts.chart('chartContainer', {
    chart: {
      type: 'line'
    },
    title: {
      text: title
    },
    xAxis: {
      categories: ['Текущий день', 'Вчера', 'Этот день недели']
    },
    yAxis: {
      title: {
        text: 'Значения'
      }
    },
    series: [{
      name: title,
      data: data
    }]
  });
}


document.addEventListener("DOMContentLoaded", function() {
  const rows = document.querySelectorAll('tr');
  rows.forEach(row => {
    const tdCurrent = parseFloat(row.cells[1]?.innerText);
    const tdYesterday = parseFloat(row.cells[2]?.innerText);
    if ((tdCurrent) && (tdYesterday)) {
      const percentChange = calculatePercentChange(tdCurrent, tdYesterday);
      const tdV = row.cells[2];
      tdV.innerHTML = `${tdYesterday} (${percentChange}%)`;
    }
  });
});

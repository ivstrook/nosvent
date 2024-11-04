// グローバル変数
let eventListData = []; // 予定のデータを保持

// 予定を追加する関数
function addEvent(date, text, user, url) {
    const existingEventIndex = eventListData.findIndex(e => e.date === date);
    
    if (existingEventIndex > -1) {
        // 既存の予定を更新
        eventListData[existingEventIndex] = { date, text, user, url };
    } else {
        // 新しい予定を追加
        eventListData.push({ date, text, user, url });
    }
}

// カレンダーを描画する関数
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // カレンダーをリセット

    const year = 2024;
    const month = 11; // 12月（0から始まるので11）
    const daysInMonth = 25; // 25日まで表示
    const startDate = new Date(year, month, 1);
    const startDay = startDate.getDay(); // 1日の曜日

    const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];
    dayLabels.forEach(label => {
        const labelDiv = document.createElement('div');
        labelDiv.className = 'calendar-day day-label';
        labelDiv.textContent = label;
        calendar.appendChild(labelDiv);
    });

    // 空のセルを追加
    for (let i = 0; i < startDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-day';
        calendar.appendChild(emptyDiv);
    }

    // 日付のセルを追加
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const formattedDate = date.toISOString().split('T')[0];
        const eventForDate = eventListData.find(event => event.date === formattedDate);
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';

        if (eventForDate) {
            dayDiv.classList.add('has-event');
            dayDiv.innerHTML = `<span class="small-date">${day}</span><br>${eventForDate.text}<br>登録者: ${eventForDate.user}`;
        } else {
            dayDiv.textContent = day; // 予定がない場合は通常表示
        }

        // 日付セルをクリックすると予定を追加
        dayDiv.onclick = () => {
            if (eventForDate) {
                alert(`投稿のURL: ${eventForDate.url}`);
            } else {
                openEventModal(date);
            }
        };

        calendar.appendChild(dayDiv);
    }
}

// モーダルを開く関数
function openEventModal(date) {
    const modal = document.getElementById('eventModal');
    modal.style.display = "block";
    document.getElementById('modalEventInput').value = '';
    document.getElementById('modalUserInput').value = '';
    document.getElementById('modalUrlInput').value = ''; // URL入力フィールドのリセット
    document.getElementById('saveEventButton').onclick = () => {
        saveEvent(date);
    };
}

// 予定を保存する関数
function saveEvent(date) {
    const eventText = document.getElementById('modalEventInput').value;
    const userName = document.getElementById('modalUserInput').value; // 登録者名を取得
    const eventUrl = document.getElementById('modalUrlInput').value; // URLを取得

    if (eventText && userName && eventUrl) { // 予定と登録者名、URLがある場合
        const formattedDate = date.toISOString().split('T')[0];
        addEvent(formattedDate, eventText, userName, eventUrl);
        renderCalendar(); // カレンダーを再描画
        closeEventModal(); // モーダルを閉じる
    } else {
        alert('予定、登録者名、URLを入力してください');
    }
}

// モーダルを閉じる関数
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = "none";
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(); // ページロード時にカレンダーを表示
    const closeModalButton = document.querySelector('.close');
    closeModalButton.onclick = closeEventModal; // モーダルの閉じるボタンの処理
});

document.getElementById('createCalendar').addEventListener('click', function() {
    // 新しいカレンダーを作成するロジック
    const newCalendarId = 'calendar_' + Date.now(); // ユニークなIDを生成
    const iframe = document.getElementById('calendarFrame');
    iframe.src = `./calendar.html?id=${newCalendarId}`; // 新しいカレンダーを読み込む

    alert('新しいカレンダーが作成されました: ' + newCalendarId);
});

document.getElementById('generateURL').addEventListener('click', function() {
    const iframe = document.getElementById('calendarFrame');
    const currentURL = iframe.src;
    document.getElementById('calendarURL').value = currentURL; // URLを入力フィールドに表示
});

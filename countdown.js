
// File: countdown.js

const targetTime = new Date();
targetTime.setHours(19, 30, 0, 0); // تحديد الساعة 7:30 مساءً

function updateCountdown() {
    const now = new Date();
    const remainingTime = targetTime - now;

    if (remainingTime <= 0) {
        document.getElementById('countdownTimer').innerHTML = "حان وقت بدء المسابقة!";
        // بداية المسابقة أو عرض السؤال
        displayQuestion();
    } else {
        const minutes = Math.floor(remainingTime / 1000 / 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        document.getElementById('countdownTimer').innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function displayQuestion() {
    // عرض السؤال هنا مع الإجابات
    const question = "ما هو أول سؤال في المسابقة؟";
    const options = ["الإجابة 1", "الإجابة 2", "الإجابة 3", "الإجابة 4"];
    
    document.getElementById('quiz').innerHTML = `
        <h3>${question}</h3>
        <ul>
            ${options.map(option => `<li>${option}</li>`).join('')}
        </ul>
    `;
}

setInterval(updateCountdown, 1000); // تحديث العد التنازلي كل ثانية

// عرض بيانات المستخدم
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.getElementById('currentUsername').textContent = currentUser.username;
}

// تعديل بيانات المستخدم
function editProfile() {
    const newUsername = prompt("أدخل الاسم الجديد:");
    if (newUsername) {
        currentUser.username = newUsername;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("تم تعديل الاسم بنجاح!");
        document.getElementById('currentUsername').textContent = newUsername;
    }
}



// File: admin-dashboard.js

// زر البدء والإيقاف
document.getElementById("startStopButton").addEventListener("click", function () {
    const currentState = this.innerText === "بدء المسابقة" ? "start" : "stop";
    if (currentState === "start") {
        this.innerText = "إيقاف المسابقة";
        // بدء العد التنازلي
        localStorage.setItem("quizState", "started");
        startQuiz();
    } else {
        this.innerText = "بدء المسابقة";
        // إيقاف العد التنازلي
        localStorage.setItem("quizState", "stopped");
        stopQuiz();
    }
});

// عرض المستخدمين بناءً على الفلتر
document.getElementById("userFilter").addEventListener("change", function () {
    const filterValue = this.value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    let filteredUsers;
    if (filterValue === "all") {
        filteredUsers = users;
    } else if (filterValue === "active") {
        filteredUsers = users.filter(user => user.isOnline === true);
    } else if (filterValue === "banned") {
        filteredUsers = users.filter(user => user.isBanned === true);
    } else if (filterValue === "inactive") {
        filteredUsers = users.filter(user => !user.isOnline);
    }

    displayUsers(filteredUsers);
});

// عرض قائمة المستخدمين
function displayUsers(users) {
    const userListContainer = document.getElementById("userList");
    userListContainer.innerHTML = ""; // إعادة تعيين المحتوى

    if (users.length === 0) {
        userListContainer.innerHTML = "<p>لا يوجد مستخدمين مطابقين لهذا الفلتر.</p>";
        return;
    }

    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");

        userDiv.innerHTML = `
            <p>الاسم: ${user.username}</p>
            <p>معرف المستخدم: ${user.id}</p>
            <p>آخر دخول: ${user.lastLogin}</p>
            <button onclick="banUser('${user.id}')">حظر</button>
            <button onclick="unbanUser('${user.id}')">رفع الحظر</button>
        `;
        userListContainer.appendChild(userDiv);
    });
}

// حظر مستخدم
function banUser(userId) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === userId);
    if (user) {
        user.isBanned = true;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`تم حظر المستخدم ${user.username}`);
    }
}

// رفع الحظر عن مستخدم
function unbanUser(userId) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === userId);
    if (user) {
        user.isBanned = false;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`تم رفع الحظر عن المستخدم ${user.username}`);
    }
}

// إرسال إشعار لمستخدم معين
function sendMessage() {
    const userCode = document.getElementById("userCode").value;
    const message = document.getElementById("message").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === userCode);

    if (user) {
        alert(`تم إرسال الرسالة للمستخدم ${user.username}: ${message}`);
    } else {
        alert("المستخدم غير موجود.");
    }
}

// تحديث السؤال والإجابات
function updateQuiz() {
    const question = document.getElementById("quizQuestion").value;
    const answers = document.getElementById("quizAnswers").value.split(";");

    if (question && answers.length > 0) {
        localStorage.setItem("quizQuestion", question);
        localStorage.setItem("quizAnswers", JSON.stringify(answers));

        alert("تم تحديث السؤال والإجابات.");
    } else {
        alert("يرجى إدخال جميع البيانات.");
    }
}

// بدء المسابقة
function startQuiz() {
    const quizState = localStorage.getItem("quizState");
    if (quizState === "started") {
        // هنا يمكنك إضافة منطق لبدء عرض الأسئلة والإجابات
    }
}

// إيقاف المسابقة
function stopQuiz() {
    // منطق لإيقاف المسابقة وإخفاء الأسئلة
}




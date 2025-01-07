
// File: scripts.js

// تفعيل نموذج التسجيل
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    // التحقق من صحة كلمة المرور
    if (!validatePassword(password)) {
        alert("كلمة المرور يجب أن تحتوي على 7 أحرف على الأقل، مع حرف ورقم.");
        return;
    }

    // التحقق من وجود المستخدم بالفعل
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.username === username)) {
        alert("اسم المستخدم هذا موجود بالفعل. يرجى اختيار اسم آخر.");
        return;
    }

    // حفظ بيانات المستخدم
    const user = { username, password, id: generateUniqueId() };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert(`تم إنشاء الحساب بنجاح! معرف المستخدم هو: ${user.id}`);

    // التوجيه إلى صفحة العد التنازلي بعد التسجيل
    window.location.href = 'countdown.html';
});

// التحقق من كلمة المرور
function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    return regex.test(password);
}

// إنشاء معرف فريد للمستخدم
function generateUniqueId() {
    return 'ID' + Math.random().toString(36).substr(2, 9);
}

// التحقق من تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // التحقق من المستخدمين المخزنين في localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = 'countdown.html'; // التوجيه لصفحة العد التنازلي
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
    }
});


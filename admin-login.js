
// File: admin-login.js
document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const adminPassword = document.getElementById("adminPassword").value;

    if (adminPassword === "1234567890") {
        window.location.href = "admin-dashboard.html"; // التوجيه لصفحة الأدمن
    } else {
        alert("كلمة المرور غير صحيحة.");
    }
});



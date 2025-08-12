// =========================
// Lớp cha Account (Tài khoản chung cho user và admin)
// =========================
class Account {
    constructor(id, userName, password, role) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.isLogin = false; // mặc định chưa đăng nhập
    }
    // Phương thức đăng nhập
    login(userName, password) {
        // Kiểm tra tên đăng nhập và mật khẩu có đúng không
        if (this.userName === userName && this.password === password) {
            this.isLogin = true; // Đặt trạng thái đã đăng nhập
            console.log(`${this.userName} đăng nhập thành công`);
        }
        else {
            console.log("Sai tên đăng nhập hoặc mật khẩu");
        }
    }
    // Phương thức đăng xuất
    logout() {
        if (this.isLogin) {
            this.isLogin = false; // Đặt trạng thái chưa đăng nhập
            console.log(`${this.userName} đã đăng xuất`);
        }
        else {
            console.log("Bạn chưa đăng nhập, không thể đăng xuất");
        }
    }
}
// =========================
// Lớp userAcc (tài khoản người dùng thường)
// =========================
class userAcc extends Account {
    constructor(id, userName, password, role, status) {
        super(id, userName, password, role); // Gọi constructor của lớp cha
        this.status = status;
    }
    // Ghi đè phương thức login
    login(userName, password) {
        // Nếu tài khoản bị khóa thì không cho đăng nhập
        if (this.status === "banned") {
            console.log(`Tài khoản ${this.userName} đã bị khóa`);
            return;
        }
        // Nếu đang active thì gọi login của lớp cha
        if (this.status === "active") {
            super.login(userName, password);
        }
        else {
            console.log("Trạng thái tài khoản không hợp lệ");
        }
    }
    // Cho phép admin thay đổi trạng thái tài khoản
    setStatus(newStatus) {
        this.status = newStatus;
    }
    // Lấy trạng thái tài khoản
    getStatus() {
        return this.status;
    }
}
// =========================
// Lớp adminAcc (tài khoản quản trị)
// =========================
class adminAcc extends Account {
    // Hàm khóa tài khoản user
    banUser(user) {
        user.setStatus("banned"); // Gọi phương thức setStatus của user
        console.log(`Người dùng ${user["userName"]} đã bị khóa`);
    }
}
// =========================
// --- Test chương trình ---
// =========================
// Tạo 2 user và 1 admin
const user1 = new userAcc(1, "linh", "123", "user", "active");
const user2 = new userAcc(2, "hoang", "456", "user", "active");
const admin = new adminAcc(99, "admin", "adminpass", "admin");
// user1 đăng nhập thành công
user1.login("linh", "123"); // Output: linh đăng nhập thành công
// admin khóa user1
admin.banUser(user1); // Output: Người dùng linh đã bị khóa
// user1 thử đăng nhập lại sau khi bị khóa
user1.login("linh", "123"); // Output: Tài khoản linh đã bị khóa

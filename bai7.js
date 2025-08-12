// =========================
// Lớp cha Account (Tài khoản chung)
// =========================
class Account {
    // Hàm khởi tạo
    constructor(accountNumber, balance = 0, history = [], status = true) {
        this.accountNumber = accountNumber; // Gán số tài khoản
        this.balance = balance; // Gán số dư ban đầu
        this.history = history; // Gán lịch sử giao dịch
        this.status = status; // Gán trạng thái
    }
    // Hàm gửi tiền
    deposit(amount) {
        this.balance += amount; // Cộng số tiền vào số dư
        this.history.push(`Gửi tiền: +${amount}`); // Lưu lại lịch sử giao dịch
    }
    // Hàm rút tiền
    withdraw(amount) {
        if (amount <= this.balance) { // Kiểm tra số dư đủ để rút
            this.balance -= amount; // Trừ số tiền rút
            this.history.push(`Rút tiền: -${amount}`); // Lưu lịch sử giao dịch
        }
        else {
            console.log("Số dư không đủ."); // Thông báo nếu không đủ tiền
        }
    }
    // Hàm in ra lịch sử giao dịch
    showHistory() {
        console.log("Lịch sử giao dịch:");
        this.history.forEach((transaction) => {
            console.log(transaction); // In từng dòng giao dịch
        });
    }
}
// =========================
// Lớp con SavingAccount (Tài khoản tiết kiệm)
// =========================
class SavingAccount extends Account {
    // Hàm khởi tạo của SavingAccount
    constructor(accountNumber, interestRate) {
        super(accountNumber); // Gọi lại constructor của lớp cha, truyền số tài khoản
        this.interestRate = interestRate; // Gán lãi suất
    }
    // Ghi đè phương thức rút tiền
    withdraw(amount) {
        if (amount <= this.balance) { // Kiểm tra số dư
            const availableWithdrawal = Math.min(amount, this.balance); // Số tiền rút tối đa = số dư
            this.balance -= availableWithdrawal; // Trừ số tiền rút
            this.history.push(`Rút tiền: -${availableWithdrawal}`); // Lưu lịch sử
        }
        else {
            console.log("Số dư không đủ."); // Nếu không đủ thì báo lỗi
        }
    }
    // Hàm cộng tiền lãi vào tài khoản
    addInterest() {
        const interest = this.balance * this.interestRate; // Tính tiền lãi
        this.deposit(interest); // Gửi tiền lãi vào tài khoản (tự động lưu lịch sử gửi tiền)
        this.history.push(`Nhận lãi: +${interest}`); // Lưu lịch sử nhận lãi
    }
}
// =========================
// Chạy thử chương trình
// =========================
// Tạo tài khoản tiết kiệm với số tài khoản "123456789" và lãi suất 5%
const savingAccount = new SavingAccount("123456789", 0.05);
// Gửi 1000 vào tài khoản
savingAccount.deposit(1000);
// Rút 500
savingAccount.withdraw(500);
// Thử rút 600 (sẽ không đủ tiền)
savingAccount.withdraw(600);
// In ra lịch sử giao dịch
savingAccount.showHistory();
// Cộng lãi vào tài khoản
savingAccount.addInterest();
// In lại lịch sử giao dịch sau khi cộng lãi
savingAccount.showHistory();

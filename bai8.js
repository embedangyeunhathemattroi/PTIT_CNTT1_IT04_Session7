// ===== Lớp cha Account =====
class Account {
    constructor(accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0; // Mặc định số dư = 0
        this.history = []; // Ban đầu chưa có giao dịch nào
        this.status = true; // Mặc định tài khoản đang hoạt động
    }
    // Nạp tiền vào tài khoản
    deposit(amount) {
        this.balance += amount; // Cộng tiền vào số dư
        this.history.push(`Gửi tiền: +${amount}`); // Lưu lịch sử
    }
    // Rút tiền (chỉ rút khi đủ số dư)
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount; // Trừ tiền
            this.history.push(`Rút tiền: -${amount}`); // Lưu lịch sử
        }
        else {
            console.log("Số dư không đủ.");
        }
    }
    // Hiển thị lịch sử giao dịch
    showHistory() {
        console.log(`\nLịch sử giao dịch của tài khoản ${this.accountNumber}:`);
        this.history.forEach((transaction) => {
            console.log(transaction);
        });
    }
}
// ===== Lớp SavingAccount (Tài khoản tiết kiệm) =====
class SavingAccount extends Account {
    constructor(accountNumber, interestRate) {
        super(accountNumber); // Gọi constructor lớp cha
        this.interestRate = interestRate; // Gán lãi suất
    }
    // Ghi đè phương thức rút tiền: chỉ rút khi đủ số dư
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.history.push(`Rút tiền: -${amount}`);
        }
        else {
            console.log("Số dư không đủ.");
        }
    }
    // Nhận lãi: cộng thêm vào số dư
    addInterest() {
        const interest = this.balance * this.interestRate; // Tính số tiền lãi
        this.deposit(interest); // Gọi deposit để cộng vào số dư và lưu lịch sử
        this.history.push(`Nhận lãi: +${interest}`); // Ghi rõ đây là lãi
    }
}
// ===== Lớp CheckingAccount (Tài khoản thanh toán) =====
class CheckingAccount extends Account {
    constructor(accountNumber, overdraftLimit) {
        super(accountNumber); // Gọi constructor lớp cha
        this.overdraftLimit = overdraftLimit; // Gán giới hạn thấu chi
    }
    // Ghi đè phương thức rút tiền: cho phép rút vượt số dư đến overdraftLimit
    withdraw(amount) {
        const maxAvailable = this.balance + this.overdraftLimit; // Tổng tiền có thể rút
        if (amount <= maxAvailable) {
            this.balance -= amount; // balance có thể bị âm
            this.history.push(`Rút tiền: -${amount}`);
        }
        else {
            console.log("Vượt quá giới hạn thấu chi.");
        }
    }
}
// ================== TEST ==================
// --- SavingAccount ---
const savingAccount = new SavingAccount("123456789", 0.05); // Lãi suất 5%
savingAccount.deposit(1000); // Nạp 1000
savingAccount.withdraw(500); // Rút 500
savingAccount.withdraw(600); // Không đủ tiền -> báo lỗi
savingAccount.addInterest(); // Cộng lãi 5% vào số dư
savingAccount.showHistory(); // Xem lịch sử giao dịch
// --- CheckingAccount ---
const checkingAccount = new CheckingAccount("987654321", 500); // Giới hạn thấu chi 500
checkingAccount.deposit(1000); // Nạp 1000
checkingAccount.withdraw(1200); // Rút 1200 (vượt số dư 200 nhưng trong hạn mức thấu chi)
checkingAccount.withdraw(400); // Rút thêm 400 -> vượt quá giới hạn thấu chi -> báo lỗi
checkingAccount.showHistory(); // Xem lịch sử giao dịch

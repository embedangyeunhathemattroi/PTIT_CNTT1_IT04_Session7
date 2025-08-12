// =======================
// Lớp MenuItem - Đại diện cho 1 món ăn / thức uống
// =======================
class MenuItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
// =======================
// Lớp Table - Đại diện cho 1 bàn ăn
// =======================
class Table {
    constructor(id, capacity, available = true) {
        this.id = id;
        this.capacity = capacity;
        this.available = available; // Mặc định bàn trống khi tạo
    }
}
// =======================
// Lớp Reservation - Thông tin đặt bàn
// =======================
class Reservation {
    constructor(id, customerName, tableId) {
        this.id = id;
        this.customerName = customerName;
        this.tableId = tableId;
    }
}
// =======================
// Lớp Order - Đơn đặt món
// =======================
class Order {
    constructor(id, tableId, items) {
        this.id = id;
        this.tableId = tableId;
        this.items = items;
    }
    // Tính tổng tiền đơn hàng
    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}
// =======================
// Lớp Restaurant - Quản lý nhà hàng
// =======================
class Restaurant {
    constructor() {
        this.menu = [];
        this.tables = [];
        this.reservations = [];
        this.orders = [];
    }
    // Thêm món mới vào menu
    addMenuItem(item) {
        this.menu.push(item);
    }
    // Thêm bàn mới
    addTable(table) {
        this.tables.push(table);
    }
    // Đặt bàn
    makeReservation(reservationId, customerName, tableId) {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) {
            console.log("Không tìm thấy bàn!");
            return;
        }
        if (!table.available) {
            console.log(`Bàn số ${tableId} đã được đặt trước!`);
            return;
        }
        table.available = false; // Đánh dấu bàn đã được đặt
        const reservation = new Reservation(reservationId, customerName, tableId);
        this.reservations.push(reservation);
        console.log(`Đặt bàn số ${tableId} thành công cho khách ${customerName}.`);
    }
    // Đặt món ăn cho bàn đã đặt
    placeOrder(orderId, tableId, itemIds) {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) {
            console.log("Không tìm thấy bàn!");
            return;
        }
        if (table.available) {
            console.log(`Bàn số ${tableId} chưa được đặt, không thể gọi món!`);
            return;
        }
        // Lấy danh sách món ăn từ menu dựa vào itemIds
        const orderItems = this.menu.filter(item => itemIds.includes(item.id));
        const order = new Order(orderId, tableId, orderItems);
        this.orders.push(order);
        console.log(`Đã đặt món cho bàn số ${tableId}.`);
    }
    // Tính tiền & thanh toán
    generateBill(tableId) {
        const order = this.orders.find(o => o.tableId === tableId);
        if (!order) {
            console.log("Không tìm thấy đơn hàng của bàn này!");
            return;
        }
        const total = order.getTotal(); // Tính tổng tiền
        console.log(`Tổng tiền bàn ${tableId}: ${total} VND`);
        // Đánh dấu bàn trống lại
        const table = this.tables.find(t => t.id === tableId);
        if (table) {
            table.available = true;
        }
        console.log(`Bàn ${tableId} đã sẵn sàng cho khách mới.`);
    }
}
// =======================
// Demo Chạy thử
// =======================
const restaurant = new Restaurant();
// Thêm món ăn vào menu
restaurant.addMenuItem(new MenuItem(1, "Phở bò", 50000));
restaurant.addMenuItem(new MenuItem(2, "Bánh mì", 20000));
restaurant.addMenuItem(new MenuItem(3, "Cà phê sữa", 25000));
// Thêm bàn
restaurant.addTable(new Table(1, 4)); // Bàn số 1, 4 chỗ
restaurant.addTable(new Table(2, 2)); // Bàn số 2, 2 chỗ
// Đặt bàn số 1 cho khách "Nguyễn Văn A"
restaurant.makeReservation(101, "Nguyễn Văn A", 1);
// Đặt món cho bàn số 1: Phở bò + Cà phê sữa
restaurant.placeOrder(201, 1, [1, 3]);
// Tính tiền và giải phóng bàn
restaurant.generateBill(1);

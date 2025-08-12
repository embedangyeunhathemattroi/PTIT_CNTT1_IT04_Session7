class MenuItem {
    public id: number;
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Table {
    public id: number;
    public capacity: number;
    public available: boolean;

    constructor(id: number, capacity: number, available: boolean = true) {
        this.id = id;
        this.capacity = capacity;
        this.available = available;
    }
}

class Reservation {
    public id: number;
    public customerName: string;
    public tableId: number;

    constructor(id: number, customerName: string, tableId: number) {
        this.id = id;
        this.customerName = customerName;
        this.tableId = tableId;
    }
}

class Order {
    public id: number;
    public tableId: number;
    public items: MenuItem[];

    constructor(id: number, tableId: number, items: MenuItem[]) {
        this.id = id;
        this.tableId = tableId;
        this.items = items;
    }

    public getTotal(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

class Restaurant {
    public menu: MenuItem[];
    public tables: Table[];
    public reservations: Reservation[];
    public orders: Order[];

    constructor() {
        this.menu = [];
        this.tables = [];
        this.reservations = [];
        this.orders = [];
    }

    public addMenuItem(item: MenuItem): void {
        this.menu.push(item);
    }

    public addTable(table: Table): void {
        this.tables.push(table);
    }

    public makeReservation(reservationId: number, customerName: string, tableId: number): void {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) {
            console.log("Không tìm thấy bàn!");
            return;
        }
        if (!table.available) {
            console.log(`Bàn số ${tableId} đã được đặt trước!`);
            return;
        }
        table.available = false;
        const reservation = new Reservation(reservationId, customerName, tableId);
        this.reservations.push(reservation);
        console.log(`Đặt bàn số ${tableId} thành công cho khách ${customerName}.`);
    }

    public placeOrder(orderId: number, tableId: number, itemIds: number[]): void {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) {
            console.lo

class Productos{
    constructor(title, price, thumbnail, timestamp, codigo, stock, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.timestamp = timestamp;
        this.codigo = codigo;
        this.stock = stock;
        this.id = id;
    }
}

module.exports = Productos;
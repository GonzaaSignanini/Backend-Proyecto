class Productos{
    constructor(id, title, timestamp, codigo, thumbnail, price, stock) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.timestamp = timestamp;
        this.stock = stock;
        this.codigo = codigo;
        this.id = id;
    }
}

module.exports = Productos;
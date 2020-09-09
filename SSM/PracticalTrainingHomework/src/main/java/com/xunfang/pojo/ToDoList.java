package com.xunfang.pojo;

public class ToDoList {
    private int toDoId;
    private int productId;
    private ToDo toDo;
    private ProductInfo product;
    private int price;
    private int totalPrice;

    //    Getter & Setter
    public int getToDoId() {
        return toDoId;
    }

    public void setToDoId(int toDoId) {
        this.toDoId = toDoId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public ToDo getToDo() {
        return toDo;
    }

    public void setToDo(ToDo toDo) {
        this.toDo = toDo;
    }

    public ProductInfo getProduct() {
        return product;
    }

    public void setProduct(ProductInfo product) {
        this.product = product;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "ToDoList{" +
                "toDoId=" + toDoId +
                ", productId=" + productId +
                ", toDo=" + toDo +
                ", product=" + product +
                ", price=" + price +
                ", totalPrice=" + totalPrice +
                '}';
    }
}

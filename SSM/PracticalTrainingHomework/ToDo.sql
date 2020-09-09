USE `eshop`;

-- 采购计划信息表
DROP TABLE IF EXISTS `todo_list`;
DROP TABLE IF EXISTS `todo_detail`;
CREATE TABLE `todo_detail` (
    `id` INT AUTO_INCREMENT COMMENT '计划ID',
    `name` VARCHAR(20) NOT NULL COMMENT '计划名称',
    `budget` INT NOT NULL COMMENT '预算（单位：分）',
    `ddl` DATETIME NOT NULL COMMENT '截止日期',
    /* 状态：
     * 1: 待采购
     * 2: 未到货
     * 3: 已完成
     */
    `status` INT NOT NULL COMMENT '状态',
    `readme` VARCHAR(50) COMMENT '相关文档路径',
    `buyerId` INT COMMENT '采购员ID',
    PRIMARY KEY(id)
) COMMENT '采购计划信息表';

-- 采购计划商品关系表
DROP TABLE IF EXISTS `todo_list`;
CREATE TABLE `todo_list` (
    `toDoId` INT COMMENT '计划ID',
    `productId` INT COMMENT '商品ID',
    FOREIGN KEY(toDoId) REFERENCES todo_detail(id),
    FOREIGN KEY(productId) REFERENCES product_info(id)
) COMMENT '采购计划商品关系表';

-- 采购计划信息测试内容
INSERT INTO `todo_detail`(`id`, `name`, `budget`, `ddl`, `status`, `readme`, `buyerId`) 
VALUES (1, '牛逼', '5000', '2020-05-12 00:00:00', 1, '', '-1'),
    (2, '卧槽', '3000', '2020-12-12 00:00:00', 2, '', '-1');
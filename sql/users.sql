/*
 Navicat Premium Data Transfer

 Source Server         : leafdb
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : leaf_admin

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 12/03/2024 22:39:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `headImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '1234', 'admin', 'http://192.168.2.181:2119/static/images/Snipaste_2022-07-21_14-41-49.jpg', '超级管理员');
INSERT INTO `users` VALUES (3, 'user', '1234', 'user', 'http://192.168.2.181:2119/static/images/Snipaste_2022-07-21_14-41-49.jpg', '游客');
INSERT INTO `users` VALUES (4, 'yilei', '1234', 'user', 'http://192.168.2.181:2119/static/images/Snipaste_2024-01-01_12-47-41.jpg', '易磊');
INSERT INTO `users` VALUES (6, 'gaojuan', '1234', 'user', 'http://192.168.2.181:2119/static/images/Snipaste_2024-01-01_12-47-41.jpg', '高娟');
INSERT INTO `users` VALUES (7, 'chengxiulan', '1234', 'user', 'http://192.168.2.181:2119/static/images/Snipaste_2024-01-01_12-47-41.jpg', '程秀兰');
INSERT INTO `users` VALUES (8, 'yujun', '1234', 'user', 'http://192.168.2.181:2119/static/images/Snipaste_2024-01-01_12-47-41.jpg', '于军');

SET FOREIGN_KEY_CHECKS = 1;

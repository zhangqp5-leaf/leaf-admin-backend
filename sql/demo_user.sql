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

 Date: 25/01/2024 23:54:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for demo_user
-- ----------------------------
DROP TABLE IF EXISTS `demo_user`;
CREATE TABLE `demo_user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '昵称',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '性别',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'demo的用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of demo_user
-- ----------------------------
INSERT INTO `demo_user` VALUES (1, 'Umi', 'u', 'MALE', NULL);
INSERT INTO `demo_user` VALUES (2, 'Fish', 'B', 'FEMALE', NULL);
INSERT INTO `demo_user` VALUES (6, '1', '2', 'MALE', '2024-01-25 22:22:32');
INSERT INTO `demo_user` VALUES (7, 'jisjaid', 'asdasd', 'FEMALE', '2024-01-25 22:32:49');
INSERT INTO `demo_user` VALUES (8, 'w', '2', 'FEMALE', '2024-01-25 23:35:10');

SET FOREIGN_KEY_CHECKS = 1;

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

 Date: 25/01/2024 23:52:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file_space
-- ----------------------------
DROP TABLE IF EXISTS `file_space`;
CREATE TABLE `file_space`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件中心分类名',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文件中心表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file_space
-- ----------------------------
INSERT INTO `file_space` VALUES (2, '朋友圈素材', '2024-01-05 00:00:00', NULL);
INSERT INTO `file_space` VALUES (38, '微信图片', '2024-01-13 19:56:29', NULL);
INSERT INTO `file_space` VALUES (43, 'demo', '2024-01-25 23:34:19', NULL);

SET FOREIGN_KEY_CHECKS = 1;

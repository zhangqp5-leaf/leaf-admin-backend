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

 Date: 25/01/2024 23:52:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file_space_list
-- ----------------------------
DROP TABLE IF EXISTS `file_space_list`;
CREATE TABLE `file_space_list`  (
  `classify_id` int NOT NULL COMMENT '分类id',
  `file_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件id',
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件名称',
  `size` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文件大小',
  `type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件类型',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件路径',
  `create_time` datetime NULL DEFAULT NULL COMMENT '上传时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `classify_id`(`classify_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文件中心文件列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file_space_list
-- ----------------------------
INSERT INTO `file_space_list` VALUES (38, 'rc-upload-1705141453067-22', 31, 'mmexport1521352291457.jpg', '80878', 'image/jpeg', 'http://192.168.2.181:2119/static/images/mmexport1521352291457.jpg', '2024-01-13 19:56:37');
INSERT INTO `file_space_list` VALUES (38, 'rc-upload-1705141453067-24', 32, 'Snipaste_2024-01-01_12-47-17.jpg', '218785', 'image/jpeg', 'http://192.168.2.181:2119/static/images/Snipaste_2024-01-01_12-47-17.jpg', '2024-01-13 19:57:13');
INSERT INTO `file_space_list` VALUES (2, 'rc-upload-1705141453067-26', 33, 'Snipaste_2024-01-01_12-47-41.jpg', '50882', 'image/jpeg', 'http://192.168.2.181:2119/static/images/Snipaste_2024-01-01_12-47-41.jpg', '2024-01-13 19:57:19');
INSERT INTO `file_space_list` VALUES (2, 'rc-upload-1705147952540-2', 34, 'mmexport1523774156693.jpeg', '51321', 'image/jpeg', 'http://192.168.2.181:2119/static/images/mmexport1523774156693.jpeg', '2024-01-13 20:12:41');
INSERT INTO `file_space_list` VALUES (2, 'rc-upload-1705771134339-2', 35, 'wallhaven-eyp66k.png', '2578676', 'image/png', 'http://192.168.2.181:2119/static/images/wallhaven-eyp66k.png', '2024-01-21 01:24:54');
INSERT INTO `file_space_list` VALUES (2, 'rc-upload-1705771134339-4', 36, 'wallhaven-ey6mok.png', '8658927', 'image/png', 'http://192.168.2.181:2119/static/images/wallhaven-ey6mok.png', '2024-01-21 01:25:14');
INSERT INTO `file_space_list` VALUES (43, 'rc-upload-1706196805738-2', 39, 'mmexport1523774151974.jpeg', '46429', 'image/jpeg', 'http://192.168.2.181:2119/static/images/mmexport1523774151974.jpeg', '2024-01-25 23:34:23');
INSERT INTO `file_space_list` VALUES (43, 'rc-upload-1706196805738-5', 40, 'mmexport1523774231959.jpeg', '61321', 'image/jpeg', 'http://192.168.2.181:2119/static/images/mmexport1523774231959.jpeg', '2024-01-25 23:37:52');
INSERT INTO `file_space_list` VALUES (2, 'rc-upload-1706196805738-7', 41, 'mmexport1523774234467.jpeg', '44249', 'image/jpeg', 'http://192.168.2.181:2119/static/images/mmexport1523774234467.jpeg', '2024-01-25 23:37:57');

SET FOREIGN_KEY_CHECKS = 1;

package com.package2.util;

import com.package2.pojo.TreeNode;

import java.util.ArrayList;
import java.util.List;

public class TreeBuild {
    public static List<TreeNode> buildtree(List<TreeNode> nodes, int id) {
        List<TreeNode> treeNodeList = new ArrayList<TreeNode>();

        for (TreeNode treeNode : nodes) {
//           判断每一个节点的父节点是否是 对应的节点 是 添加为子节点，子节点同时也会添加二级子节点
//           id：0 表示 根节点
//           0
            if (id == treeNode.getFid()) {
//                将该id作为 父节点与其他 节点进行 比较
                treeNode.setChildren(buildtree(nodes, treeNode.getId()));
                treeNodeList.add(treeNode);
            }
        }
        return treeNodeList;
    }
}
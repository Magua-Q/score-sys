<template>
  <div class="about">
    <h3 class="header">学生成绩查询</h3>
    <div class="query">
      <el-input v-model="input" placeholder="请输入学生身份证号" />
      <el-button type="primary" class="btn" @click="queryScore">查询</el-button>
    </div>
    <div class="result">
      <div v-if="!targetResult">
        <el-empty description="暂无数据" />
        <el-alert
          title="请输入学生身份证号,点击查询按钮！"
          type="warning"
          :show-icon="true"
          :closable="false"
        />
      </div>
      <el-descriptions
        title="成绩列表"
        direction="vertical"
        :column="1"
        border
        v-else
      >
        <el-descriptions-item label="姓名">{{
          targetResult.name
        }}</el-descriptions-item>

        <el-descriptions-item
          v-for="item in targetResult.scoreList"
          :key="item.subject"
          :label="item.subject"
          >{{ item.score }}</el-descriptions-item
        >
      </el-descriptions>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
const input = ref("");
const targetResult = ref("");
const studentsList = ref([
  {
    name: "张梦捷",
    id: 1001,
    message: "Foo",
    scoreList: [
      {
        subject: "语文",
        score: 90,
      },
      {
        subject: "数学",
        score: 90,
      },
      {
        subject: "英语",
        score: 90,
      },
    ],
  },
  {
    message: "Bar",
    name: "许康",
    id: 1002,
    scoreList: [
      {
        subject: "语文",
        score: 90,
      },
      {
        subject: "数学",
        score: 90,
      },
      {
        subject: "英语",
        score: 90,
      },
    ],
  },
]);
const queryScore = () => {
  console.log(input.value);
  const inputKey = Number(input?.value);
  console.log(inputKey);
  const _studentsList = studentsList?.value;
  const result = computed(() => {
    return _studentsList.find((item) => item.id === inputKey);
  });
  console.log(result.value);
  targetResult.value = result.value;
};
</script>
<style>
.query {
  display: flex;
  margin: 10px 0px 20px 0px;
}
.btn {
  margin-left: 10px;
}
.header {
  font-weight: 400;
}
</style>

<template>
  <div class="app-container">
    讲师列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="courseQuery.title" placeholder="审批人"></el-input>
      </el-form-item>
      <!-- <el-form-item label="讲师头衔">
        <el-input v-model="courseQuery.teacherId" placeholder="审批人"></el-input>
      </el-form-item> -->

    
      <el-form-item label="讲师头衔">
        <el-select v-model="courseQuery.status" clearable placeholder="活动区域">
          <el-option label="已发布" value="Normal"></el-option>
          <el-option label="未发布" value="Draft"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">{{(page - 1) * limit + scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="80"></el-table-column>
      <!-- <el-table-column prop="intro" label="简介" width="400"></el-table-column> -->
      <el-table-column label="课程状态" width="100">
        <template slot-scope="scope">{{scope.row.status === 'Draft' ? '未发布' : '已发布'}}</template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数"></el-table-column>
      <el-table-column prop="viewCount" label="浏览数"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="gmtModified" label="修改时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" round icon="el-icon-edit">编辑课程基本信息</el-button>
            <el-button type="primary" round icon="el-icon-edit">编辑大纲信息</el-button>
          </router-link>

          <el-button
            type="danger"
            round
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getList"
      v-bind:current-page="page"
      v-bind:page-size="limit"
      layout="total,  prev, pager, next, jumper"
      style="padding: 30px 0; text-align: center"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import course from "@/api/edu/course.js";
export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 4,
      total: 0,
      courseQuery: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page = 1) {
      //console.log(this.courseQuery.end);
      this.page = page;
      course.pageCourseCondition(this.page, this.limit, this.courseQuery)
        .then(response => {
          this.list = response.data.records;
          console.log(response.data.records);
          this.total = response.data.total;
          console.log(response.data.total);
        })
        .catch(error => {
          console.log(error);
        });
    },

    removeDataById(id) {
      this.$confirm("此操作将永久删除该字段, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          course.deleteCourseId(id).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          });

          // this.list = response.data.records;
          // this.total = response.data.total;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          console.log(error);
        });
    }
  }
};
</script>
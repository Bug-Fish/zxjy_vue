<template>
  <div class="app-container">
    讲师列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="讲师姓名">
        <el-input v-model="teacherQuery.name" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-input v-model="teacherQuery.level" placeholder="审批人"></el-input>
      </el-form-item>

      <el-date-picker
        v-model="teacherQuery.begin"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-date-picker
        v-model="teacherQuery.end"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <!-- <el-form-item label="讲师头衔">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>-->
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
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="intro" label="简介" width="400"></el-table-column>
      <el-table-column label="职称" width="100">
        <template slot-scope="scope">{{scope.row.level === 1 ? '高级讲师' : '首席讲师'}}</template>
      </el-table-column>

      <!-- <el-table-column prop="sort" label="分类"></el-table-column> -->
      <el-table-column prop="gmtCreate" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="gmtModified" label="修改时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" round icon="el-icon-edit">修改</el-button>
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
import teacher from "@/api/edu/teacher.js";
export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 4,
      total: 0,
      teacherQuery: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page = 1) {
      console.log(this.teacherQuery.end);
      this.page = page;
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
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
          teacher.deleteTeacherId(id).then(response => {
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
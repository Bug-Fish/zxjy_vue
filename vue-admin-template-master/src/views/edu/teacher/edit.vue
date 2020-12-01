<template>
  <div class="app-container">
    讲师列表
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师排序" prop="name">
        <el-input-number v-model="teacher.sort" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="讲师头衔" prop="region">
        <el-select v-model="teacher.level" placeholder="请选择活动区域">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="特级讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      
      
      <el-form-item label="讲师资历" prop="name">
        <el-input v-model="teacher.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介" prop="desc">
        <el-input type="textarea" v-model="teacher.intro"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
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
      teacher: {

      }
    };
  },
  created() {
    
  },
  methods: {
    saveOrUpdate() {
        this.saveTeacher()

    },
    saveTeacher() {
        teacher.addTeacher(this.teacher)
            .then(response=>{
                this.$message({
                    type: 'success',
                    message: '添加成功'
                });
                this.$router.push({path:'/teacher/table'})
            }) 
    }
  }
};
</script>
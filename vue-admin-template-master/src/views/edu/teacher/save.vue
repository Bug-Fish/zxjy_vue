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
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="讲师头衔" prop="region">
        <el-select v-model="teacher.level" placeholder="请选择活动区域">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="特级讲师" value="2"></el-option>
        </el-select>
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调-->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
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
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      list: null,
      page: 1,
      limit: 4,
      total: 0,
      teacher: {},
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API

    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  methods: {
      close() {
          this.imagecropperShow=false
          this.imagecropperKey=this.imagecropperKey+1
      },
      cropSuccess(data) {
          this.imagecropperShow=false
          this.imagecropperKey=this.imagecropperKey+1
          this.teacher.avatar = data.url 
      },

    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getInfo(id);
      } else {
        this.teacher = {};
      }
    },
    getInfo(id) {
      teacher.getTeacherInfo(id).then(response => {
        this.teacher = response.data.teacher;
        console.log(response.data.teacher);
      });
    },
    saveOrUpdate() {
      if (!this.teacher.id) {
        this.saveTeacher();
      } else {
        this.updateTeacher();
      }
    },
    saveTeacher() {
      teacher.addTeacher(this.teacher).then(response => {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.$router.push({ path: "/teacher/table" });
      });
    },
    updateTeacher() {
      teacher.updateTeacher(this.teacher).then(response => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.$router.push({ path: "/teacher/table" });
      });
    }
  }
};
</script>
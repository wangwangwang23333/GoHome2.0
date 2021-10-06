<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix"></div>
            <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData()"></vue-waterfall-easy>
        </el-card>
    </div>



</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  data() {
    return {
      imgsArr: [],
      group: 0, // request param
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData() {
    //   axios.get('./static/mock/data.json?group=' + this.group) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个惊呆json文件模拟
    //     .then(res => {
    //       this.imgsArr = this.imgsArr.concat(res.data)
    //       this.group++
    //     })
        let pic=[]

        for(let i=0;i<10;i++)
        {
            pic.push({src:require("@/assets/postimg/"+String(i)+".jpg"),href:require("../assets/postimg/"+String(i)+".jpg")});
        }

        let desc=pic;
        this.imgsArr = pic;
        console.log(this.imgsArr);
        console.log(vueWaterfallEasy);
    },
  },
  created() {
    this.getData()
  }
}
</script>

<template>
  <div class="newHome">
    <HomeBlock></HomeBlock>
    <HomeStayCard></HomeStayCard>

  </div>
</template>

<script>
import HomeBlock from "../components/HomeBlock";
import HomeStayCard from "../components/HomeStayCard";
export default {
  name:'NewHome',
  components:{
  HomeBlock,
    HomeStayCard,
  },
  data(){
    return{

    }
  },
  methods:{

  }


}
</script>
<style>

</style>
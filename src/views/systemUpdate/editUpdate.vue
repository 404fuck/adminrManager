<!--
 * @Author: zzt
 * @Date: 2021-05-12 17:46:19
 * @LastEditTime: 2021-05-12 20:21:41
 * @LastEditors: Please set LastEditors
 * @Description: 编辑更新
 * @FilePath: \sjoyAdminrManager\src\views\systemUpdate\editUpdate.vue
-->
<template>
    <div>
        <addUpdate 
          :isEdit="true"
          :propId="queryId"
        ></addUpdate>
    </div>
</template>
<script>
export default {
    components:{
       addUpdate: (resolve) => require(["../systemUpdate/addUpdate"], resolve),
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    name: "editUpdate",
    data() {
        return {
            queryId:'',
        };
    },
    methods: {
        
       
    },
    created() {
        this.queryId = this.$route.query.id;
    },
    watch: {},
};
</script>
<style scoped>
</style>